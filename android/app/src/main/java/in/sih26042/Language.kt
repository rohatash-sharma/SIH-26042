package in.sih26042

data class Language(
    val id: String,
    val displayName: String,
    val floresCode: String?,
    val ttsPack: String,
    val nmtPack: String,
    val script: String
)

object Languages {
    val HINDI = Language("hi", "Hindi", "hin_Deva", "hi", "source", "Devanagari")
    val SANTALI = Language("sat", "Santali", "sat_Olck", "sat", "indictrans2", "Ol Chiki")
    val HO = Language("ho", "Ho", null, "ho", "ho", "Warang Citi / Latin")
    val MUNDARI = Language("mundari", "Mundari", null, "mundari", "mundari", "Latin / Devanagari")

    val sourceLanguages = listOf(HINDI)
    /** Minimal milestone: ship only the validated Hindi → Santali path. */
    val targetLanguages = listOf(SANTALI)
}
