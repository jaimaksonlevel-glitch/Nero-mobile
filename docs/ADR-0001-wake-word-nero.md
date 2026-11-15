# ADR 0001 — Ativação por palavra-chave "Nero"

- Status: proposta técnica para protótipo; integração ainda não aprovada
- Data: 2026-11-15
- Escopo: Android e iOS, Expo SDK 54 / React Native

## Objetivo

Permitir que a pessoa diga "Nero" para iniciar uma interação por voz, sem transmitir áudio continuamente para um servidor. A detecção da palavra-chave deve acontecer localmente no aparelho.

## Decisão de arquitetura para a primeira prova de conceito

Não ativar escuta contínua nesta etapa. Primeiro implementar um modo **Wake em primeiro plano**:
1. A pessoa ativa explicitamente o modo Wake em uma configuração visível.
2. O aplicativo exibe um indicador persistente e claro de microfone ativo.
3. O detector local processa áudio no aparelho; nenhum áudio do detector é enviado à nuvem.
4. Ao detectar "Nero", o detector para/cede o microfone e a interface passa para captura curta de comando, com indicação visível.
5. A captura do comando é enviada ao endpoint de transcrição já existente somente após a detecção e com indicação ao usuário.
6. A pessoa pode pausar/desativar o modo Wake a qualquer momento. Ao sair do app, bloquear a tela ou perder o foco, o protótipo desativa a escuta.

## Motor avaliado: Picovoice Porcupine

Vantagens:
- SDK oficial para React Native com suporte documentado a Android e iOS.
- Suporta palavras-chave personalizadas e modelos em português.
- A detecção é executada no dispositivo.
- Requer permissão de microfone, AccessKey e modelos de palavra-chave por plataforma.

Restrições e riscos:
- A integração usa código nativo; Expo Go não basta. Será necessário gerar um development build/EAS build e integrar a biblioteca nativa.
- A documentação atual indica Android 5.0+ e iOS 16.0+ para o quick start React Native.
- O modelo personalizado precisa ser gerado/obtido no Picovoice Console e incluído como recurso nativo para cada plataforma.
- A documentação de termos/licença prevê acesso sujeito a trial e/ou contrato e taxas aplicáveis. A FAQ informa que não há plano dedicado gratuito/pago para uso pessoal/não comercial. Portanto, não assumir que o uso em produção é gratuito nem incorporar a dependência antes de confirmar a licença adequada ao produto.
- A AccessKey é credencial sensível: não inserir em commits públicos, logs ou código-fonte público. A estratégia de provisionamento precisa ser definida antes de produção.
- A execução em segundo plano depende das regras e decisões do Android/iOS; não prometer funcionamento contínuo com tela bloqueada. O protótipo será foreground-only.

## Alternativas e próximos testes

Antes de escolher definitivamente:
- Verificar condições comerciais e de redistribuição do Porcupine para o Nero Mobile.
- Fazer prova de conceito em Android real com o modelo "Nero" em português, medir falsos acionamentos, falhas de detecção, CPU, bateria e comportamento com ruído.
- Avaliar alternativa open-source com licença compatível e suporte móvel real, incluindo custo de manutenção da ponte nativa.
- Não enviar áudio ambiente para a API. A API só recebe o trecho de comando após a ativação explícita/detecção.

## Critérios de aceite

- Detecção offline, sem tráfego de áudio durante a espera.
- Indicador de microfone ativo sempre visível enquanto Wake estiver ligado.
- Controle claro para pausar/desligar.
- Sem escuta em segundo plano no primeiro protótipo.
- Teste documentado de falsos positivos/negativos, bateria e retomada após interrupção do sistema.
- CI verde e build de desenvolvimento testado em aparelho antes de declarar a função pronta.

## Referências

- Porcupine React Native Quick Start: https://picovoice.ai/docs/quick-start/porcupine-react-native/
- Porcupine FAQ (plataformas, precisão, consumo e execução em segundo plano): https://picovoice.ai/docs/faq/porcupine/
- Picovoice Terms of Use: https://picovoice.ai/docs/terms-of-use/
- Picovoice General FAQ (trial e uso pessoal): https://picovoice.ai/docs/faq/general/
- Expo — adicionar código nativo e development builds: https://docs.expo.dev/workflow/customizing/
