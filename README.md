# Nero Mobile

Aplicativo móvel do assistente Nero, da Level Engenharia.

## Identidade e experiência

- Android e iOS com Expo / React Native.
- Ativação planejada: palavra de ativação **“Nero”** (Wake).
- Personalidade **Hybrid**: técnico e objetivo em engenharia; natural e próximo em conversas.
- Idioma: português do Brasil.
- Princípio conversacional: comunicação espontânea, adaptável ao usuário e sincera, sem personalidades engessadas por contexto.

## Arquitetura de agentes — proposta aprovada, implementação pendente

- **Nero** é a assistente visível para todos os usuários.
- **Nyx** é uma agente e personalidade exclusiva do criador: somente ele, autenticado no servidor, pode vê-la e conversar diretamente com ela. Nenhum outro usuário pode invocá-la ou acessá-la. A avaliação automatizada interna da Nero no backend não concede acesso à personalidade Nyx.
- Nos aplicativos dos usuários, Nyx opera somente no backend; não aparece na interface.
- No aplicativo autenticado do criador, Nero e Nyx podem aparecer juntas, com personalidades e memórias separadas. A Nyx não é disponibilizada como assistente aos demais usuários.
- O criador poderá receber alertas minimizados sobre falhas relevantes identificadas pela supervisão. Alertas não devem expor conversas privadas, arquivos ou identificadores dos usuários por padrão.
- O **Modo dormir** do criador suspenderá o atendimento da Nero e transferirá a conversa para Nyx; não desliga a supervisão global.
- Nyx não substitui salvaguardas essenciais nem recebe acesso irrestrito a dados dos usuários.
- Nero e Nyx compartilharão uma Central de Assistência e Comunicação para notificações autorizadas, análise contextual e respostas em nome do usuário. **As duas terão exatamente as mesmas capacidades e o mesmo escopo de permissões**; a personalidade não altera privilégios. Memórias e identidades permanecem separadas, e ambas obedecem às mesmas regras de confirmação, automação, pausa e revogação.
- No Android, a proposta avalia NotificationListenerService e respostas somente por ações expostas pelo aplicativo ou integrações oficiais. No iOS, a experiência será limitada às APIs e extensões oficialmente disponíveis; não há promessa de leitura/resposta universal.
- Envio automático ficará desativado por padrão e só poderá ocorrer mediante regra explícita, específica e revogável do usuário.

### Aparência visual — ADR-0011

- Nero e Nyx terão direção visual humana realista, com traços e proporções naturais, evitando aparência de mascotes ou personagens infantis.
- A sensação de presença virá principalmente das expressões faciais, microexpressões, olhar, postura, gestos e movimentos naturais.
- Asinhas delicadas e integradas ao visual serão um detalhe fantástico complementar, não o foco principal.
- Cabelo, roupas, acessórios, paleta e expressões ajudarão a diferenciar as personalidades.
- Cada usuário poderá escolher, pré-visualizar, salvar e alterar a aparência da Nero; Nyx escolhe a própria aparência e pode considerar pedidos de ajuste do criador autenticado.
- A personalização não altera personalidade, voz, memória, capacidades ou permissões. A identidade visual e a interface da Nyx continuam exclusivas do criador.
- A autonomia visual da Nyx é uma decisão de produto/experiência, não uma afirmação de consciência independente.

### Companheiras Flutuantes — ADR-0012 a ADR-0014

- Nero estará disponível como avatar flutuante para usuários; Nero e Nyx poderão aparecer juntas somente no ambiente do criador autenticado.
- A dupla poderá interagir por voz e expressões, com turnos de fala, reações visuais, modo silencioso, legendas opcionais e controle de áudio.
- O layout prioriza avatares compactos, recolhíveis, arrastáveis e redimensionáveis, com expansão temporária sob comando do usuário.
- O estilo visual acompanha a personalização do perfil, incluindo a opção de renderização anime, sem alterar a identidade ou as permissões das personagens.
- Android exige autorização explícita para overlay; no iOS serão usadas apenas alternativas oficialmente permitidas.
- A presença visual não concede acesso a mensagens ou conteúdo de outros apps: permissões de notificações, microfone e respostas continuam independentes.

Ver ADR-0008 a ADR-0014 para requisitos e critérios de aceite. Esta seção descreve decisões de produto/arquitetura, não funcionalidades já implementadas.

## Estado do projeto

A versão 0.3.0 mantém síntese de fala local opcional (VOZ ON/OFF) e entrada de voz por gravação manual: o usuário toca no microfone para iniciar, toca novamente para parar e recebe a transcrição no campo de mensagem para revisar antes de enviar. O microfone só é solicitado após o toque; não há gravação em segundo plano nem escuta contínua. A integração web adiciona pesquisa opcional pela ferramenta `web_search` da Responses API, com links das fontes exibidos na conversa.

**O aplicativo ainda não está conectado a um backend implantado.** Para respostas reais, é necessário configurar e implantar o backend e definir `EXPO_PUBLIC_NERO_API_URL` no ambiente de build do Expo.

Ainda não estão implementados: palavra de ativação, execução em segundo plano, memória persistente, análise de arquivos/imagens, agentes Nero/Nyx, supervisão, integração com notificações e respostas a mensagens, modo dormir e módulos de engenharia. A entrada de voz envia a gravação ao backend para transcrição e depende de chave válida e serviço implantado. A pesquisa web depende de chave válida, acesso à API e implantação do backend. A síntese de fala local precisa ser testada em aparelhos Android e iOS.

## Estrutura

- `App.tsx`: interface e fluxo de conversa.
- `src/config/persona.ts`: identidade e princípios do Nero.
- `src/services/neroApi.ts`: cliente HTTP do aplicativo.
- `server/index.mjs`: backend Node.js que mantém a chave do provedor fora do aplicativo.
- `native-spikes/android-pcm/`: referência isolada de captura PCM Android, ainda não integrada.
- `docs/ADR-0001-wake-word-nero.md` a `docs/ADR-0007-wake-model-training-plan.md`: decisões e avaliações técnicas da arquitetura Wake.
- `docs/ADR-0008-adaptive-conversation-and-modes.md`: comunicação adaptável, personalidade e modos.
- `docs/ADR-0009-nyx-central-supervisor.md`: Nyx como agente supervisora central, privacidade, alertas e experiência do criador.
- `docs/ADR-0010-notification-assistant-integration.md`: integração de notificações e respostas, permissões Android/iOS, automação responsável e privacidade.
- `docs/ADR-0011-visual-identity-and-avatar-customization.md`: aparência humana realista, expressões e personalização visual.
- `docs/ADR-0012-floating-companions-overlay.md`: avatares flutuantes e interação contextual sobre outros aplicativos, respeitando Android/iOS.\n- `docs/ADR-0013-avatar-expression-and-motion-system.md`: estados expressivos, personalidade visual, animações e plano de prototipagem.

## Backend (ambiente privado de desenvolvimento)

Requisitos: Node.js 20 ou superior.

1. Entre na pasta `server`.
2. Defina `OPENAI_API_KEY` no ambiente do servidor.
3. Opcionalmente defina `OPENAI_MODEL` (padrão: `gpt-6-astra`) e `PORT` (padrão: `8787`).
4. Execute `npm start`.

O backend usa a API Responses com a ferramenta hospedada `web_search` e o endpoint `/transcribe` com o modelo `gpt-transcribe`; a chave nunca deve ser colocada no aplicativo. Pesquisa web e transcrição podem gerar custos adicionais de API. O endpoint inclui limite básico de tamanho e frequência. **Não publique o backend na internet antes de adicionar autenticação por usuário, proteção contra abuso, observabilidade e política de privacidade.**

Configure `EXPO_PUBLIC_NERO_API_URL` com a URL HTTPS do backend no ambiente de build. Não coloque segredos em variáveis `EXPO_PUBLIC_*`.

## Segurança e privacidade

- Nunca inserir chaves de API no código do aplicativo ou no repositório.
- A gravação só começa após toque explícito e permissão do sistema; não há microfone em segundo plano nem wake word nesta versão.
- O áudio gravado é enviado ao backend para transcrição; não usar gravações de clientes sem consentimento e política de retenção definida.
- Antes de uso real com dados de clientes, implementar autenticação, retenção mínima, exclusão de dados e controles de acesso.
- A supervisão da Nyx exige transparência para usuários, isolamento por usuário/tenant, minimização de dados, retenção limitada e auditoria. O criador não recebe acesso irrestrito a conversas privadas.
- Respostas técnicas devem apresentar premissas e alertar quando exigirem validação profissional, normas aplicáveis e ART.

## Wake: próxima etapa técnica

A palavra de ativação **ainda não está implementada**. O PCM Kotlin é somente uma referência, não foi compilado e não está ligado ao app. O ADR-0005 define o contrato proposto para um módulo Expo local: captura e inferência devem permanecer no lado nativo; o fluxo PCM bruto não deve ser transmitido continuamente para JavaScript nem para a nuvem.

O ADR-0006 avalia um port Kotlin de openWakeWord para Android; o ADR-0007 define o plano para treinar e validar um modelo próprio “Nero” em português brasileiro. O runtime continua candidato, não dependência aprovada. O pipeline upstream pode exportar ONNX, mas compatibilidade de tensores e pré-processamento deve ser testada. Licenças de código, vozes TTS e dados precisam ser verificadas individualmente. Nenhum modelo foi treinado ou integrado.

A documentação do Expo recomenda criar módulos locais com `npx create-expo-module@latest --local`. O projeto ainda não executou esse gerador nem criou o módulo nativo.

## Próximas etapas

1. Definir modelo local “Nero” em português brasileiro com licença adequada ao uso pretendido.
2. Fazer prova isolada do runtime openWakeWord/ONNX ou outra alternativa e validar formato do modelo.
3. Criar o módulo Expo local Android conforme ADR-0005, após escolher detector e runtime.
4. Executar build Android com Expo SDK 54 / RN 0.81.5 e validar PCM, permissões e ciclo de vida em aparelho real.
5. Medir CPU, bateria, latência e falsos acionamentos em ambiente silencioso e ruidoso.
6. Implantar backend privado com autenticação, controles de abuso, observabilidade e política de privacidade.
7. Implementar agentes Nero/Nyx, orquestração, supervisão, painel e alertas respeitando ADR-0009.
8. Implementar upload seguro e análise de imagens/PDFs.
9. Construir módulos de engenharia: cálculos, dimensionamento, projetos, diagnósticos e orçamentos.
10. Implementar memória configurável e sincronização entre dispositivos.
