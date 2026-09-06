package in.sih26042.audio

import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AudioRecorder(
    private val onFrame: suspend (FloatArray) -> Unit
) {
    companion object {
        const val SAMPLE_RATE = 16_000
        const val FRAME_MS = 30
        const val FRAME_SAMPLES = SAMPLE_RATE * FRAME_MS / 1000
    }

    @Volatile
    private var running = false
    private var recorder: AudioRecord? = null

    suspend fun start() = withContext(Dispatchers.Default) {
        if (running) return@withContext

        val minimumBuffer = AudioRecord.getMinBufferSize(
            SAMPLE_RATE,
            AudioFormat.CHANNEL_IN_MONO,
            AudioFormat.ENCODING_PCM_16BIT
        )

        require(minimumBuffer > 0) { "Unable to configure microphone" }

        recorder = AudioRecord(
            MediaRecorder.AudioSource.VOICE_RECOGNITION,
            SAMPLE_RATE,
            AudioFormat.CHANNEL_IN_MONO,
            AudioFormat.ENCODING_PCM_16BIT,
            maxOf(minimumBuffer, FRAME_SAMPLES * 4)
        )

        recorder!!.startRecording()
        running = true

        val input = ShortArray(FRAME_SAMPLES)

        try {
            while (running) {
                val read = recorder!!.read(
                    input, 0, input.size, AudioRecord.READ_BLOCKING
                )
                if (read <= 0) continue

                val frame = FloatArray(read)
                for (i in 0 until read) {
                    frame[i] = input[i] / 32768.0f
                }
                onFrame(frame)
            }
        } finally {
            recorder?.release()
            recorder = null
        }
    }

    fun stop() {
        running = false
        recorder?.runCatching { stop() }
    }
}
