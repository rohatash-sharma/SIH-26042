package in.sih26042.asr

interface AsrEngine {
    suspend fun transcribe(audio: FloatArray): String
    fun isReady(): Boolean
    fun close()
}
