package in.sih26042.translation

import android.content.Context
import in.sih26042.Language
import in.sih26042.Languages
import java.io.File
import in.sih26042.models.ModelManager

class IndicTrans2Engine(context: Context) : TranslationEngine {
    private val dir = File(context.filesDir, "models/nmt/indictrans2")
    private val models = ModelManager(context)

    override fun isReady(target: Language): Boolean =
        target == Languages.SANTALI && models.verifiedModel("nmt", "indictrans2")

    override suspend fun translate(
        text: String,
        source: Language,
        target: Language
    ): String {
        require(source == Languages.HINDI) { "Teacher input must be Hindi" }
        require(target == Languages.SANTALI) { "IndicTrans2 branch is Santali" }
        require(isReady(target)) { "IndicTrans2 Santali model pack is missing" }

        return NativeNmt.translate(
            text,
            "hin_Deva",
            "sat_Olck",
            dir.absolutePath
        )
    }

    override fun close() = Unit
}
