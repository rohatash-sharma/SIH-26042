#include <jni.h>
#include <stdexcept>
#include <string>

// This JNI boundary is intentionally fail-closed until the exact
// CTranslate2 + SentencePiece Android build is linked.
// It must never fabricate a translation.

static std::string translate_local(
    const std::string& input,
    const std::string& source,
    const std::string& target,
    const std::string& model_dir) {

    (void)input;
    (void)source;
    (void)target;
    (void)model_dir;

    throw std::runtime_error(
        "Local NMT runtime not linked. "
        "Build/link CTranslate2 + SentencePiece and install the model pack."
    );
}

extern "C"
JNIEXPORT jstring JNICALL
Java_in_sih26042_translation_NativeNmt_translate(
    JNIEnv* env,
    jobject,
    jstring input,
    jstring source,
    jstring target,
    jstring modelDir) {

    const char* in = env->GetStringUTFChars(input, nullptr);
    const char* src = env->GetStringUTFChars(source, nullptr);
    const char* tgt = env->GetStringUTFChars(target, nullptr);
    const char* dir = env->GetStringUTFChars(modelDir, nullptr);

    std::string sIn = in ? in : "";
    std::string sSrc = src ? src : "";
    std::string sTgt = tgt ? tgt : "";
    std::string sDir = dir ? dir : "";

    if (in) env->ReleaseStringUTFChars(input, in);
    if (src) env->ReleaseStringUTFChars(source, src);
    if (tgt) env->ReleaseStringUTFChars(target, tgt);
    if (dir) env->ReleaseStringUTFChars(modelDir, dir);

    try {
        auto result = translate_local(sIn, sSrc, sTgt, sDir);
        return env->NewStringUTF(result.c_str());
    } catch (const std::exception& e) {
        jclass cls = env->FindClass("java/lang/IllegalStateException");
        env->ThrowNew(cls, e.what());
        return nullptr;
    }
}
