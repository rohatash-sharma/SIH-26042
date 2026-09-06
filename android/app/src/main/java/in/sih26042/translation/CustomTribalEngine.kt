package in.sih26042.translation

import android.content.Context
import in.sih26042.Language
import java.io.File
import in.sih26042.models.ModelManager

class CustomTribalEngine(context: Context) : TranslationEngine {
    private val root = File(context.filesDir, "models/nmt")
    private val models = ModelManager(context)

    override fun isReady(target: Language): Boolean =
        models.verifiedModel("nmt", target.id)

    override suspend fun translate(
        text: String,
        source: Language,
        target: Language
    ): String {
        require(source.id == "hi") { "Source must be Hindi" }
        require(target.id == "ho" || target.id == "mundari")
        require(isReady(target)) { "${target.displayName} model pack is missing" }

        return NativeNmt.translate(
            text,
            "hin_Deva",
            target.id,
            File(root, target.id).absolutePath
        )
    }

    override fun close() = Unit
}
