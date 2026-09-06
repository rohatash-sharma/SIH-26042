package in.sih26042.translation

import in.sih26042.Language

class LanguageRouter(
    private val indic: IndicTrans2Engine,
    private val custom: CustomTribalEngine
) {
    suspend fun translate(
        text: String,
        source: Language,
        target: Language
    ): String = when (target.id) {
        "sat" -> indic.translate(text, source, target)
        "ho", "mundari" -> custom.translate(text, source, target)
        else -> error("Unsupported target language")
    }

    fun isReady(target: Language): Boolean = when (target.id) {
        "sat" -> indic.isReady(target)
        "ho", "mundari" -> custom.isReady(target)
        else -> false
    }

    fun close() {
        indic.close()
        custom.close()
    }
}
