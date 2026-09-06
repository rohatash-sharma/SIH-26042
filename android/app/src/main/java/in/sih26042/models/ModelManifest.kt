package in.sih26042.models

data class ModelManifest(
    val id: String,
    val version: Int,
    val source: String,
    val target: String,
    val runtime: String,
    val sha256: String
)
