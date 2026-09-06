<<<<<<< HEAD
# SIH 26042 — Vernacular Classroom

## What this project is

An offline-first Android application for live Hindi teacher speech to tribal-language output. The initial product targets Santali, Ho and Mundari as selectable target languages.

## Runtime goal

Teacher speaks Hindi → offline ASR → curriculum guardrails → target-language NMT → target-language TTS → speaker.

No backend is part of the classroom runtime.

## Important model rule

Source code is not trained model weights. The repository therefore contains all application code and runtime interfaces but keeps large model artifacts outside Git.

A missing model must cause a clear error. The app must never substitute a dictionary and call that AI translation.

## Current AI stack

## Minimal milestone

The low-storage milestone is intentionally limited to one golden path:

```text
Hindi speech → Sherpa-ONNX ASR → IndicTrans2 Hindi/Santali → Santali TTS
```

The Android UI exposes Santali only in this build. Ho and Mundari remain model-pack
expansion points and are not loaded or advertised until validated packs exist.

Run `scripts/minimal_setup.sh` to check disk space and print the required artifact
locations. This repository does not silently download or substitute model weights.

ASR: Sherpa-ONNX Omnilingual 300M INT8 is the starting benchmark because the current model is documented for 1600+ languages and Android/local execution. See Sherpa docs.

NMT: IndicTrans2 for Hindi→Santali. IndicTrans2 documents Hindi hin_Deva and Santali sat_Olck support and ships CTranslate2 inference artifacts.

Ho/Mundari: dedicated model packs trained and validated for those languages. They are not silently mapped to IndicTrans2 because those languages are outside its documented language list.

TTS: target-specific offline model packs. DhVaani-0.5 currently lists Santali among its supported languages and has an ONNX export; use that as the Santali starting point after validating the Android runtime.

## Step 1 — Install tools

Install Android Studio, Android SDK 36, SDK Platform Tools, JDK 17, Android NDK 27.3.13750724, and CMake.

Why: Android 9+ is the target class and arm64-v8a is the primary deployment ABI. Keeping one ABI reduces APK size.

## Step 2 — Clone your empty repository

    git clone https://github.com/rohatash-sharma/posture-tracker.git
    cd posture-tracker

Copy this repository contents into that directory.

Why: the Git repository holds source/configuration while model weights remain outside normal Git history.

## Step 3 — Generate Gradle wrapper

    cd android
    gradle wrapper --gradle-version 9.6.0
    chmod +x gradlew

Why: the wrapper makes the build reproducible.

## Step 4 — Build before installing models

    ./gradlew assembleDebug

This validates the Android project and native JNI boundary. It is expected that no real NMT inference is available yet because the native NMT runtime is intentionally fail-closed until CTranslate2 and SentencePiece are linked.

## Step 5 — Build Sherpa-ONNX for Android

Clone Sherpa-ONNX separately and follow its Android build instructions for arm64-v8a. Copy the version-matched AAR/native libraries into android/app/libs and android/app/src/main/jniLibs/arm64-v8a.

Why: Sherpa supplies the production local ASR/VAD runtime. Version-matched native libraries are important.

## Step 6 — Download ASR model

From the repository root:

    ./scripts/download_asr.sh

The script stages the current Sherpa Omnilingual 300M INT8 model files under models/asr/.

Why: this provides a multilingual local ASR baseline while the teacher input remains Hindi.

## Step 7 — Install ASR model into app-private storage

The production installer should copy:

    models/asr/model.int8.onnx
    models/asr/tokens.txt

into:

    /data/data/in.sih26042/files/models/asr/

Do not use world-readable external storage for model files.

Why: model files can be protected and verified before the inference engine opens them.

## Step 8 — Prepare IndicTrans2 Santali model

Use the official IndicTrans2 release and its CT2 inference artifact for the Hindi→Santali pair. Its documented language codes are hin_Deva and sat_Olck.

The native Android adapter needs:

    CTranslate2 model directory
    SentencePiece model(s)
    language-code configuration
    model manifest

Why: CTranslate2 handles optimized model inference; SentencePiece handles tokenization/detokenization. They are separate concerns.

## Step 9 — Build CTranslate2 for Android ARM64

The current CTranslate2 repository has an ARM64 build path; use Android NDK/CMake with BUILD_CLI=OFF, BUILD_SHARED_LIBS=ON, and Android ABI arm64-v8a. Then install/copy libctranslate2.so and headers into the Android native build.

Why: CTranslate2 is the optimized native inference layer for IndicTrans2.

## Step 10 — Build SentencePiece for Android ARM64

Build SentencePiece with shared library support and the Android NDK, then copy libsentencepiece.so plus headers into the native build.

Why: IndicTrans2's inference preprocessing uses SentencePiece. CTranslate2 does not tokenize text for you.

## Step 11 — Complete nmt_jni.cpp

The current nmt_jni.cpp is intentionally fail-closed. Replace translate_local() with:

1. Load model and SentencePiece processor once.
2. Normalize/preprocess Hindi using the same rules as IndicTrans2's official inference pipeline.
3. Encode with the source SentencePiece model.
4. Add source/target language tags required by IndicTrans2.
5. Call ctranslate2::Translator::translate_batch().
6. Decode generated tokens with the target SentencePiece model.
7. Run the required IndicTrans2 postprocessing.
8. Return target text.

Why: skipping the official preprocessing/tokenization rules causes quality loss or incorrect output.

## Step 12 — Santhali TTS

Use a validated local Santhali model pack. DhVaani-0.5 currently has a Santali-capable ONNX export. Its published ONNX pack includes an INT8 text encoder, INT8 flow decoder, vocoder backbone and tokenizer assets.

Implement the same API as TtsEngine:

    speak(text, Languages.SANTALI)

The Android implementation should output PCM to AudioTrack and must not fall back to cloud TTS.

Why: Android system TTS availability varies by device; a controlled SIH product needs a deterministic local model pack.

## Step 13 — Ho and Mundari

Create dedicated NMT and TTS packs.

Expected paths:

    models/nmt/ho/
    models/nmt/mundari/
    models/tts/ho/
    models/tts/mundari/

Each pack should include:

    model
    tokenizer assets
    manifest.json
    SHA-256
    model version

Why: Ho and Mundari are low-resource and are not part of IndicTrans2's documented language set. They therefore need their own validated models.

## Step 14 — Run the app

    ./gradlew assembleDebug
    adb devices
    adb install -r app/build/outputs/apk/debug/app-debug.apk

Grant microphone permission.

## Step 15 — Select language

The teacher source is Hindi.

Target selector:

    Santali
    Ho
    Mundari

The same pipeline is used for every target. LanguageRouter chooses the target model pack.

## Step 16 — Live operation

The runtime uses 30 ms audio frames. Speech frames are accumulated. A short silence endpoint closes the utterance. Then:

    ASR → guardrails → NMT → TTS

Why: this avoids waiting for long classroom paragraphs while keeping inference calls bounded.

## Step 17 — Offline test

    adb shell cmd connectivity airplane-mode enable

Then use the app normally.

Expected: no HTTP request is required.

## Step 18 — Classroom test

Say:

    बच्चों, तीन सेब और दो सेब जोड़ो।

Verify:

    Hindi transcript appears.
    Santali translation appears when Santali is selected.
    Local voice plays.

Then select Ho/Mundari. If the model pack isn't installed, the application must show a clear missing-model status instead of producing fake output.

## Step 19 — Latency benchmark

Measure:

    microphone endpoint timestamp
    ASR end timestamp
    NMT end timestamp
    TTS first-audio timestamp

The SIH target is voice-to-voice ≤3 seconds. Treat it as a measured engineering requirement, not a hard-coded assumption.

## Step 20 — RAM benchmark

    adb shell dumpsys meminfo in.sih26042

Measure:

    cold launch
    after ASR load
    after NMT load
    after TTS load
    after 100 sentences

Why: a 2 GB device needs model-memory discipline.

## Step 21 — Production optimization

Do not load every model simultaneously unless measurement proves it safe.

Use:

    INT8 models where quality permits
    1–2 inference threads on low-end tablets
    bounded audio buffers
    model lazy loading
    model verification
    no duplicate copies
    release/clear temporary audio buffers

## Step 22 — Git

    git add .
    git commit -m "feat: add offline SIH 26042 vernacular translator"
    git branch -M main
    git push -u origin main

## Production truth

The repository is the application/runtime. Model weights are separate assets. The only complete end-to-end production feature that can be claimed after model installation and device validation is the target language for which a real NMT model and a real TTS model have both passed accuracy and latency tests.
=======
# SIH-26042
>>>>>>> f492e19c7c56565ba2bb23cda320800e487c37c8
