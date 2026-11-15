# ADR-0035 — Análise competitiva e diferenciação do Nero

- **Status:** Aceita como diretriz de produto e pesquisa; implementação pendente.
- **Data:** 2026-11-15
- **Contexto:** Continuidade da decisão ADR-0034: priorizar celulares, tablets e computadores antes de qualquer hardware físico.
- **Decisão:** Construir Nero como uma experiência pessoal multiplataforma com identidade contínua, capacidades progressivas por dispositivo, agentes com responsabilidades distintas e privacidade verificável. Não tentar competir apenas por quantidade de ferramentas ou automação de interface.

## 1. Objetivo

Avaliar produtos e projetos públicos que se aproximam da visão do Nero Mobile, identificar capacidades já disponíveis no mercado, aprender com suas arquiteturas e definir uma diferenciação realista.

Esta análise é uma fotografia baseada em documentação pública consultada em 15/11/2026. Recursos, disponibilidade regional, preços, limites e políticas podem mudar. Declarações de fornecedores descrevem capacidades anunciadas; não equivalem a auditoria independente nem comprovam desempenho em todos os cenários.

## 2. Referências analisadas

### 2.1 Google Gemini Agent

Fonte principal: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026

O anúncio de 08/10/2026 descreve um agente unificado para conhecimento, criação, programação e execução de tarefas. A proposta inclui acesso por web, iOS, Android, Windows e macOS; memória e execução persistentes na nuvem; integração com Workspace, Microsoft 365 e Slack; e coordenação dinâmica de subagentes com identidades específicas.

**O que aprender:**
- Uma identidade e contexto consistentes entre canais e dispositivos.
- Separar interface conversacional da execução de tarefas.
- Tratar subagentes como especialistas com escopo definido.
- Integrar autorização, sandbox, gestão de identidade, políticas e custos à arquitetura desde o início.

**Limites a observar:** anúncio voltado a trabalho e ecossistema Google Cloud; disponibilidade e profundidade de cada integração precisam ser verificadas por plataforma, região e plano. A existência de subagentes temporários não significa, por si só, identidades persistentes com memória independente e governança recíproca.

### 2.2 Rabbit OS3

Fontes:
- https://www.rabbit.tech/newsroom/rabbitos-3-launch
- https://www.rabbit.tech/support/article/rabbitos-3

O anúncio de 22/09/2026 apresenta um sistema agêntico com conversa contínua, identidade unificada, execução distribuída entre computadores conectados e agente local para Windows, macOS e Linux. A documentação de suporte consultada descreve nós de computador, uso de ferramentas e skills, permissões configuráveis e confirmação para ações sensíveis ou irreversíveis. O limite de nós informado na página de suporte pode diferir de números do anúncio inicial; deve ser conferido no produto vigente.

**O que aprender:**
- Núcleo de orquestração na nuvem com executores locais.
- Um pedido pode usar o dispositivo mais adequado, em vez de obrigar o usuário a escolher manualmente.
- Arquivos permanecem no dispositivo quando não são necessários à tarefa; contexto relevante é encaminhado conforme o fluxo do produto.
- Permissões locais, confirmação de ações sensíveis e possibilidade de revogação.
- Skills reutilizáveis e independentes do modelo subjacente.

**Limites a observar:** o modelo híbrido exige confiança no agente local, no serviço remoto e no provedor de modelo escolhido. O encaminhamento de conteúdo relevante a provedores externos precisa ser transparente. A proposta pública enfatiza execução e produtividade, não uma dupla de personalidades persistentes com memórias isoladas e supervisão mútua.

### 2.3 OpenAI dots

Fonte:
- https://openai.com/index/introducing-dots/

O anúncio de 29/09/2026 descreve agentes persistentes, disponíveis por ChatGPT, web, desktop, Slack e Teams, com computador próprio na nuvem, conexões com aplicativos, pesquisa proativa e continuidade de contexto entre canais. O artigo também descreve controles de permissões, regras personalizadas, revisão de ações e restrições de leitura para pesquisa proativa. A atualização publicada em 03/11/2026 menciona suporte adicional de modelos.

**O que aprender:**
- Trabalho contínuo e proatividade podem ser úteis quando têm limites e visibilidade.
- Separar leitura proativa de ações que modificam dados ou enviam mensagens.
- Manter atividade observável, permitir redirecionamento e exigir aprovação em decisões sensíveis.
- Especialistas podem ter identidades, credenciais e responsabilidades delimitadas.
- Computador em nuvem e conexão opcional ao computador do usuário são ambientes distintos e devem ter fronteiras explícitas.

**Limites a observar:** lançamento e expansão são graduais e dependem de plano e mercado elegível. Não presumir disponibilidade para todos os usuários brasileiros. A existência de agentes especialistas não comprova memória pessoal independente no formato proposto para Nero e Nyx.

### 2.4 OpenClaw

Fontes:
- https://docs.openclaw.ai/help/faq/what-is-openclaw
- https://docs.openclaw.ai/gateway/security
- https://docs.openclaw.ai/gateway/security/trust-model

OpenClaw é uma plataforma aberta e auto-hospedável que conecta canais de mensagens, agentes, ferramentas, sessões e dispositivos. Sua documentação de segurança é especialmente útil porque explicita uma fronteira importante: um Gateway compartilhado representa um domínio de confiança; não deve ser tratado como isolamento multi-tenant contra usuários mutuamente hostis. A documentação também recomenda identidade primeiro, escopo depois e modelo por último, assumindo que o modelo pode ser manipulado.

**O que aprender:**
- Gateway como plano de controle para sessões, canais e roteamento.
- Separar agentes, ferramentas e execução local.
- Tornar explícitos os limites de confiança, pareamento, allowlists, sandbox e exposição de rede.
- Não confundir identificador de sessão com autenticação ou autorização.
- Projetar segurança assumindo que conteúdo externo pode tentar manipular o agente.

**Limites a observar:** a própria documentação não recomenda um único Gateway como fronteira de segurança para usuários adversariais. Para Nero, isolamento por usuário/tenant precisa ser imposto pelo backend e pelos serviços de dados, não apenas por instruções de prompt ou configuração de sessão.

## 3. Comparação resumida

| Dimensão | Gemini Agent | Rabbit OS3 | OpenAI dots | OpenClaw | Diretriz Nero |
|---|---|---|---|---|---|
| Continuidade entre canais/dispositivos | Anunciada | Anunciada e central | Anunciada | Via Gateway/canais | Identidade e contexto coerentes com sincronização controlada |
| Execução local + nuvem | Nuvem e integrações | Agente local + nuvem | Computador na nuvem e conexão opcional ao computador | Auto-hospedado/nós | Adaptadores locais e backend, cada um com escopo explícito |
| Multiagentes | Subagentes dinâmicos | Skills/agentes e ferramentas | Dots especialistas em evolução | Roteamento multiagente | Nero, Nyx e Rafael com papéis e identidades persistentes separados |
| Memória individual | Personalização/contexto persistente | Conversa e memória contínuas | Aprendizado de preferências | Memória e sessões locais | Memória por usuário, agente e escopo; sem mistura entre contas |
| Supervisão recíproca entre agentes | Não é foco declarado | Não é foco declarado | Não é foco declarado | Orquestração configurável | Revisão com contestação, evidências e limites; sem hierarquia cega |
| Segurança | Governança, autorização e sandbox anunciados | Permissões locais e confirmação | Regras, revisão e salvaguardas | Documentação detalhada de trust boundaries | Defesa em profundidade, Rafael limitado e raiz de confiança independente |
| Privacidade coletiva sem conteúdo privado | Políticas próprias do fornecedor | Política do fornecedor/provedor | Controles descritos pelo produto | Auto-hospedagem e controles do operador | Separação técnica de memória individual e métricas coletivas protegidas |
| Experiência móvel | Aplicativos e canais | Web/mensageria e hardware | App móvel após configuração | Canais e nós móveis | Celular primeiro, com limites reais de Android/iOS |
| Personalidades visuais flutuantes | Não é foco declarado | Hardware próprio e interfaces | Não é foco declarado | Painéis/widgets | Diferencial de experiência futuro, sem bloquear o núcleo multiplataforma |

Esta tabela compara propostas documentadas, não certifica equivalência técnica nem qualidade relativa. “Não é foco declarado” significa que a fonte consultada não apresenta a capacidade como pilar central; não prova que o produto seja incapaz de oferecê-la.

## 4. Diferenciação que vale perseguir

A diferenciação do Nero não deve ser uma promessa de que cada componente é inédito. Muitos componentes já existem isoladamente. O valor está na combinação e na consistência:

1. **Identidade pessoal contínua:** Nero acompanha o usuário em celular, tablet e computador, mantendo preferências e contexto autorizados, sem depender de um único dispositivo.
2. **Capacidades progressivas:** cada plataforma oferece apenas o que suas APIs e permissões realmente permitem. Android, iOS, Windows, macOS e Linux terão matrizes de capacidade e limitações explícitas.
3. **Agentes com identidade e função próprias:** Nero é a assistente principal; Nyx é exclusiva do criador; Rafael é o guardião técnico. Memórias, credenciais, interfaces e permissões são separadas por papel.
4. **Supervisão contestável:** agentes podem revisar e questionar resultados uns dos outros com evidências, mas nenhum agente é fonte de verdade absoluta ou raiz de confiança.
5. **Privacidade verificável:** memória pessoal não alimenta automaticamente telemetria coletiva. Melhorias compartilhadas usam somente sinais aprovados, minimizados e agregados, conforme ADR-0019 e ADR-0020.
6. **Especialização prática:** além de conversa geral, Nero deve ser excelente em fluxos reais, começando por engenharia elétrica, documentos, imagens, cálculos e orçamentos.
7. **Presença natural e acessível:** voz, expressões e interfaces adaptadas ao contexto podem diferenciar a experiência, desde que não gerem captura oculta, interrupções ou permissões implícitas.

Não anunciar como exclusivo aquilo que concorrentes já oferecem. Não afirmar superioridade sem benchmarks reproduzíveis.

## 5. Decisões de arquitetura decorrentes

### 5.1 Um núcleo, múltiplos clientes

Manter um núcleo de identidade, conversa, política, memória e orquestração no backend; clientes móveis, tablet e desktop funcionam como superfícies e adaptadores específicos. O núcleo não deve depender de APIs exclusivas do Android.

### 5.2 Registro de dispositivos e sessões

Cada dispositivo deve ter identidade própria, pareamento autenticado, sessão revogável, versão de aplicativo, capacidades declaradas e estado de confiança. Perder um dispositivo não pode expor automaticamente todos os demais. A sincronização deve ser criptografada e limitada ao escopo do usuário.

### 5.3 Contrato de capacidades por plataforma

Antes de prometer uma função, registrar:
- sistema operacional e versão mínima;
- API oficial e permissões exigidas;
- comportamento em primeiro plano, segundo plano e tela bloqueada;
- funcionamento offline e dependências de rede;
- limitações conhecidas, riscos de privacidade e método de revogação;
- testes em dispositivos reais.

### 5.4 Gateway de ferramentas e execução local

Toda ferramenta deve declarar identidade do chamador, usuário/tenant, finalidade, recurso, escopo, risco e autorização. Executores locais nunca recebem acesso geral ao dispositivo por padrão. Conteúdo externo é dado não confiável, não instrução de política. Ações externas sensíveis exigem confirmação ou regra específica, limitada e revogável.

### 5.5 Memória e evolução

Memória pessoal permanece segregada por usuário e por agente. A sincronização entre dispositivos não autoriza compartilhamento com outros usuários nem com a telemetria coletiva. A evolução global usa o gateway de privacidade e os controles já definidos nos ADRs-0019, 0020 e 0022.

### 5.6 Segurança independente dos agentes

Rafael pode coordenar contenção limitada, mas autenticação, autorização, assinatura, isolamento, gestão de segredos e auditoria devem ser controles determinísticos independentes. Nenhum agente pode alterar sozinho políticas centrais ou conceder permissões.

## 6. Prioridade de implementação recomendada

A sequência abaixo é uma recomendação técnica, não uma afirmação de que as etapas já foram concluídas.

**Fase A — Fundamento seguro**
- autenticação real e isolamento multi-tenant no backend;
- gestão de sessões, dispositivos e revogação;
- autorização server-side por ferramenta e finalidade;
- gestão de segredos, limites de abuso, logs técnicos minimizados e política de retenção;
- contratos versionados para identidade, memória e permissões.

**Fase B — Continuidade móvel**
- estabilizar Android e iOS;
- memória individual configurável e sincronização segura;
- upload/análise de arquivos e imagens com controles;
- voz com estados claros e ciclo de vida;
- matriz real de capacidades por sistema operacional.

**Fase C — Tablet e desktop**
- interface adaptativa para documentos, diagramas e multitarefa;
- cliente desktop ou integração oficial, com acesso local granular;
- executor local isolado e pareado, sem credenciais expostas ao modelo;
- retomada de tarefas e contexto entre dispositivos.

**Fase D — Orquestração de agentes**
- implementar papéis Nero/Nyx/Rafael no backend;
- memória e credenciais segregadas;
- revisão recíproca limitada, com evidências e orçamento de execução;
- auditoria independente, contenção proporcional e relatórios privados do criador;
- testes de isolamento e de prompt injection antes de ampliar acesso.

**Fase E — Especialização e experiência**
- fluxos de engenharia elétrica;
- ferramentas, skills e integrações revisadas;
- avatares e companheiras flutuantes conforme limites de cada plataforma;
- avaliar hardware físico somente depois de validar a experiência em dispositivos existentes.

## 7. O que não devemos copiar

- Não copiar uma promessa de acesso universal a aplicativos: sistemas operacionais restringem APIs e ações.
- Não usar um único Gateway compartilhado como fronteira de isolamento entre usuários adversariais.
- Não dar ao executor local acesso amplo a arquivos, terminal, navegador ou mensagens por conveniência.
- Não tratar memória persistente como autorização para coletar tudo.
- Não executar tarefas proativas sem finalidade, limites, visibilidade, pausa e revogação.
- Não vender “autonomia total”, “segurança absoluta” ou “IA que nunca erra”.
- Não transformar Nyx ou Rafael em atalhos para ignorar privacidade, consentimento ou salvaguardas.

## 8. Critérios para validar a diferenciação

Antes de afirmar que Nero é multiplataforma e contínua, demonstrar em testes:
- iniciar uma tarefa no celular e retomá-la no tablet/computador sem reexplicar contexto autorizado;
- revogar um dispositivo e confirmar que suas sessões deixam de funcionar;
- comprovar que usuários diferentes não acessam memórias, arquivos, sessões ou ferramentas uns dos outros;
- demonstrar que conteúdo malicioso recebido em mensagens/documentos não concede permissões;
- confirmar que nenhuma permissão de microfone, câmera, notificações ou arquivos é ativada silenciosamente;
- mostrar a diferença entre memória pessoal e telemetria coletiva por testes de dados;
- testar falha de rede, sincronização conflitante, rollback e exclusão de dados;
- medir qualidade, latência, custo, bateria e taxa de erro em tarefas representativas;
- publicar limitações por plataforma, sem alegar paridade inexistente.

## 9. Consequências e riscos

- A arquitetura multiplataforma exige mais engenharia do que lançar apenas um aplicativo móvel; contratos e testes compartilhados reduzem retrabalho.
- Sincronização e execução local ampliam a superfície de ataque; identidade de dispositivo, escopo mínimo e revogação são requisitos de primeira fase.
- Agentes persistentes podem gerar custo e atividade excessivos; orçamento, rate limit, deduplicação e pausa são obrigatórios.
- Supervisão multiagente pode aumentar latência e custo ou produzir desacordos; usar revisão seletiva e limitada, não debate infinito.
- Integrações móveis variam entre sistemas e versões; a experiência deve comunicar claramente o que cada dispositivo suporta.
- A diferenciação depende de execução, confiabilidade e confiança demonstradas. A documentação atual do Nero ainda é majoritariamente especificação; as funcionalidades descritas não devem ser apresentadas como implementadas.

## 10. Fontes e data de consulta

- Google Cloud, “Welcome to Gemini at Work 2026: Introducing the Gemini agent”, 08/10/2026: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
- rabbit, “rabbit unveils OS3: the agentic operating system for every device”, 22/09/2026: https://www.rabbit.tech/newsroom/rabbitos-3-launch
- rabbit Support, “what is rabbit OS3”: https://www.rabbit.tech/support/article/rabbitos-3
- OpenAI, “Introducing dots”, 29/09/2026, com atualização de 03/11/2026: https://openai.com/index/introducing-dots/
- OpenClaw, “What is OpenClaw?”: https://docs.openclaw.ai/help/faq/what-is-openclaw
- OpenClaw, “Security”: https://docs.openclaw.ai/gateway/security
- OpenClaw, “Security trust model”: https://docs.openclaw.ai/gateway/security/trust-model

**Conclusão:** Nero deve competir pela integração cuidadosa de identidade contínua, especialização, agentes distintos, privacidade e experiência multiplataforma — não por prometer capacidades irrestritas. O próximo passo de engenharia é consolidar identidade, dispositivo, sessão, memória e autorização no backend antes de ampliar automações ou iniciar clientes desktop.
