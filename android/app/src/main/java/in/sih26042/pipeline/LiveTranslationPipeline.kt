package in.sih26042.pipeline

import in.sih26042.Language
import in.sih26042.asr.AsrEngine
import in.sih26042.audio.EnergyVad
import in.sih26042.translation.Guardrails
import in.sih26042.translation.LanguageRouter
import in.sih26042.tts.TtsEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext

class LiveTranslationPipeline(
    private val asr: AsrEngine,
    private val router: LanguageRouter,
    private val guardrails: Guardrails,
    private val tts: TtsEngine,
    private val onSource: (String) -> Unit,
    private val onTarget: (String) -> Unit,
    private val onStatus: (String) -> Unit,
    private val onError: (String) -> Unit
) {
    private val vad = EnergyVad()
    private val buffer = ArrayList<Float>(16_000 * 6)
    private var silenceMs = 0
    private var speechMs = 0
    private val stateMutex = Mutex()

    companion object {
        private const val FRAME_MS = 30
        private const val ENDPOINT_SILENCE_MS = 450
        private const val MAX_UTTERANCE_MS = 6000
        private const val MIN_UTTERANCE_MS = 250
    }

    suspend fun addFrame(
        frame: FloatArray,
        source: Language,
        target: Language
    ) = stateMutex.withLock {
        if (vad.isSpeech(frame)) {
            silenceMs = 0
            frame.forEach(buffer::add)
            speechMs += FRAME_MS
            if (speechMs >= MAX_UTTERANCE_MS) {
                process(source, target)
            }
        } else if (buffer.isNotEmpty()) {
            silenceMs += FRAME_MS
            if (
                silenceMs >= ENDPOINT_SILENCE_MS &&
                speechMs >= MIN_UTTERANCE_MS
            ) {
                process(source, target)
            }
        }
    }

    suspend fun flush(source: Language, target: Language) = stateMutex.withLock {
        if (buffer.isNotEmpty()) {
            process(source, target)
        }
    }

    private suspend fun process(
        source: Language,
        target: Language
    ) = withContext(Dispatchers.Default) {
        val audio = buffer.toFloatArray()
        buffer.clear()
        silenceMs = 0
        speechMs = 0

        try {
            onStatus("Offline ASR…")
            val hindi = asr.transcribe(audio)
            if (hindi.isBlank()) return@withContext

            onSource(hindi)
            guardrails.inspect(hindi)

            onStatus("Offline AI translation…")
            val translated = router.translate(
                hindi, source, target
            )
            onTarget(translated)

            onStatus("Offline TTS…")
            tts.speak(translated, target)
            onStatus("Ready • Offline")
        } catch (e: Exception) {
            onError(e.message ?: "Pipeline failed")
        } finally {
            audio.fill(0f)
        }
    }
}
