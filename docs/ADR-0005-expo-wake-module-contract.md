# ADR 0005 — Contrato do módulo nativo Nero Wake

- Status: arquitetura proposta; implementação bloqueada até seleção e validação do detector
- Data: 2026-11-15
- Aplicativo: Expo SDK 54 / React Native 0.81.5
- Escopo inicial: Android em primeiro plano; iOS será uma implementação separada

## Decisão

O módulo local Expo deverá ser dono do ciclo completo de captura e detecção. O fluxo PCM bruto **não será emitido continuamente para JavaScript**. A captura frequente em blocos de 80 ms deve permanecer no lado nativo para evitar cópias repetidas, pressão de memória e dependência do agendamento JS.

O módulo só será integrado ao aplicativo depois que houver um detector local compatível com Android e um modelo de wake word em português cuja licença e qualidade tenham sido verificadas.

## Contrato JavaScript proposto

Nome nativo: `NeroWake`

Métodos:
- `isAvailable(): Promise<boolean>` — informa se a plataforma tem implementação funcional.
- `start(): Promise<void>` — inicia captura e detecção após permissão explícita; rejeita se já estiver ativo ou se a taxa/formato não puder ser garantido.
- `stop(): Promise<void>` — interrompe captura, aguarda a thread e libera AudioRecord.
- `getStatus(): Promise<"stopped" | "starting" | "listening" | "error">` — estado observável.

Eventos:
- `onStatusChanged`: estado e motivo técnico não sensível.
- `onWakeWordDetected`: frase reconhecida e timestamp monotônico.
- `onCaptureError`: código estável e mensagem segura para diagnóstico.

Não emitir `onPcmChunk` para a interface JavaScript no desenho de produção. Se o runtime de inferência escolhido exigir buffers JS, isso será uma decisão arquitetural separada, com benchmark de cópias, latência e memória antes de aprovação.

## Responsabilidades Android

1. Solicitar `RECORD_AUDIO` somente após o usuário ativar Wake em uma ação clara.
2. Verificar a permissão também no método nativo; não confiar apenas no estado JavaScript.
3. Capturar PCM mono PCM16 em taxa efetiva conhecida e entregar diretamente ao detector.
4. Não gravar arquivos nem transmitir áudio ambiente para a nuvem.
5. Parar e liberar o microfone ao desligar Wake, ao receber pausa/background da Activity ou ao destruir o contexto do módulo.
6. Tratar falha de inicialização, erro de leitura, interrupção de áudio e mudança de rota sem deixar a UI indicar falsamente que continua ouvindo.
7. Não manter captura ativa com tela bloqueada nem implementar serviço em segundo plano nesta primeira versão.

## Segurança e privacidade

- Indicador visual persistente enquanto o microfone estiver ativo.
- Controles explícitos para ativar e parar.
- Nenhum áudio bruto, transcrição ambiente ou buffer PCM em logs.
- A detecção da palavra de ativação deve ocorrer localmente.
- A nuvem só será acionada depois de uma ativação válida e de uma ação subsequente do usuário para conversar, salvo configuração futura claramente consentida.

## Estrutura Expo prevista

O módulo será criado como módulo local dentro de `modules/nero-wake`, com:
- `expo-module.config.json` registrando a classe Kotlin Android;
- `index.ts` com contrato TypeScript;
- implementação Kotlin usando Expo Modules API;
- testes nativos para start/stop, permissão, erro de captura e ciclo de vida.

A documentação oficial recomenda criar módulos locais com `npx create-expo-module@latest --local`; o autolinking descobre os módulos locais. A classe nativa deve expor operações longas por `AsyncFunction`, declarar eventos por `Events` e enviar eventos por API do módulo. O módulo Android deve usar os listeners de ciclo de vida da Activity para interromper captura quando ela entrar em background.

## Critérios para começar a implementação

- Modelo local de wake word em português brasileiro escolhido e licença aprovada.
- Runtime Android escolhido e compatibilidade com o formato do modelo demonstrada.
- Entrada PCM necessária documentada (taxa, canais, encoding, frame size).
- Estratégia de resampling definida e testável para dispositivos que não suportem a taxa pedida.
- Build Expo SDK 54 / RN 0.81.5 em ambiente Android reproduzível.
- Teste físico de permissão, interrupção, encerramento, falsos acionamentos, CPU e bateria.

## Limites atuais

Este ADR é um contrato de arquitetura, não uma implementação. Nenhum módulo Expo foi criado ou integrado, nenhum wake word está ativo e nenhum APK foi gerado. O spike Kotlin em `native-spikes/android-pcm` continua sendo referência isolada e não compilada/testada.

## Fontes

- Expo — criação de módulos locais: https://docs.expo.dev/modules/get-started/
- Expo — referência da API de módulos, AsyncFunction e eventos: https://docs.expo.dev/modules/module-api/
- Expo — configuração do módulo e autolinking: https://docs.expo.dev/modules/module-config/
- Expo — listeners de ciclo de vida Android: https://docs.expo.dev/modules/android-lifecycle-listeners/
- Android — AudioRecord: https://developer.android.com/reference/android/media/AudioRecord
