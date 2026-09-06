package in.sih26042.asr

import android.content.Context
import com.k2fsa.sherpa.onnx.FeatureConfig
import com.k2fsa.sherpa.onnx.OfflineModelConfig
import com.k2fsa.sherpa.onnx.OfflineOmnilingualAsrCtcModelConfig
import com.k2fsa.sherpa.onnx.OfflineRecognizer
import com.k2fsa.sherpa.onnx.OfflineRecognizerConfig
import java.io.File

class SherpaAsrEngine(context: Context) : AsrEngine {
    private val dir = File(context.filesDir, "models/asr")
    private val recognizer: OfflineRecognizer?

    init {
        val model = File(dir, "model.int8.onnx")
        val tokens = File(dir, "tokens.txt")

        recognizer = if (model.exists() && tokens.exists()) {
            val modelConfig = OfflineModelConfig(
                omnilingual = OfflineOmnilingualAsrCtcModelConfig(
                    model = model.absolutePath
                ),
                tokens = tokens.absolutePath,
                numThreads = 1,
                provider = "cpu"
            )
            OfflineRecognizer(
                config = OfflineRecognizerConfig(
                    featConfig = FeatureConfig(
                        sampleRate = 16_000,
                        featureDim = 80
                    ),
                    modelConfig = modelConfig,
                    decodingMethod = "greedy_search"
                )
            )
        } else null
    }

    override suspend fun transcribe(audio: FloatArray): String {
        val r = requireNotNull(recognizer) {
            "Offline Hindi ASR model is missing."
        }
        val stream = r.createStream()
        return try {
            stream.acceptWaveform(audio, sampleRate = 16_000)
            r.decode(stream)
            r.getResult(stream).text.trim()
        } finally {
            stream.release()
        }
    }

    override fun isReady() = recognizer != null
    override fun close() = recognizer?.release()
}
