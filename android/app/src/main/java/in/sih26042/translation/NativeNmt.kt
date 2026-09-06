package in.sih26042.translation

object NativeNmt {
    init {
        System.loadLibrary("sih_nmt")
    }

    external fun translate(
        text: String,
        sourceCode: String,
        targetCode: String,
        modelDir: String
    ): String
}
