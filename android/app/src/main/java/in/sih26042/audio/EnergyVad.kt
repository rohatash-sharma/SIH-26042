package in.sih26042.audio

import kotlin.math.abs

/** Development fallback only. Replace with Sherpa Silero/Ten-VAD for release. */
class EnergyVad(
    private val threshold: Float = 0.015f
) {
    fun isSpeech(frame: FloatArray): Boolean {
        if (frame.isEmpty()) return false
        var total = 0.0f
        for (sample in frame) total += abs(sample)
        return (total / frame.size) >= threshold
    }
}
