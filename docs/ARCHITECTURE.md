# Architecture

Teacher Hindi speech
→ AudioRecord
→ 30 ms frames
→ VAD
→ bounded utterance
→ Sherpa offline ASR
→ Hindi text
→ curriculum guardrails
→ LanguageRouter
→ target NMT
→ target text
→ local TTS
→ AudioTrack/speaker

No backend is required for the classroom path.
