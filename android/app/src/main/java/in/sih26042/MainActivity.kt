package in.sih26042

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.Spinner
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import in.sih26042.asr.SherpaAsrEngine
import in.sih26042.audio.AudioRecorder
import in.sih26042.pipeline.LiveTranslationPipeline
import in.sih26042.translation.CustomTribalEngine
import in.sih26042.translation.Guardrails
import in.sih26042.translation.IndicTrans2Engine
import in.sih26042.translation.LanguageRouter
import in.sih26042.tts.OfflineTtsEngine
import kotlinx.coroutines.*

class MainActivity : ComponentActivity() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    private lateinit var sourceSpinner: Spinner
    private lateinit var targetSpinner: Spinner
    private lateinit var listenButton: Button
    private lateinit var repeatButton: Button
    private lateinit var statusText: TextView
    private lateinit var sourceText: TextView
    private lateinit var targetText: TextView

    private lateinit var asr: SherpaAsrEngine
    private lateinit var router: LanguageRouter
    private lateinit var tts: OfflineTtsEngine
    private lateinit var pipeline: LiveTranslationPipeline

    private var recorder: AudioRecorder? = null
    private var listening = false
    private var lastTranslation = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sourceSpinner = findViewById(R.id.sourceLanguage)
        targetSpinner = findViewById(R.id.targetLanguage)
        listenButton = findViewById(R.id.listenButton)
        repeatButton = findViewById(R.id.repeatButton)
        statusText = findViewById(R.id.statusText)
        sourceText = findViewById(R.id.sourceText)
        targetText = findViewById(R.id.targetText)

        sourceSpinner.adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_dropdown_item,
            Languages.sourceLanguages.map { it.displayName }
        )

        targetSpinner.adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_dropdown_item,
            Languages.targetLanguages.map { it.displayName }
        )

        asr = SherpaAsrEngine(this)
        router = LanguageRouter(
            IndicTrans2Engine(this),
            CustomTribalEngine(this)
        )
        tts = OfflineTtsEngine(this) { message ->
            statusText.text = message
        }

        pipeline = LiveTranslationPipeline(
            asr = asr,
            router = router,
            guardrails = Guardrails(),
            tts = tts,
            onSource = { runOnUiThread { sourceText.text = it } },
            onTarget = {
                runOnUiThread {
                    targetText.text = it
                    lastTranslation = it
                }
            },
            onStatus = { runOnUiThread { statusText.text = it } },
            onError = { runOnUiThread { statusText.text = "ERROR: $it" } }
        )

        listenButton.setOnClickListener {
            if (listening) stopListening() else requestMicrophone()
        }

        repeatButton.setOnClickListener {
            if (lastTranslation.isNotBlank()) {
                tts.speak(lastTranslation, selectedTarget())
            }
        }

        targetSpinner.setSelection(0)
        targetSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?, view: View?, position: Int, id: Long
            ) {
                showReadiness()
            }

            override fun onNothingSelected(parent: AdapterView<*>?) = Unit
        }
        showReadiness()
    }

    private fun selectedSource() =
        Languages.sourceLanguages[sourceSpinner.selectedItemPosition]

    private fun selectedTarget() =
        Languages.targetLanguages[targetSpinner.selectedItemPosition]

    private fun showReadiness() {
        val target = selectedTarget()
        statusText.text = buildString {
            append("OFFLINE AI\n")
            append("ASR: ${asr.isReady()}\n")
            append("NMT: ${router.isReady(target)}\n")
            append("TTS: ${tts.isReady(target)}")
        }
    }

    private fun requestMicrophone() {
        if (
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.RECORD_AUDIO
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.RECORD_AUDIO),
                100
            )
        } else {
            startListening()
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode != 100) return

        if (grantResults.firstOrNull() == PackageManager.PERMISSION_GRANTED) {
            startListening()
        } else {
            statusText.text = "Microphone permission is required for live translation."
        }
    }

    private fun startListening() {
        val source = selectedSource()
        val target = selectedTarget()

        if (!asr.isReady()) {
            statusText.text = "Hindi ASR model missing."
            return
        }

        if (!router.isReady(target)) {
            statusText.text = "${target.displayName} translation model missing."
            return
        }

        if (!tts.isReady(target)) {
            statusText.text = "${target.displayName} TTS model/voice missing."
            return
        }

        recorder = AudioRecorder { frame ->
            pipeline.addFrame(frame, source, target)
        }

        listening = true
        listenButton.text = "STOP LISTENING"
        statusText.text = "Listening • 100% offline"

        scope.launch(Dispatchers.Default) {
            recorder!!.start()
        }
    }

    private fun stopListening() {
        listening = false
        recorder?.stop()
        recorder = null
        listenButton.text = "START LISTENING"

        scope.launch {
            pipeline.flush(selectedSource(), selectedTarget())
        }
    }

    override fun onDestroy() {
        recorder?.stop()
        asr.close()
        router.close()
        tts.close()
        scope.cancel()
        super.onDestroy()
    }
}
