# ADR 0006 — Avaliação do runtime openWakeWord para Android

- Status: candidato técnico para protótipo; não aprovado para integração de produto
- Data: 2026-11-15
- Alvo: Android / Expo SDK 54 / React Native 0.81.5

## Resumo da investigação

Foi identificado um port Kotlin/Android de openWakeWord que executa a pipeline de inferência localmente com ONNX Runtime. Ele captura áudio com AudioRecord em 16 kHz mono, processa blocos de 1.280 amostras (80 ms), aceita um modelo ONNX customizado e não precisa de rede ou chave de API durante a detecção.

Repositório avaliado:
https://github.com/msnilsen/openwakeword-android

Arquivos lidos:
- README.md
- openwakeword/src/main/java/com/openwakeword/OpenWakeWord.kt
- openwakeword/build.gradle.kts
- LICENSE

## Pontos favoráveis

- Código Kotlin/Android com licença Apache 2.0.
- Pipeline local ONNX (mel spectrogram → speech embedding → classificador).
- API aceita modelo ONNX customizado em assets ou bytes.
- Captura nativa via AudioRecord e thread dedicada.
- Threshold e debounce configuráveis.
- O desenho combina com o objetivo de não transmitir áudio ambiente para a nuvem.

## Limitações e riscos

1. O port contém modelos prontos para “Hey Jarvis”, “Alexa” e “Hey Mycroft”, não “Nero”.
2. O modelo de palavra de ativação precisa ser treinado/exportado no formato openWakeWord ONNX esperado. Um TFLite de uma página comunitária não é automaticamente intercambiável com esse port.
3. Os modelos comunitários encontrados em português brasileiro indicam licença CC BY-NC-SA 4.0 por padrão; isso não pode ser assumido como adequado para um produto comercial da Level Engenharia. A licença do código do runtime não altera a licença do modelo.
4. Os benchmarks públicos encontrados são de modelos diferentes (“Solange”, “Aurora”, “Arturito” etc.), não da palavra “Nero”; resultados sintéticos não substituem teste com a voz do usuário, sotaques e ruído de campo.
5. O código é um projeto comunitário, não uma dependência validada para Expo SDK 54 / RN 0.81.5. Não foi compilado neste repositório e não foi auditado integralmente para lifecycle, erros e compatibilidade.
6. A implementação captura áudio internamente; integrar o detector a um módulo Expo exigirá adaptar permissões, ciclo de vida, start/stop, callback e liberação de recursos para o contrato ADR-0005. Não se deve manter duas instâncias concorrentes de AudioRecord.
7. A dependência ONNX Runtime Android aumenta o tamanho do aplicativo e precisa de medição de ABI, tamanho e desempenho em aparelho real.

## Decisão

Manter o port como candidato de prototipagem e **não adicionar dependência nem modelo ao aplicativo ainda**.

A arquitetura de produção deve encapsular captura e inferência no módulo nativo Expo, sem transmitir PCM em blocos ao JavaScript. Antes de adotar este port, executar uma prova isolada com:
- modelo “Nero” com licença explicitamente compatível com uso comercial, ou modelo próprio;
- validação de formato ONNX e pipeline de pré-processamento;
- build em SDK 54 / RN 0.81.5;
- permissão, interrupção, mudança de rota e stop/release;
- falsos acionamentos e falsos negativos em voz normal/baixa, distâncias de 1–3 m e ruído de galpão, inversores, ventiladores, TV e conversas;
- CPU, memória, bateria, tamanho do APK e latência.

## Alternativas de modelo em português encontradas

A biblioteca openWakeWord apresenta modelos comunitários treinados com vozes de português brasileiro. Exemplos encontrados na pesquisa:
- “Solange”: recall reportado de 57,4% com ruído/reverberação e 1,45 falso acionamento/hora no benchmark publicado.
- “Aurora”: recall reportado de 42,2% com ruído/reverberação e 5,19 falsos acionamentos/hora.
- “Arturito”: recall reportado de 64,0% com ruído/reverberação e 3,02 falsos acionamentos/hora.

Esses números são apenas resultados declarados pelos próprios benchmarks (500 falas sintéticas e cerca de 10 horas de negativos); não são comparação controlada entre modelos nem validação do Nero. Nenhum desses modelos é a palavra “Nero”, e a licença padrão publicada para os downloads é pessoal/não comercial, com opção de licença comercial.

## Fontes

- Port Kotlin openWakeWord Android: https://github.com/msnilsen/openwakeword-android
- Implementação Kotlin: https://github.com/msnilsen/openwakeword-android/blob/main/openwakeword/src/main/java/com/openwakeword/OpenWakeWord.kt
- Modelo Solange: https://openwakeword.com/library/1885
- Modelo Aurora: https://openwakeword.com/library/6193
- Modelo Arturito: https://openwakeword.com/library/4232
- Treinamento openWakeWord: https://github.com/dscripka/openWakeWord
- Expo local modules: https://docs.expo.dev/workflow/customizing/

## Estado atual

Nenhum runtime, modelo, dependência ou arquivo binário foi adicionado ao app. Nenhum APK foi compilado. A palavra “Nero” ainda não é detectada. Este ADR registra pesquisa e decisão técnica, não implementação.
