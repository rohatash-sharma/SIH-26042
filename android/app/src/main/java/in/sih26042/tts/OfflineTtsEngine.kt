package in.sih26042.tts

import android.content.Context
import android.speech.tts.TextToSpeech
import in.sih26042.Language
import java.util.Locale

/** Development TTS adapter. Release build should use a bundled target-language model. */
class OfflineTtsEngine(
    context: Context,
    private val onError: (String) -> Unit
) : TtsEngine, TextToSpeech.OnInitListener {

    private val tts = TextToSpeech(context, this)
    private var initialized = false

    private val locales = mapOf(
        "sat" to Locale("sat", "IN"),
        "ho" to Locale("ho", "IN"),
        "mundari" to Locale("unr", "IN")
    )

    override fun onInit(status: Int) {
        initialized = status == TextToSpeech.SUCCESS
        if (!initialized) onError("TTS initialization failed")
    }

    override fun isReady(language: Language): Boolean {
        if (!initialized) return false
        val locale = locales[language.id] ?: return false
        return tts.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE
    }

    override fun speak(text: String, language: Language) {
        require(isReady(language)) {
            "No local ${language.displayName} TTS voice is installed"
        }
        tts.language = locales.getValue(language.id)
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "sih-translation")
    }

    override fun close() {
        tts.stop()
        tts.shutdown()
    }
}
