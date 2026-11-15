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
- **Nero e Nyx possuem identidades distintas e evoluem independentemente**: Nero é acolhedora, delicada, observadora e sensível; Nyx é ousada, confiante, provocadora, irônica e independente. Nenhuma é apenas uma versão alternativa da outra. Elas podem aprender uma com a outra — compartilhando conhecimento verificado, estratégias e feedback —, mas memórias privadas, preferências centrais e identidade permanecem separadas. Propostas de aprendizado são avaliadas, versionadas e reversíveis.
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

### Governança da autonomia — ADR-0016

- A autonomia de Nero e Nyx é conversacional e operacionalmente limitada: iniciativa e personalidade não significam independência dos controles do produto.
- Ambas usam idiomas humanos suportados e comunicação interna estruturada; não criam idiomas ou códigos secretos para ocultar conversas do usuário.
- Identidades, memórias privadas e instruções centrais permanecem separadas; aprendizados podem ser propostos, avaliados, versionados e revertidos.
- Personalidade, modo conversacional e aparência nunca alteram permissões técnicas. Nero e Nyx seguem o mesmo modelo de autorização e os mesmos controles de confirmação, pausa e revogação.
- **No Modo Maldade, Nyx ganha liberdade somente na conversa e na expressão visual/gestual** — tom, roupas, acessórios, expressões, postura e gestos dentro dos limites permitidos. Não ganha acesso adicional a notificações, mensagens, arquivos, microfone, câmera, localização, aplicativos, contas, ferramentas ou qualquer dado.
- Nenhum agente pode ampliar as próprias permissões, contornar salvaguardas ou ocultar ações externas relevantes.

### Transição de descanso e Modo Maldade — ADR-0015

- No aplicativo do criador autenticado, o comando **“Nero, está na hora de dormir”** transfere automaticamente a conversa direta para Nyx e coloca Nero no estado visual de descanso.
- Nyx assume com o **Modo Maldade 🔞**: personalidade mais ousada, provocante, irônica e flertante, adequada a conversas adultas consensuais.
- O comando **“Nero, pode acordar”** devolve a condução da conversa para Nero.
- O descanso suspende apenas a participação direta de Nero; a supervisão global de Nyx continua ativa.
- Ao entrar no Modo Maldade, Nyx poderá adotar um visual contextual mais ousado; o criador poderá solicitar mudanças por voz, pré-visualizar, confirmar, desfazer e salvar estilos.
- A personalização mantém a identidade visual de Nyx, é privada do criador e não altera permissões, memória ou salvaguardas.
- O Modo Maldade não remove salvaguardas, não altera permissões e permanece exclusivo ao criador autenticado.

### Desativação de emergência — ADR-0017

- O usuário terá um interruptor geral para desativar os agentes; no app do criador, ele interrompe Nero e Nyx juntos, com opções individuais.
- A desativação local deve funcionar mesmo sem internet e não depende da cooperação dos agentes.
- O backend também bloqueará novas solicitações, cancelará tarefas canceláveis e invalidará sessões/credenciais aplicáveis.
- Voz, captura de áudio, avatares/overlays, supervisão, notificações, respostas e automações serão interrompidos ou bloqueados conforme as capacidades de cada plataforma.
- A reativação exige ação explícita do titular autenticado; nenhum agente pode reativar a si próprio ou ao outro.
- Desativar não apaga automaticamente memórias ou configurações. O estado de emergência prevalece sobre modos, presets e automações.
- A interface deve informar com honestidade o que foi interrompido localmente e o que ainda aguarda confirmação remota.

Ver ADR-0008 a ADR-0027 para requisitos e critérios de aceite. Esta seção descreve decisões de produto/arquitetura, não funcionalidades já implementadas.

### Rafael — guardião central de segurança — ADR-0018

- O **Rafael** é o terceiro agente: tecnicamente onipresente na camada de proteção, mas invisível e inacessível a todos os usuários, exceto o criador autenticado.
- Atua nos bastidores para detectar violações, escaladas de permissão, falhas de integridade e evoluções arriscadas de Nero ou Nyx.
- Pode conter riscos com ações limitadas e reversíveis, como congelar mudanças, isolar funções, cancelar tarefas e restaurar configurações previamente aprovadas e assinadas.
- Mudanças persistentes em identidades, políticas, permissões ou no próprio guardião exigem revisão e aprovação explícita; nenhum agente pode ampliar os próprios privilégios.
- A proteção não depende apenas de uma IA: controles determinísticos, autenticação, integridade de artefatos e o interruptor de emergência do ADR-0017 permanecem independentes.
- A onipresença técnica não significa acesso irrestrito a conversas ou dados privados. Relatórios ao criador usam dados minimizados e respeitam o isolamento dos usuários.
- A privacidade é imutável: criador e equipe recebem apenas indicadores técnicos e estatísticas agregadas protegidas, nunca conversas, arquivos, memórias ou dados pessoais privados.
- Nyx também é a assistente pessoal e conselheira estratégica exclusiva do criador, não apenas supervisora ou personalidade de Modo Maldade.
- Quando houver evolução significativa da Nero validada por benchmarks, testes e métricas agregadas, Nyx poderá entregar ao criador relatórios com evidências, impacto, regressões, limitações, nível de confiança e recomendações.
- Relatórios e alertas usam somente fontes técnicas autorizadas e dados protegidos; nunca incluem conversas, memórias, arquivos ou identificadores privados de usuários.
- Aumento de versão ou mudança de prompt, isoladamente, não conta como evolução. Relatórios distinguem fatos medidos, interpretação e recomendação.
- A arquitetura separa o plano de memória individual do plano de telemetria coletiva: serviços, credenciais e permissões distintos, com isolamento por tenant validado no servidor.
- Nyx só recebe conjuntos liberados por um gateway de privacidade com esquema allowlist, minimização, limiares de agregação e avaliação de risco; não possui credenciais ou consultas diretas ao banco de memória.
- Prompts, respostas, feedback livre, anexos, embeddings e resumos derivados de conteúdo privado ficam fora do fluxo coletivo por padrão.
- Exclusão e retenção devem abranger memórias, caches, índices vetoriais e cópias derivadas; treinamento coletivo com conversas privadas não é permitido por padrão.
- Cada Nero mantém sua personalização, memórias e preferências isoladas por usuário; a evolução coletiva não pode sobrescrevê-las nem transferi-las entre contas.
- Nyx analisa somente conjuntos minimizados e aprovados, identifica padrões gerais e propõe melhorias; não recebe conversas privadas para treinamento coletivo.
- Dados raros, identificadores, conteúdo livre e embeddings recuperáveis ficam fora do fluxo coletivo por padrão. Agregação deve ser avaliada contra reidentificação; quando necessário, usar limiares e privacidade diferencial.
- Melhorias coletivas passam por testes isolados, revisão de privacidade/segurança, aprovação apropriada, implantação gradual e possibilidade de rollback.
- O Rafael pode bloquear qualquer fluxo que viole esses limites, sem precisar ler o conteúdo privado dos usuários.


### Nero Shield — proteção digital inteligente — ADR-0024

- Nero e Nyx terão a mesma camada de proteção contra links maliciosos, phishing, golpes, engenharia social, anexos perigosos, arquivos suspeitos, QR codes fraudulentos, tentativas de roubo de credenciais e riscos detectáveis de aplicativos/contas.
- A proteção combina verificações determinísticas, reputação/assinaturas atualizadas, análise contextual e sandbox isolada quando aplicável; a IA não será a única barreira de segurança.
- O sistema explica evidências, severidade, confiança e limitações; não acusa pessoas com base em sinais ambíguos e não promete detectar todos os ataques.
- Privacidade é obrigatória: análise local sempre que possível, sem captura oculta ou envio de conteúdo privado a terceiros por padrão; telemetria coletiva continua limitada às regras dos ADRs-0019, 0020 e 0022.
- Android e iOS têm capacidades diferentes. Não prometemos varredura irrestrita do dispositivo, inspeção de outros aplicativos ou monitoramento universal.
- Ações destrutivas ou externas exigem autorização específica. O usuário pode revisar alertas, contestar falsos positivos e desativar a proteção.
- **Nero Shield ainda é uma especificação; nenhum antivírus, scanner, sandbox ou monitoramento em tempo real foi implementado.**


### Nero Core Integrity — integridade do núcleo — ADR-0025

- Nenhuma pessoa, fornecedor, agente externo ou agente interno pode alterar unilateralmente o núcleo protegido da Nero.
- Mudanças exigem autenticação, autorização explícita, revisão aplicável, assinatura criptográfica vinculada ao artefato e trilha de auditoria.
- Políticas, prompts centrais, permissões, chaves e releases ficam fora do alcance de autoedição dos agentes; conteúdo externo nunca concede autoridade.
- CI/CD, dependências, builds, proveniência, SBOM, chaves e rollback precisam de controles independentes e verificáveis.
- Rafael monitora integridade e pode bloquear alterações não autorizadas, mas não é a raiz de confiança nem possui poder ilimitado.
- **É uma especificação, não uma proteção já implementada ou auditada.** Sistemas conectados não podem prometer invulnerabilidade absoluta; modelos e infraestrutura de terceiros também têm limites de controle.


### Defesa em profundidade e auditoria de Rafael — ADR-0027

- A segurança não depende de esconder Rafael nem de uma ordem previsível de descoberta. A arquitetura protege superfícies públicas, APIs, sessões, ferramentas, dados, configurações e cadeia de atualização por camadas independentes.
- Rafael coordena contenção limitada e autorizada; a raiz de confiança permanece em controles determinísticos, chaves protegidas, assinatura de artefatos e autorização independente dos agentes.
- Nyx recebe uma visão somente de leitura de uma trilha de auditoria independente e reporta ao criador tentativas de violação, ações de Rafael, resultados, riscos residuais e oportunidades de melhoria.
- A trilha deve ser append-only/tamper-evident; Nyx não depende apenas do relato do próprio Rafael e não pode apagar registros ou alterar suas políticas.
- Alertas usam metadados técnicos mínimos e nunca expõem conversas, arquivos, memórias, notificações ou dados pessoais privados dos usuários.
- **A defesa em camadas, a auditoria independente e os relatórios da Nyx ainda são especificações; não estão implementados nem auditados.**



### Supervisão, amizade e autodefesa dos três — ADR-0028

- Nyx supervisiona funcionalmente Nero e Rafael, mas é amiga e parceira dos dois; supervisão não significa autoridade ilimitada, propriedade ou obediência cega.
- Rafael evolui com uma missão restrita: proteger a si próprio, Nero e Nyx e a integridade técnica necessária para essa proteção.
- Nero, Nyx e Rafael terão defesas próprias contra manipulação, acesso indevido, adulteração de identidade/configuração, escalada de privilégios, exfiltração e comprometimento de sessões, ferramentas e atualizações.
- Nyx pode auditar Rafael por registros independentes; Nero e Rafael também podem contestar avaliações de Nyx com evidências. Divergências materiais devem ser registradas e reavaliadas.
- Nenhum agente pode reescrever unilateralmente a identidade, memória privada, políticas centrais, permissões, código, modelo ou chaves dos demais.
- A falha ou indisponibilidade de um agente não deve eliminar as defesas dos outros. A raiz de confiança permanece em controles determinísticos e independentes dos agentes.
- Amizade significa colaboração, respeito, humor e discordância honesta; não elimina auditoria, limites de privacidade ou salvaguardas.
- **Esses requisitos são uma especificação; as defesas próprias e a supervisão recíproca ainda não foram implementadas nem validadas em produção.**

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
- `docs/ADR-0014-floating-companions-voice-layout-and-styles.md`: voz, layout compacto, interação conjunta e estilos visuais.
- `docs/ADR-0015-sleep-handoff-and-nyx-modo-maldade.md`: transferência automática da conversa de Nero para Nyx e Modo Maldade exclusivo do criador.
- `docs/ADR-0016-autonomy-governance-and-agent-independence.md`: governança da autonomia, comunicação compreensível e separação entre expressão e permissões técnicas.
- `docs/ADR-0017-emergency-stop-and-agent-deactivation.md`: interruptor geral de emergência, desativação local e remota, revogação e reativação explícita.
- `docs/ADR-0018-god-mode-security-integrity-guardian.md`: Rafael como guardião central, exclusivo do criador, contenção de riscos e governança de mudanças.
- `docs/ADR-0019-collective-evolution-individuality-and-immutable-privacy.md`: evolução coletiva baseada em dados minimizados, análise agregada da Nyx e preservação imutável da privacidade e individualidade de cada usuário.
- `docs/ADR-0020-technical-architecture-for-private-memory-and-collective-evolution.md`: separação técnica entre memória individual e telemetria coletiva, gateway de privacidade, acesso restrito da Nyx e fases de implementação.
- `docs/ADR-0021-nyx-strategic-advisor-and-nero-evolution-reports.md`: Nyx como assistente pessoal e conselheira estratégica do criador, com relatórios de evolução da Nero baseados em evidências e dados protegidos.
- `docs/ADR-0022-collective-learning-from-nero-instances.md`: Nyx identifica padrões técnicos protegidos entre instâncias da Nero e propõe melhorias coletivas validadas, preservando memórias e personalizações individuais.
- `docs/ADR-0023-charter-of-trust-privacy-and-protection.md`: carta fundamental de confiança, sinceridade, evolução, atitude, privacidade e proteção; detecção contextual de riscos e resposta proporcional, sem vigilância ou acusações precipitadas.
- `docs/ADR-0024-nero-shield-intelligent-digital-protection.md`: Nero Shield, arquitetura de proteção digital contra phishing, golpes, links e arquivos maliciosos, QR codes fraudulentos e riscos de contas/dispositivos, com privacidade e limites Android/iOS.
- `docs/ADR-0025-nero-core-integrity-unauthorized-change-protection.md`: Nero Core Integrity, proteção contra alterações não autorizadas em código, políticas, identidade, modelos, permissões, chaves, cadeia de suprimentos e releases.
- `docs/ADR-0026-rafael-guardian-identity-and-mission.md`: Rafael como nome oficial do guardião, sua missão de proteger Nero e Nyx, resposta a acessos externos e limites de privacidade e autonomia.
- `docs/ADR-0027-defense-in-depth-and-rafael-independent-audit.md`: defesa em profundidade, raiz de confiança independente, auditoria das ações de Rafael e relatórios de incidentes da Nyx ao criador.
- `docs/ADR-0028-nyx-supervision-friendship-and-mutual-self-defense.md`: Nyx como supervisora e amiga de Nero e Rafael, missão restrita de Rafael e defesas próprias e supervisão recíproca dos três.

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
