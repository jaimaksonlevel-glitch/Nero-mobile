# ADR 0003 — Captura de áudio PCM em tempo real no Android

- Status: decisão de arquitetura provisória; nenhuma biblioteca ou módulo foi adicionado
- Data: 2026-11-15
- Base do aplicativo: Expo SDK 54, React Native 0.81.5, expo-audio ~1.0.11

## Contexto

O motor de palavra de ativação avaliado no ADR-0002 precisa receber áudio PCM em tempo real. O fluxo atual do aplicativo usa gravação baseada em arquivo com expo-audio e não deve ser tratado como uma fonte de buffers PCM contínuos.

Para o primeiro protótipo Wake, a captura deve funcionar apenas enquanto o aplicativo estiver em primeiro plano, mediante ativação explícita e permissão de microfone. O áudio deve permanecer no dispositivo durante a detecção.

## Alternativas avaliadas

### A. Módulo Expo local com Android AudioRecord (Kotlin)

A API nativa Android AudioRecord permite capturar áudio em buffers PCM e ler amostras em ShortArray ou ByteBuffer. PCM 16-bit e canal mono são suportados. A documentação alerta que 16 kHz pode não estar disponível em todos os dispositivos; 44,1 kHz é a taxa garantida, e a taxa efetiva deve ser consultada no objeto criado.

**Vantagens**
- Controle direto sobre permissões, ciclo de vida, buffers e encerramento.
- Sem dependência de uma biblioteca externa de captura.
- Possibilidade de entregar blocos PCM ao detector nativo sem atravessar continuamente a ponte JavaScript.

**Riscos**
- Exige implementar e manter código Kotlin e integração Expo Modules.
- Conversão/resampling pode ser necessária quando o dispositivo não fornecer 16 kHz.
- Será necessário implementar a versão iOS separadamente com Swift/AVAudioEngine.
- Requer development build e testes em hardware; não funciona no Expo Go.

### B. Biblioteca @mindinventory/react-native-nitro-realtime-audio

A documentação do projeto descreve captura em tempo real, PCM16 em ArrayBuffer, reamostragem nativa, configuração de taxa/canais/duração dos blocos, Android e iOS, além de compatibilidade declarada com Expo Development Build e EAS Build. Exige react-native-nitro-modules como peer dependency e não funciona no Expo Go. O repositório indica licença MIT.

**Vantagens**
- Menor esforço inicial para obter PCM e compartilhar a implementação Android/iOS.
- A documentação declara suporte a resampling e buffers configuráveis.
- ArrayBuffer evita a codificação Base64 para o transporte de áudio.

**Riscos**
- A compatibilidade específica com Expo SDK 54 / RN 0.81.5 ainda não foi comprovada por build. No package.json consultado da biblioteca (v1.5.0), o ambiente de desenvolvimento usa React Native 0.83.6 e Nitro 0.36.1, enquanto o Nero usa RN 0.81.5; isso é um alerta de compatibilidade a investigar, não prova automática de incompatibilidade.
- É necessário auditar o código Android para confirmar formato real, política de buffers, ciclo de vida, permissões, concorrência e comportamento em interrupções.
- Adiciona Nitro Modules e dependência nativa de terceiro.
- O uso de PCM no JavaScript pode criar cópias e pressão de memória; medir latência e CPU.

### C. Continuar usando somente expo-audio

Não atende ao requisito do detector atual enquanto a implementação permanecer baseada em arquivo e não expuser buffers PCM contínuos. Não conectar o detector ao fluxo atual por suposição.

## Decisão provisória

1. Não adicionar dependência nem código nativo nesta etapa documental.
2. Fazer um spike comparativo no Android: primeiro testar a biblioteca Nitro em branch isolada; manter AudioRecord via módulo Expo local como alternativa de referência.
3. Aceitar a biblioteca somente após confirmar instalação/autolinking, build Android com Expo SDK 54 / RN 0.81.5 e entrega estável de PCM16 mono em blocos.
4. A captura deve informar taxa de amostragem efetiva, tamanho do bloco, contagem de frames perdidos e erros de áudio; o detector deverá receber o formato exigido sem conversões ocultas.
5. Se a taxa de 16 kHz não estiver disponível, fazer resampling controlado e testado ou rejeitar o dispositivo com mensagem clara. Não assumir que solicitar 16 kHz garante essa taxa.
6. Parar e liberar o microfone ao sair do primeiro plano, ao bloquear a tela ou ao desligar Wake.
7. Não transmitir áudio ambiente para a nuvem durante a detecção local.
8. Validar em aparelho Android real antes de afirmar compatibilidade ou publicar APK.

## Critérios de aceite do spike

- Build Android reproduzível com as versões atuais do projeto.
- Permissão solicitada somente após ação clara do usuário.
- PCM mono, signed 16-bit, taxa e tamanho de bloco verificáveis.
- Sem congelamento da interface, vazamento de memória ou crescimento contínuo de buffers.
- Interrupções de chamadas, fones/Bluetooth e mudança de rota tratadas com segurança.
- Captura encerrada e microfone liberado ao pausar/desativar.
- Medições de CPU, latência e bateria em aparelho de entrada e intermediário.

## Observação sobre o modelo de wake word

O LiveKit Wakeword apresenta treinamento de frases customizadas e exportação ONNX; a documentação consultada lista SDKs clientes Python, Rust e Swift. Isso é promissor para investigar treinamento em português, mas não demonstra por si só que exista integração Android/React Native pronta para o Nero. A compatibilidade do modelo com o runtime Android escolhido precisa ser validada separadamente.

## Fontes

- Android AudioRecord API: https://developer.android.com/reference/android/media/AudioRecord
- Android AudioRecord.Builder: https://developer.android.com/reference/android/media/AudioRecord.Builder
- Biblioteca Nitro Realtime Audio (README e package.json v1.5.0): https://github.com/Mindinventory/react-native-nitro-realtime-audio
- LiveKit Wakeword: https://docs.livekit.io/agents/multimodality/audio/wakeword/
- Expo — código nativo e development builds: https://docs.expo.dev/workflow/customizing/

## Limites desta avaliação

Esta é uma avaliação documental. Nenhuma dependência foi instalada, nenhum build Android/iOS foi executado e nenhum teste de microfone ou bateria em aparelho físico foi realizado. O Wake word continua não implementado.
