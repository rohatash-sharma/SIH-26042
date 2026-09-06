cmake_minimum_required(VERSION 3.22.1)
project("sih_nmt")

add_library(
    sih_nmt
    SHARED
    nmt_jni.cpp
)

target_compile_features(sih_nmt PRIVATE cxx_std_17)

# Production: place prebuilt libraries/headers under third_party/
# and uncomment/link CTranslate2 + SentencePiece here.
