package in.sih26042.models

import android.content.Context
import java.io.File
import java.security.MessageDigest

class ModelManager(context: Context) {
    private val root = File(context.filesDir, "models")

    fun directory(vararg path: String): File {
        val dir = path.fold(root) { acc, part -> File(acc, part) }
        if (!dir.exists()) dir.mkdirs()
        return dir
    }

    fun hasModel(vararg path: String): Boolean =
        verifiedModel(*path)

    /** Verifies the pack manifest and optional artifact hashes before use. */
    fun verifiedModel(vararg path: String): Boolean {
        val dir = directory(*path)
        val manifest = File(dir, "manifest.json")
        if (!manifest.isFile) return false
        val text = runCatching { manifest.readText() }.getOrNull() ?: return false
        val sha = Regex("\\\"sha256\\\"\\s*:\\s*\\\"([a-fA-F0-9]{64})\\\"")
            .find(text)?.groupValues?.get(1) ?: return true
        val artifact = File(dir, "model.int8.onnx").takeIf { it.isFile }
            ?: File(dir, "model.onnx").takeIf { it.isFile }
            ?: return false
        val digest = MessageDigest.getInstance("SHA-256")
        artifact.inputStream().use { input ->
            val block = ByteArray(64 * 1024)
            while (true) {
                val n = input.read(block)
                if (n < 0) break
                digest.update(block, 0, n)
            }
        }
        return digest.digest().joinToString("") { "%02x".format(it) }
            .equals(sha, ignoreCase = true)
    }
}
