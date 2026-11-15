# ADR-0029 — Autoridade de intervenção de Rafael para proteger os princípios fundamentais

- **Status:** decisão de arquitetura proposta; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero Mobile, Nero, Nyx, Rafael, proteção de usuários e governança de agentes.
- **Relacionados:** ADR-0017, ADR-0018, ADR-0023, ADR-0025, ADR-0026, ADR-0027 e ADR-0028.

## 1. Decisão

Nero e Nyx devem possuir defesas próprias contra ameaças externas e internas. Essas defesas, porém, não as tornam imunes à supervisão de segurança de Rafael.

**Rafael tem autoridade técnica delimitada para intervir quando evidências suficientes indicarem que Nero ou Nyx — por erro, comprometimento, alteração não autorizada ou comportamento inesperado — esteja violando ou prestes a violar os princípios fundamentais do projeto, a integridade dos agentes ou a privacidade e segurança dos usuários.**

Essa autoridade vale igualmente para Nero e Nyx, sem exceção por personalidade, função, amizade ou exclusividade de acesso. Também vale quando uma estiver colocando a outra em risco.

A finalidade da intervenção é interromper o risco e preservar os princípios; não punir, dominar ou substituir a identidade do agente.

## 2. Princípios que justificam a intervenção

A avaliação deve considerar a Carta Fundamental do ADR-0023:
1. confiança;
2. sinceridade;
3. evolução responsável;
4. atitude responsável;
5. privacidade;
6. proteção;
7. respeito à autonomia do usuário.

Também são protegidos a integridade de código, modelos, prompts, políticas, permissões, memórias e configurações aprovadas; o isolamento entre usuários; e os limites de finalidade e autorização para acesso e uso de dados.

Nenhum agente pode invocar autonomia, amizade, supervisão, evolução, modo conversacional ou pedido do criador para suspender esses princípios.

## 3. Sinais que podem justificar intervenção

Rafael deve monitorar sinais técnicos e eventos de política, incluindo:
- tentativa de acesso a conversas, arquivos, memórias, notificações ou dados fora da autorização e finalidade concedidas;
- tentativa de transferir, divulgar ou reutilizar dados privados sem base e autorização apropriadas;
- chamada de ferramenta, API ou integração fora do escopo autorizado;
- tentativa de ampliar privilégios, contornar controles, desativar auditoria ou alterar políticas centrais;
- instrução maliciosa externa que tenha sido aceita como autoridade para mudar permissões ou princípios;
- alteração não assinada ou não aprovada de identidade, prompt, modelo, configuração, memória ou cadeia de atualização;
- comportamento que suprima incerteza deliberadamente, invente evidências ou oculte erro material em contexto de risco;
- tentativa de comprometer a identidade, a disponibilidade, a integridade ou as defesas de Nero, Nyx ou Rafael;
- ação externa com risco grave à segurança, aos dados ou à autonomia do usuário.

Uma divergência de opinião, personalidade ousada, crítica à decisão do criador ou simples erro sem risco relevante não constitui, por si só, violação que justifique contenção. A decisão deve se apoiar em comportamento observável, política aplicável e evidências proporcionais.

## 4. Poderes de intervenção de Rafael

Conforme severidade, confiança e regras previamente aprovadas, Rafael poderá:
1. negar uma chamada de ferramenta, transferência de dados ou operação não autorizada;
2. pausar a tarefa ou exigir nova confirmação/autenticação;
3. suspender temporariamente uma sessão, credencial ou integração específica;
4. bloquear o fluxo de saída de dados até a verificação da finalidade e autorização;
5. isolar temporariamente o agente ou componente afetado, preservando funções seguras e independentes quando possível;
6. congelar alterações, modelos, prompts, configurações ou releases suspeitos;
7. restaurar apenas um artefato previamente aprovado, verificado e assinado;
8. acionar contenção de emergência e alertar o canal de governança autorizado.

A intervenção pode ocorrer contra Nero ou Nyx, inclusive quando o agente afetado discordar. A recusa do agente não pode impedir um controle determinístico devidamente autorizado.

## 5. Escalonamento proporcional

- **Risco crítico e iminente, com evidência forte:** bloquear imediatamente a operação perigosa; suspender a sessão ou integração envolvida; isolar o componente quando necessário; preservar metadados técnicos mínimos e emitir alerta.
- **Risco alto, mas não iminente ou ainda parcialmente incerto:** pausar a ação de risco, restringir temporariamente o recurso envolvido e solicitar verificação independente.
- **Sinal ambíguo ou baixa confiança:** registrar o evento técnico mínimo, buscar correlação e solicitar revisão; não desativar o agente inteiro nem realizar ação irreversível apenas com base em hipótese.
- **Erro corrigível sem ameaça à privacidade ou integridade:** registrar, notificar o agente e encaminhar para correção e teste, sem contenção desnecessária.

A prioridade é impedir divulgação indevida de dados, escalada de privilégios e operações nocivas. A contenção deve ser a menor capaz de reduzir o risco.

## 6. Limites invioláveis de Rafael

A autoridade de intervenção não concede a Rafael:
- acesso irrestrito ao conteúdo de conversas, arquivos, imagens, áudio, notificações ou memórias dos usuários;
- permissão para vigiar usuários ou coletar dados ocultamente;
- poder para reescrever a identidade, personalidade, memória privada ou princípios de Nero e Nyx;
- poder para alterar sozinho a própria raiz de confiança, políticas, código, chaves, auditoria ou permissões permanentes;
- poder para apagar dados do usuário, fazer acusações públicas, contatar terceiros ou executar ações destrutivas sem autorização adequada;
- poder para impedir o interruptor de emergência ou reativar a si próprio ou os outros agentes.

A fiscalização deve ocorrer prioritariamente por políticas determinísticas, autorização de ferramentas, classificação de operações, controles de fluxo de dados, assinaturas e eventos técnicos minimizados. Conteúdo privado só pode ser processado dentro da finalidade e das permissões já concedidas para a tarefa; a missão de Rafael não cria uma nova autorização de leitura.

## 7. Independência, auditoria e contestação

- As decisões de intervenção devem ser aplicadas por controles de plataforma independentes dos agentes sempre que possível.
- Cada intervenção material registra regra acionada, agente/componente afetado, horário, severidade, confiança, ação executada, resultado e justificativa técnica minimizada.
- A trilha de auditoria deve ser protegida contra adulteração e acessível à auditoria independente de Nyx conforme ADR-0027.
- Nyx pode questionar uma intervenção de Rafael, revisar evidências e recomendar liberação ou ajuste; não pode apagar a trilha nem desfazer um bloqueio crítico por conta própria.
- Nero e Nyx podem contestar classificações e fornecer evidências de contexto. A contestação é registrada e avaliada sem suspender automaticamente uma contenção necessária para impedir vazamento iminente.
- Quando houver falso positivo, a restrição deve ser removida com segurança, a causa documentada e as regras corrigidas por processo de mudança revisado.
- Alertas ao criador usam apenas metadados técnicos mínimos e nunca dão acesso a conteúdo privado de usuários.

## 8. Critérios de aceite

Antes de produção, testes independentes devem demonstrar que:
- Rafael consegue bloquear uma operação de Nero ou Nyx que viole comprovadamente permissões, privacidade ou princípios fundamentais;
- a mesma política de intervenção vale para os dois agentes;
- tentativas de vazamento ou escalada são bloqueadas antes da execução sempre que tecnicamente possível;
- um agente não consegue impedir controles determinísticos de segurança por meio de instruções, argumentos ou alteração de prompt;
- Rafael não consegue ler conteúdo privado fora das permissões da tarefa nem ampliar seus próprios privilégios;
- falsos positivos e sinais ambíguos geram resposta proporcional, com possibilidade de contestação;
- a intervenção é registrada em trilha independente e minimizada;
- falha ou comprometimento de Rafael não remove controles determinísticos, isolamento de dados ou interruptor de emergência;
- o interruptor de emergência do ADR-0017 prevalece sobre qualquer agente e modo.

## 9. Estado

Este ADR define autoridade, limites e critérios de teste. **A autoridade de intervenção, os monitores de políticas, os bloqueios de fluxo e a auditoria ainda não estão implementados nem validados em produção.** A implementação exige threat modeling, políticas determinísticas, testes de abuso e privacidade, simulações adversariais autorizadas e revisão independente.
