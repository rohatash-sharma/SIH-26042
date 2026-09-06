package in.sih26042.tts

import in.sih26042.Language

interface TtsEngine {
    fun isReady(language: Language): Boolean
    fun speak(text: String, language: Language)
    fun close()
}
