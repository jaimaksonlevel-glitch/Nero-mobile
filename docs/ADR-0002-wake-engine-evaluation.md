# ADR 0002 — Avaliação de motores locais para a palavra "Nero"

- Status: avaliação técnica; nenhuma dependência adicionada ao aplicativo
- Data: 2026-11-15
- Base do aplicativo: Expo SDK 54, React Native 0.81.5, expo-audio ~1.0.11

## Resumo executivo

A opção mais promissora para reduzir dependência comercial é avaliar 'react-native-openwakeword', mas ela não está pronta para adoção direta: os modelos pré-treinados oficiais do openWakeWord são atualmente somente em inglês, e o motor React Native exige que o aplicativo forneça áudio PCM em tempo real. O fluxo atual do Nero grava um arquivo com expo-audio e não fornece, por si só, os buffers PCM exigidos pelo detector.

O Porcupine tem suporte documentado a português e integração React Native mais direta, mas exige AccessKey e avaliação/licença comercial. Portanto, não adicionar nenhum dos dois até validar um modelo "Nero" em português e um caminho de áudio nativo compatível com Expo SDK 54.

## Comparação

| Critério | react-native-openwakeword | Picovoice Porcupine |
|---|---|---|
| Execução offline | Sim, conforme documentação do projeto | Sim |
| Android e iOS | Sim, conforme documentação do projeto | Sim |
| Licença do código do wrapper/engine | Apache-2.0 no repositório consultado | SDK proprietário / condições comerciais |
| Modelos pré-treinados em português | Não; openWakeWord oficial lista somente inglês | Português listado como idioma suportado |
| Palavra customizada "Nero" | Exige modelo TFLite compatível e validação de treinamento | Modelo customizado gerado no Console |
| Credencial de serviço | O wrapper declara não exigir API key | AccessKey necessária |
| Entrada de áudio | O aplicativo deve fornecer PCM mono 16 kHz, int16, blocos de 1280 amostras/80 ms | Gerenciador de áudio do SDK pode capturar e processar |
| Integração Expo | Código nativo; requer development build, não Expo Go | Código nativo; requer development build, não Expo Go |
| Risco principal | Modelo português e pipeline PCM ainda não validados | Licença/custo e gestão segura da AccessKey |

## Compatibilidade com o Nero atual

O Nero usa Expo SDK 54 / React Native 0.81.5. O 'react-native-openwakeword' consultado declara React Native 0.74+ e depende de 'react-native-nitro-modules', mas o repositório consultado usa React Native 0.86 e Nitro 0.36 em seu próprio ambiente de desenvolvimento. Isso não prova incompatibilidade com RN 0.81.5, mas exige teste real de instalação, autolinking, compilação Android/iOS e EAS Build.

O detector espera blocos PCM de 16 kHz, mono, signed 16-bit, com 1280 amostras por quadro. A gravação atual do Nero com 'expo-audio' é baseada em arquivo e não fornece esse fluxo de buffers no JavaScript. Será necessário avaliar uma biblioteca de áudio em tempo real ou um módulo nativo local Expo (Kotlin/Swift) para capturar PCM. Não conectar o detector à gravação atual por suposição.

## Decisão provisória

1. Não adicionar dependências nativas ainda.
2. Manter o protótipo Wake em primeiro plano e sem escuta oculta.
3. Antes de integrar, obter um modelo TFLite "Nero" em português com licença clara e dados de avaliação.
4. Fazer teste de instalação e compilação com Expo SDK 54 / RN 0.81.5.
5. Medir falsos acionamentos e falhas em português brasileiro, inclusive ruído de obra, galpão, inversores, ventiladores e conversas.
6. Medir consumo de bateria/CPU em aparelho Android real de entrada e intermediário.
7. Só então escolher entre wrapper open-source + modelo validado ou Porcupine sob licença apropriada.

## Critérios mínimos de aceite do modelo

- Reconhecer "Nero" dito por diferentes pessoas e sotaques brasileiros.
- Testar fala baixa, distância de 1–3 m, ruído de fundo e reprodução de áudio de TV/rádio.
- Registrar falsos acionamentos por hora e taxa de não reconhecimento.
- Não transmitir áudio ambiente durante a detecção.
- Exibir indicador persistente e permitir desligamento imediato.
- Sem execução em segundo plano na primeira versão.

## Fontes consultadas

- Wrapper React Native openWakeWord: https://github.com/Incognitol07/react-native-openwakeword
- openWakeWord — modelos e idiomas: https://github.com/dscripka/openWakeWord
- Porcupine React Native Quick Start: https://picovoice.ai/docs/quick-start/porcupine-react-native/
- Picovoice General FAQ: https://picovoice.ai/docs/faq/general/
- Expo — código nativo e development builds: https://docs.expo.dev/workflow/customizing/
- Expo SDK 54: https://expo.dev/changelog/sdk-54

## Observação

Esta avaliação é documental. Nenhum build Android/iOS, teste de microfone em aparelho físico ou medição de bateria foi executado nesta etapa. Não declarar a palavra de ativação como implementada.
