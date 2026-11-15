# Android PCM capture spike (reference only)

This directory contains a Kotlin reference implementation for the first Android PCM capture experiment.

It is **not integrated into the Expo app**, is not included in the Android build, and has not been compiled or tested on a physical device.

## Intended configuration

- PCM signed 16-bit little-endian (Android AudioRecord PCM16)
- Mono
- 16,000 samples/second
- 80 ms per callback (1,280 samples / 2,560 bytes)
- Dedicated capture thread
- Explicit microphone permission before start
- Privacy-sensitive capture on Android 11+
- No audio file and no network transmission

## Why it rejects unsupported 16 kHz

Android documents 44.1 kHz as the only guaranteed capture rate across devices; 16 kHz may work on some devices. This prototype deliberately fails clearly if the requested 16 kHz format is rejected. It does not silently label 44.1 kHz audio as 16 kHz. A tested resampler or another capture strategy is required for devices that cannot provide the detector's input rate.

## Integration requirements before app use

1. Wrap the engine in a local Expo Module with start/stop/status methods and an event emitter.
2. Request RECORD_AUDIO only after the user explicitly enables Wake.
3. Stop and release capture on app background, screen lock, or Wake disabled.
4. Handle read errors, interruptions, and audio-route changes.
5. Verify exact byte order, sample rate, chunk boundaries, clipping, and dropped samples.
6. Connect only to a validated local wake-word model after PCM tests pass.
7. Add Android instrumentation tests and run EAS/Gradle builds with the project's pinned Expo/RN versions.

The callback currently runs on the capture thread. An Expo Module wrapper must safely forward events without blocking this thread or retaining unbounded buffers.
