package in.sih26042.translation

import in.sih26042.Language

interface TranslationEngine {
    suspend fun translate(text: String, source: Language, target: Language): String
    fun isReady(target: Language): Boolean
    fun close()
}
