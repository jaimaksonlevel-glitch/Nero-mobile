# ADR 0004 — Auditoria da biblioteca Nitro Realtime Audio

- Status: auditoria de código-fonte; adoção bloqueada até build e teste Android
- Data: 2026-11-15
- Aplicativo alvo: Expo SDK 54 / React Native 0.81.5
- Biblioteca auditada: `@mindinventory/react-native-nitro-realtime-audio` 1.5.0 (branch main consultada)

## Resultado

A biblioteca é uma candidata real para o spike PCM: o código Android usa `AudioRecord`, captura PCM16, acumula amostras em blocos e disponibiliza `ArrayBuffer` para JavaScript. O projeto declara MIT e requer `react-native-nitro-modules`.

**Decisão: não adicionar ainda ao aplicativo.** A documentação do pacote indica ambiente de desenvolvimento com React Native 0.83.6 e Nitro 0.36.1, enquanto o Nero usa React Native 0.81.5. O peer dependency do pacote aceita React Native sem faixa restritiva, mas isso não substitui a validação de autolinking, Nitro codegen, Gradle e EAS Build com a versão exata do Nero.

## Pontos confirmados no código Android consultado

1. O gravador constrói `AudioRecord` com `ENCODING_PCM_16BIT`.
2. Aceita mono e estéreo; o Nero deve configurar mono para o detector de wake word.
3. Usa `AudioRecord.getMinBufferSize()` e rejeita resultado não positivo.
4. Lê áudio em uma thread dedicada com `READ_BLOCKING`.
5. Entrega blocos por um acumulador e callback nativo/JS.
6. Verifica a permissão `RECORD_AUDIO` antes de iniciar.
7. O stop sinaliza a thread, interrompe a gravação, aguarda a thread e libera recursos.

## Riscos e ressalvas

### Taxa de amostragem

O README anuncia reamostragem nativa, mas o código Android auditado cria `AudioRecord` diretamente com `config.sampleRate` e chama `getMinBufferSize` para essa taxa. Não foi confirmado no trecho auditado um fallback para outra taxa caso 16 kHz não seja suportado pelo dispositivo. Portanto, não assumir que o resampling anunciado resolve qualquer incompatibilidade de hardware.

O Android documenta que 44,1 kHz é a taxa garantida, enquanto 16 kHz pode funcionar em alguns dispositivos. A implementação precisa ser testada com a taxa escolhida e, se necessário, o resampling deve ser verificado no código completo ou implementado separadamente.

### Ciclo de vida e falhas

A thread de captura termina em caso de erro de leitura; o aplicativo precisa receber/identificar falha e não deixar a interface acreditar que Wake continua ativo. Validar também interrupção por chamada telefônica, troca de rota de áudio, desconexão de fone e pausa do app.

### Custo de buffers

O callback fornece ArrayBuffer ao JavaScript. O detector poderá exigir buffers com 1280 amostras de PCM16 mono (80 ms a 16 kHz). Confirmar duração e tamanho de chunk, número de cópias, pressão de memória e latência. Preferir a inferência no lado nativo caso o runtime/modelo escolhido permita.

## Configuração experimental pretendida

Apenas para spike isolado, depois de confirmar a instalação:
- `sampleRate: 16000`
- `channels: 1`
- `chunkDurationMs: 80`
- VAD desativado no primeiro teste, para medir PCM bruto e evitar duas camadas de decisão.
- Solicitar permissão somente após o usuário ativar Wake.
- Registrar apenas métricas técnicas (taxa configurada, quantidade de buffers, erros, duração), nunca salvar nem enviar áudio ambiente.
- Parar captura quando o app perder foco, bloquear tela ou quando o usuário desligar Wake.

O valor de 80 ms é compatível com o tamanho de quadro de 1280 amostras do wrapper openWakeWord avaliado anteriormente, se a taxa de 16 kHz for efetivamente mantida.

## Plano de prova de compatibilidade

1. Criar branch de experimento separada da implementação principal.
2. Instalar pacote e peer dependency sem alterar outras versões do Expo/RN.
3. Executar prebuild limpo e compilar Android com Gradle/EAS.
4. Testar permissão concedida, negada e revogada.
5. Capturar 5 minutos em 16 kHz mono e verificar duração, quantidade de amostras, silêncio, clipping e continuidade.
6. Testar encerramento repetido, pausa/retorno, chamada, Bluetooth e fones com fio.
7. Medir CPU, memória e bateria em aparelho Android de entrada e intermediário.
8. Só depois conectar o fluxo ao detector local e validar modelo português.

## Critérios de aceite

- Build Android reproduzível com Expo SDK 54 / RN 0.81.5.
- PCM mono signed 16-bit em taxa efetiva conhecida, sem lacunas inesperadas.
- Tratamento explícito de erro de leitura e de taxa não suportada.
- Microfone liberado sempre que Wake é desativado ou o app sai do primeiro plano.
- Sem tráfego de áudio ambiente para a internet.
- Consumo e falsos acionamentos medidos em hardware real.

## Fontes

- Código Android do gravador: https://github.com/Mindinventory/react-native-nitro-realtime-audio/blob/main/android/src/main/java/com/margelo/nitro/nitrorealtimeaudio/audio/AudioRecorder.kt
- Contratos TypeScript: https://github.com/Mindinventory/react-native-nitro-realtime-audio/blob/main/src/NitroRealtimeAudio.nitro.ts
- README e instalação: https://github.com/Mindinventory/react-native-nitro-realtime-audio
- Package metadata 1.5.0: https://github.com/Mindinventory/react-native-nitro-realtime-audio/blob/main/package.json
- Android AudioRecord: https://developer.android.com/reference/android/media/AudioRecord
- Android AudioRecord.Builder: https://developer.android.com/reference/android/media/AudioRecord.Builder

## Limites

Auditoria documental do código-fonte. Nenhuma dependência foi instalada, nenhum build foi executado e nenhum dispositivo físico foi testado. A captura PCM e a palavra de ativação continuam não implementadas no Nero Mobile.
