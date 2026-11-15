package com.levelengineering.nero.audio

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import android.os.Build

/**
 * Reference-only Android PCM capture spike.
 *
 * This class is intentionally not wired into the Expo app yet. It captures
 * PCM16 mono in fixed-duration chunks on a dedicated thread. The caller must
 * request RECORD_AUDIO permission before calling start().
 */
internal class PcmCaptureEngine(
  private val onPcmChunk: (ByteArray) -> Unit,
  private val onCaptureError: (Throwable) -> Unit
) {
  data class Config(
    val sampleRateHz: Int = 16_000,
    val channels: Int = 1,
    val chunkDurationMs: Int = 80
  )

  private val lock = Any()

  @Volatile
  private var running = false

  private var audioRecord: AudioRecord? = null
  private var captureThread: Thread? = null

  fun start(context: Context, config: Config = Config()) {
    synchronized(lock) {
      check(!running && audioRecord == null) {
        "PCM capture is already active."
      }

      require(config.channels == 1) {
        "The Nero wake-word prototype currently requires mono audio."
      }
      require(config.sampleRateHz in 8_000..48_000) {
        "Unsupported sample rate: ${config.sampleRateHz} Hz."
      }
      require(config.chunkDurationMs in 10..200) {
        "Chunk duration must be between 10 and 200 ms."
      }
      check(
        context.checkSelfPermission(Manifest.permission.RECORD_AUDIO) ==
          PackageManager.PERMISSION_GRANTED
      ) {
        "Microphone permission has not been granted."
      }

      val channelMask = AudioFormat.CHANNEL_IN_MONO
      val encoding = AudioFormat.ENCODING_PCM_16BIT
      val minBufferBytes = AudioRecord.getMinBufferSize(
        config.sampleRateHz,
        channelMask,
        encoding
      )
      check(minBufferBytes > 0) {
        "The device rejected ${config.sampleRateHz} Hz mono PCM16 (code=$minBufferBytes)."
      }

      val samplesPerChunk = config.sampleRateHz * config.chunkDurationMs / 1_000
      check(samplesPerChunk > 0) { "Invalid PCM chunk size." }
      val bytesPerChunk = samplesPerChunk * 2 // PCM16 mono
      val nativeBufferBytes = maxOf(minBufferBytes * 2, bytesPerChunk * 2)

      val format = AudioFormat.Builder()
        .setEncoding(encoding)
        .setSampleRate(config.sampleRateHz)
        .setChannelMask(channelMask)
        .build()

      val builder = AudioRecord.Builder()
        .setAudioSource(MediaRecorder.AudioSource.VOICE_RECOGNITION)
        .setAudioFormat(format)
        .setBufferSizeInBytes(nativeBufferBytes)

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        builder.setPrivacySensitive(true)
      }

      val record = builder.build()
      check(record.state == AudioRecord.STATE_INITIALIZED) {
        record.release()
        "AudioRecord could not initialize."
      }

      try {
        record.startRecording()
        check(record.recordingState == AudioRecord.RECORDSTATE_RECORDING) {
          "AudioRecord did not enter recording state."
        }
      } catch (error: Throwable) {
        record.release()
        throw error
      }

      audioRecord = record
      running = true

      captureThread = Thread(
        { readLoop(record, bytesPerChunk) },
        "NeroPcmCapture"
      ).apply { start() }
    }
  }

  private fun readLoop(record: AudioRecord, bytesPerChunk: Int) {
    val chunk = ByteArray(bytesPerChunk)
    var offset = 0

    try {
      while (running) {
        val count = record.read(
          chunk,
          offset,
          bytesPerChunk - offset,
          AudioRecord.READ_BLOCKING
        )

        when {
          count > 0 -> {
            offset += count
            if (offset == bytesPerChunk) {
              // Copy because the working buffer is reused on the next read.
              onPcmChunk(chunk.copyOf())
              offset = 0
            }
          }
          count == 0 -> Unit
          else -> throw IllegalStateException(
            "AudioRecord.read failed with code $count."
          )
        }
      }
    } catch (error: Throwable) {
      if (running) onCaptureError(error)
    } finally {
      running = false
    }
  }

  fun stop() {
    val record: AudioRecord?
    val thread: Thread?

    synchronized(lock) {
      running = false
      record = audioRecord
      thread = captureThread
      audioRecord = null
      captureThread = null

      try {
        if (record?.recordingState == AudioRecord.RECORDSTATE_RECORDING) {
          record.stop() // Unblocks READ_BLOCKING.
        }
      } catch (_: IllegalStateException) {
        // The recorder may already have stopped after a read error.
      }
    }

    if (thread != null && thread !== Thread.currentThread()) {
      thread.join(2_000)
      check(!thread.isAlive) {
        "PCM capture thread did not stop within 2 seconds."
      }
    }

    record?.release()
  }

  fun isRunning(): Boolean = running
}
