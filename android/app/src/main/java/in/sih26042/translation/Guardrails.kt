package in.sih26042.translation

class Guardrails {
    private val mathTerms = setOf(
        "जोड़", "जोड़ो", "घटाव", "घटाओ", "गुणा", "भाग"
    )
    private val numbers = setOf(
        "एक", "दो", "तीन", "चार", "पाँच",
        "छह", "सात", "आठ", "नौ", "दस"
    )

    fun inspect(text: String): Set<String> =
        text.split(Regex("\\s+"))
            .map { it.trim(',', '.', '!', '?', '।') }
            .filter {
                it.any(Char::isDigit) ||
                    it in mathTerms ||
                    it in numbers
            }
            .toSet()
}
