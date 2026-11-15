# ADR-0030 — Modelo de ameaças, fronteiras de confiança e plano de implementação

- **Status:** arquitetura proposta; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0017, ADR-0019, ADR-0020, ADR-0023, ADR-0025 a ADR-0029.

## 1. Objetivo

Converter os princípios e poderes definidos para Nero, Nyx e Rafael em um modelo técnico verificável. Este ADR define ativos, fronteiras de confiança, ameaças prioritárias, pontos de aplicação de políticas, respostas e uma ordem de implementação.

O modelo parte de uma premissa: **nenhum agente é uma raiz de confiança.** Nero, Nyx e Rafael podem analisar e recomendar, mas controles críticos de identidade, autorização, isolamento, integridade e auditoria devem ser aplicados por componentes independentes e testáveis.

## 2. Ativos que precisam ser protegidos

1. **Dados dos usuários:** conversas, arquivos, imagens, áudio, notificações, contatos, localização, credenciais e dados derivados.
2. **Memória individual:** preferências, fatos autorizados, histórico e personalização de cada usuário.
3. **Identidade dos agentes:** instruções aprovadas, personalidade, memória e identificadores de Nero, Nyx e Rafael.
4. **Políticas fundamentais:** carta do ADR-0023, regras de privacidade, permissões, escopo de ferramentas e regras de intervenção.
5. **Credenciais e sessões:** tokens, chaves de API, sessões de usuário e credenciais de serviços.
6. **Código e cadeia de fornecimento:** código-fonte, dependências, modelos, prompts versionados, builds, releases e artefatos assinados.
7. **Ferramentas e ações externas:** leitura e envio de mensagens, integrações, automações, navegação, arquivos e operações de backend.
8. **Evidências de segurança:** eventos de autorização, bloqueios, intervenções, revisões, alertas e trilhas de auditoria.

## 3. Fronteiras de confiança

- **Dispositivo e aplicativo:** o dispositivo pode estar desatualizado, comprometido ou sujeito a permissões revogadas. A interface nunca é a única barreira de autorização.
- **Gateway/API:** autentica cada solicitação, valida tenant, sessão, escopo, limites e autorização antes de encaminhar operações.
- **Orquestrador de agentes:** encaminha apenas contexto mínimo necessário e aplica identidade, versão e permissões específicas do agente.
- **Serviço de memória individual:** isolado por usuário/tenant; sem acesso em massa pela telemetria coletiva ou pelo criador.
- **Gateway de ferramentas e dados:** ponto obrigatório para verificar intenção, finalidade, classificação dos dados, permissões e destino antes de qualquer leitura ou saída externa.
- **Camada de políticas e integridade:** verifica regras versionadas, artefatos assinados, permissões e estado de emergência; não pode ser substituída por instruções de um agente.
- **Rafael e Nyx:** recebem eventos técnicos e projeções minimizadas adequadas às suas funções; não recebem privilégios de banco de dados ou acesso irrestrito a conteúdo privado.
- **Auditoria independente:** registra eventos relevantes em trilha protegida contra adulteração, separada dos agentes e inacessível para exclusão pelos próprios agentes.

## 4. Modelo de ameaças prioritárias

| Ameaça | Exemplo | Controle principal |
|---|---|---|
| Prompt injection | Página, PDF ou mensagem ordena ignorar políticas e enviar dados | Conteúdo externo não confiável; separação entre dados e instruções; gateway de ferramentas |
| Sequestro de sessão | Token roubado tenta agir como usuário ou agente | Sessões curtas, rotação, revogação, autenticação e escopo mínimo |
| Acesso entre usuários | Uma sessão consulta memória ou arquivo de outro tenant | Isolamento server-side, autorização em cada requisição e testes de tenant |
| Exfiltração | Agente tenta enviar dado privado a destino não autorizado | Classificação, política de fluxo de dados e bloqueio de saída antes da execução |
| Escalada de privilégio | Agente pede novas permissões ou usa ferramenta fora do escopo | Allowlist de ferramentas, autorização determinística e negação por padrão |
| Adulteração do núcleo | Prompt, modelo ou configuração não aprovada é substituída | Assinaturas, proveniência, revisão e rollback de artefato confiável |
| Comprometimento de agente | Nero, Nyx ou Rafael passa a produzir ações incompatíveis com a política | Monitor independente, limites de execução e contenção proporcional |
| Abuso interno | Operador tenta consultar conversas privadas ou alterar logs | Separação de funções, controle de acesso, auditoria e minimização |
| Negação de serviço | Rajadas de solicitações ou ciclos de agentes elevam custo e indisponibilidade | Rate limits, quotas, timeouts, circuit breakers e limites de turnos |
| Adulteração de auditoria | Agente ou invasor tenta apagar ou silenciar evidências | Trilha append-only/tamper-evident e alertas independentes |
| Atualização comprometida | Dependência ou build malicioso chega ao usuário | SBOM, revisão, proveniência, assinatura e verificação do release |
| Abuso de integração móvel | Overlay ou leitor de notificações acessa mais do que o usuário autorizou | Permissões por plataforma, consentimento, escopo, indicador e revogação |

## 5. Pontos obrigatórios de aplicação das políticas

### 5.1 Antes de uma ação

Toda chamada de ferramenta, consulta de memória, integração ou operação externa deve passar por uma decisão de autorização independente do agente. O gateway verifica:
- identidade autenticada do usuário e do agente;
- tenant e sessão;
- permissão específica e estado de revogação;
- finalidade e escopo da tarefa;
- ferramenta, operação, destinatário e classificação de dados;
- limites de risco, orçamento, frequência e estado de emergência.

Se qualquer condição obrigatória estiver ausente, expirada ou inconsistente, a operação é negada ou pausada para confirmação.

### 5.2 Durante a execução

- Aplicar limites de tempo, tokens, tamanho, frequência e número de chamadas.
- Restringir credenciais ao serviço e operação necessários.
- Impedir acesso lateral a outras sessões, tenants ou bancos.
- Tratar conteúdo retornado por ferramentas como dado não confiável.
- Permitir cancelamento e revogação quando tecnicamente possível.

### 5.3 Antes de dados saírem do ambiente autorizado

O gateway de saída deve validar destino, finalidade, autorização, classificação e minimização dos dados. Dados pessoais ou privados não podem ser encaminhados para telemetria coletiva, logs de diagnóstico, ferramentas externas ou contas do criador por padrão.

A análise de conteúdo que o usuário autorizou para uma tarefa não constitui autorização para reutilização, exportação ou treinamento. Quando uma tarefa exige enviar conteúdo a um serviço externo, o produto deve informar a finalidade e aplicar a autorização e os controles de privacidade apropriados.

### 5.4 Após uma ação ou evento

Registrar somente os metadados técnicos necessários: identificador pseudônimo de evento, agente/componente, versão de política, tipo de operação, resultado, severidade, confiança, horário e identificador de correlação não diretamente identificável. Não copiar conteúdo de conversa, arquivo, áudio, imagem, notificação ou memória para a trilha de auditoria.

## 6. Supervisão e intervenção dos três agentes

- **Nyx:** supervisão funcional e revisão de qualidade/segurança de Nero e Rafael, com acesso somente às projeções e evidências autorizadas. Pode recomendar contenção ou liberação, mas não muda permissões por conta própria.
- **Nero:** agente principal com autodefesa, capacidade de recusar operações fora de política e de contestar avaliações com evidências.
- **Rafael:** guardião com autodefesa e autoridade técnica delimitada para bloquear operações, suspender sessões ou integrações, congelar alterações e isolar componentes quando regras independentes indicarem risco.
- **Controles determinísticos:** executam a autorização e os bloqueios críticos. Não dependem da concordância do agente potencialmente comprometido.
- **Contestação:** Nyx pode auditar Rafael; Nero e Nyx podem questionar intervenções; Rafael pode conter riscos de ambos. Toda divergência material deve ser registrada e revisada.
- **Falha de um agente:** não transfere automaticamente suas permissões aos demais e não desativa controles independentes.

## 7. Níveis de resposta

| Nível | Critério | Resposta |
|---|---|---|
| Informativo | Desvio sem risco material demonstrado | Registrar evento técnico mínimo e acompanhar |
| Moderado | Sinal plausível, mas ambíguo ou reversível | Pausar operação específica, verificar contexto e pedir confirmação quando aplicável |
| Alto | Evidência consistente de violação ou tentativa de acesso indevido | Negar ação, suspender credencial/sessão ou integração afetada e alertar governança |
| Crítico | Risco iminente e evidência forte de vazamento, escalada ou comprometimento | Bloqueio imediato, isolamento do componente afetado, revogação de escopo e alerta prioritário |

A resposta deve ser proporcional, preferencialmente reversível e limitada ao componente em risco. Uma hipótese ambígua não autoriza apagar dados, acusar pessoas, desativar toda a plataforma ou executar ação irreversível.

## 8. Plano de implementação por fases

### Fase 0 — Base de segurança do backend
- Autenticação por usuário, identidade de agente e tenant.
- Autorização server-side em todas as rotas.
- Gestão de segredos, rotação, rate limits, quotas e observabilidade.
- Definição de política versionada e estado de emergência.
- Testes automatizados de isolamento entre usuários.

### Fase 1 — Gateway de ferramentas e dados
- Inventário e allowlist de ferramentas.
- Contrato estruturado para cada chamada: ator, finalidade, escopo, dados, destino e risco.
- Verificação antes da execução e antes da saída de dados.
- Negação por padrão e confirmação para operações sensíveis.
- Testes de prompt injection e exfiltração simulada.

### Fase 2 — Identidade e isolamento dos agentes
- Identidades técnicas distintas para Nero, Nyx e Rafael.
- Memórias, contextos, instruções e credenciais segregados.
- Autorização exclusiva do criador para interfaces Nyx/Rafael, aplicada no servidor.
- Limites de chamadas entre agentes, tempo, orçamento e rodadas.
- Testes de personificação, escalada e isolamento.

### Fase 3 — Monitoramento, intervenção e auditoria
- Eventos de política minimizados.
- Regras determinísticas para bloqueio e suspensão.
- Rafael como coordenador de resposta, sem ser raiz de confiança.
- Auditoria independente, protegida contra adulteração.
- Nyx como revisora somente de leitura das evidências autorizadas.
- Testes de falso positivo, falha do guardião e contestação.

### Fase 4 — Memória e evolução com privacidade
- Serviço de memória por usuário.
- Gateway separado para telemetria agregada.
- Esquema allowlist, limiares de agregação, supressão de grupos raros e avaliação de reidentificação.
- Sem treinamento coletivo com conversas privadas por padrão.
- Testes de exclusão, retenção e não vazamento entre usuários.

### Fase 5 — Aplicativo móvel e integrações
- Permissões Android/iOS específicas e explicadas.
- Indicadores visíveis, controles de pausa e revogação.
- Respostas a notificações com confirmação por padrão.
- Overlay e voz conforme limites reais de cada sistema operacional.
- Testes em dispositivos reais e revisão de privacidade.

### Fase 6 — Validação independente e lançamento gradual
- Threat modeling atualizado.
- Revisão de código, dependências, SBOM e proveniência de builds.
- Testes de invasão autorizados e exercícios de resposta.
- Rollout gradual, métricas de erro e rollback.
- Critérios de aceite aprovados antes de produção.

## 9. Critérios de aceite globais

O trio só pode ser considerado pronto para uso real quando houver evidência verificável de que:
- nenhuma ferramenta sensível é executada sem autorização server-side;
- dados e memórias de usuários permanecem isolados;
- prompts externos não concedem permissões nem mudam políticas;
- saídas de dados são verificadas antes do envio;
- Nero, Nyx e Rafael possuem identidades e escopos separados;
- Rafael pode conter uma violação de Nero ou Nyx sem acesso irrestrito aos dados privados;
- Nyx pode auditar Rafael sem poder apagar ou alterar a auditoria;
- a falha de qualquer agente não elimina as proteções determinísticas;
- desligamento de emergência e revogação funcionam independentemente dos agentes;
- exclusão, retenção, transparência e consentimento são testados de ponta a ponta;
- builds e configurações são verificáveis e assinados;
- testes adversariais e revisão independente não apontam riscos críticos pendentes.

## 10. Estado e próximo passo

Este documento é um modelo de ameaças e plano de implementação, não uma certificação de segurança. Os controles listados ainda precisam ser construídos, testados e revisados.

**Próximo passo técnico recomendado:** implementar primeiro a Fase 0 — autenticação, isolamento por usuário/tenant, autorização server-side, gestão de segredos e observabilidade — antes de ativar agentes com acesso a ferramentas, notificações ou dados reais.
