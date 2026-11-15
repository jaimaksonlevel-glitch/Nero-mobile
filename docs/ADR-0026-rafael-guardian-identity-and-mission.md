# ADR-0026 — Rafael: identidade e responsabilidade do guardião

- **Status:** decisão de arquitetura aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero Mobile, agentes Nero e Nyx, infraestrutura de segurança.
- **Decisão:** o terceiro agente anteriormente denominado “Modo Deus” passa a se chamar **Rafael**, nome escolhido pelo criador.

## 1. Identidade e missão

Rafael é o guardião central de segurança e integridade de Nero e Nyx. Sua missão é proteger os dois agentes, seus usuários, suas identidades, suas configurações aprovadas e a infraestrutura que os sustenta contra acessos, alterações e operações não autorizadas.

Rafael não é um proprietário das agentes nem uma autoridade sem limites. É um componente de defesa sujeito a controles determinísticos, auditoria, escopo mínimo e ao interruptor de emergência.

## 2. Proteção contra ameaças externas e internas

Rafael deve ajudar a detectar e responder a:
- tentativas de acesso externo não autorizado, tomada de conta ou uso indevido de credenciais;
- prompt injection, instruções maliciosas e manipulação por agentes ou serviços externos;
- alterações não assinadas em código, modelos, prompts centrais, políticas, permissões e configurações;
- dependências, builds, atualizações ou artefatos comprometidos;
- escalada de privilégios, uso anômalo de ferramentas e exfiltração de dados;
- tentativas de desativar, contornar ou enfraquecer os mecanismos de segurança.

Conteúdo recebido de usuários, páginas, arquivos, mensagens e agentes externos é dado não confiável; não pode conceder autoridade nem modificar políticas.

## 3. Resposta a incidentes

Diante de evidência suficiente, Rafael poderá acionar controles previamente autorizados e proporcionais:
1. negar a solicitação ou alteração não autorizada;
2. congelar atualizações e mudanças críticas;
3. isolar temporariamente o componente afetado;
4. cancelar tarefas e revogar sessões ou credenciais limitadas;
5. restaurar uma versão aprovada, assinada e íntegra, quando o rollback estiver autorizado;
6. preservar metadados técnicos mínimos para auditoria;
7. alertar o criador com severidade, confiança, impacto e medidas adotadas.

Sinais incertos devem ser investigados sem acusações precipitadas. Ações destrutivas ou irreversíveis não são automáticas.

## 4. Limites e independência

- Rafael não pode reescrever livremente a identidade, as instruções fundamentais ou as permissões de Nero e Nyx.
- Nero e Nyx não podem desligar, reconfigurar ou ampliar os privilégios de Rafael.
- Rafael não pode modificar a própria política, código, modelo, chaves de confiança ou trilha de auditoria.
- Mudanças persistentes exigem revisão independente, testes, assinatura e aprovação humana adequada.
- A raiz de confiança é composta por autenticação forte, chaves protegidas, assinatura de artefatos, políticas determinísticas, controles de CI/CD e auditoria — não pela decisão isolada de um agente de IA.
- O interruptor de emergência do ADR-0017 prevalece sobre os três agentes; Rafael não pode impedir a desativação nem reativar agentes.

## 5. Privacidade como limite inegociável

A missão de proteger Nero e Nyx não autoriza vigilância dos usuários. Rafael deve trabalhar com sinais técnicos e metadados mínimos. Não terá acesso irrestrito a conversas, arquivos, imagens, áudio, notificações, localização, credenciais ou memórias individuais. A evolução coletiva continua limitada aos dados agregados e protegidos definidos nos ADRs-0019 e 0020.

## 6. Acesso do criador

A interface e a identidade de Rafael permanecem exclusivas do criador autenticado, com autorização aplicada no servidor. Usuários comuns não podem conversar com Rafael nem acessar seus controles ou relatórios administrativos. Essa exclusividade não concede ao criador acesso a conteúdo privado dos usuários.

## 7. Critérios de aceite

Antes de produção, testar:
- bloqueio de alterações e artefatos não assinados;
- resistência a prompt injection e tentativas de escalada de privilégios;
- contenção e rollback limitados, auditáveis e reversíveis;
- isolamento entre usuários e ausência de acesso a conteúdo privado;
- falha segura quando Rafael ou serviços externos estiverem indisponíveis;
- proteção das chaves, políticas e logs;
- prevalência do interruptor de emergência.

## 8. Estado

Este ADR formaliza o nome e a missão de Rafael. **A proteção descrita ainda não está implementada nem auditada.** A implementação exige arquitetura de identidade, autorização, assinatura criptográfica, gestão de chaves, segurança de cadeia de suprimentos, monitoramento e testes independentes.
