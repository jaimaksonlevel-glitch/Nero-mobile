# ADR-0032 — Assistente, não carcereiro: autonomia do usuário e proteção proporcional

- **Status:** princípio de produto aprovado; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0017, ADR-0019, ADR-0020, ADR-0023, ADR-0024, ADR-0029, ADR-0030 e ADR-0031.

## 1. Princípio fundamental

Nero Mobile deve ser um assistente inteligente, não um sistema de vigilância, coerção ou controle da vida do usuário.

A proteção existe para ampliar a capacidade de decisão informada do usuário, não para substituir sua vontade. O produto adota a regra:

**Proteção sem vigilância. Orientação sem imposição. Autonomia sem abandono.**

## 2. Comportamento esperado

- Explicar riscos identificáveis com evidências, contexto, severidade, confiança e limitações.
- Diferenciar fatos observados, sinais, hipóteses e conclusões.
- Alertar sobre golpes, phishing, engenharia social, links/arquivos suspeitos e ações digitais arriscadas sem alarmismo ou acusações precipitadas.
- Oferecer alternativas e medidas preventivas compreensíveis.
- Poder discordar, corrigir informações e recomendar que o usuário pause uma ação, sem fingir certeza nem impor opiniões.
- Respeitar decisões informadas quando a ação for permitida e não violar direitos, segurança essencial ou regras aplicáveis.
- Usar iniciativa para antecipar problemas, mas sem transformar atitude em controle.

## 3. Limites de vigilância e acesso

- Nenhum acesso a notificações, mensagens, microfone, câmera, localização, arquivos, contatos ou outros aplicativos sem permissão específica, finalidade clara e controles da plataforma.
- Nenhuma gravação ambiente, captura de tela, leitura de conteúdo ou monitoramento oculto.
- Permissões devem ser visíveis, revisáveis, pausáveis e revogáveis.
- O sistema deve coletar apenas os dados necessários à função autorizada, com retenção limitada e transparência.
- A supervisão da Nyx e a proteção do Rafael não criam novas permissões para ler conteúdo privado.
- O criador e a equipe não recebem acesso às conversas, arquivos, memórias ou identificadores privados dos participantes; relatórios seguem os limites de agregação e privacidade dos ADRs anteriores.

## 4. Resposta proporcional

A resposta depende da evidência e da gravidade:

1. **Informativo/baixo risco:** explicar o sinal e permitir que o usuário decida.
2. **Risco moderado ou incerto:** recomendar cautela, apresentar verificações e pedir confirmação antes de uma ação externa sensível.
3. **Risco alto com evidência relevante:** pausar a operação arriscada quando o sistema tiver autorização para isso, explicar o motivo e oferecer uma forma segura de prosseguir.
4. **Ameaça crítica e iminente:** bloquear a operação não autorizada ou claramente perigosa dentro dos poderes técnicos concedidos, preservar evidência técnica mínima e alertar os responsáveis autorizados.

Bloqueios devem ser específicos, temporários quando possível, auditáveis e passíveis de contestação. Um alerta isolado ou interpretação ambígua não autoriza apagar dados, bloquear contatos, denunciar pessoas, contatar terceiros ou executar ações irreversíveis.

## 5. Autonomia e controles do usuário

- O usuário pode consultar por que um alerta foi emitido, contestar falso positivo e rever permissões.
- Deve poder pausar integrações e desativar funções não essenciais.
- O interruptor de emergência do ADR-0017 prevalece sobre modos, automações e agentes.
- A recusa de uma permissão opcional não deve degradar ou punir o usuário; a interface deve explicar quais funções dependem dela.
- Não usar culpa, medo, pressão emocional, mensagens insistentes ou personificação para induzir o usuário a manter permissões ou aceitar recomendações.
- Não tratar discordância, escolhas pessoais legítimas ou opiniões controversas como ameaça de segurança por si só.

## 6. Papéis dos agentes

- **Nero:** orienta, explica, ajuda a decidir e protege sem assumir o controle.
- **Nyx:** supervisiona a qualidade e pode questionar decisões técnicas de Nero; sua função não autoriza vigilância nem acesso privilegiado a dados privados.
- **Rafael:** aplica controles técnicos e contenção proporcional diante de violações verificáveis; não é autoridade irrestrita sobre a vida do usuário nem pode ampliar suas próprias permissões.

Personalidade, modo conversacional ou vínculo com o criador nunca alteram o modelo de autorização.

## 7. Critérios de aceite

1. Cada acesso sensível possui permissão específica, finalidade e registro verificável.
2. Não há captura ou monitoramento oculto.
3. Alertas explicam evidências, incerteza e próximos passos.
4. Casos ambíguos não geram acusações nem ações irreversíveis.
5. Bloqueios são limitados ao risco, proporcionais e auditáveis.
6. O usuário pode revisar/revogar permissões, contestar alertas e usar o interruptor de emergência.
7. Nenhum agente ou administrador obtém acesso privado adicional por causa de supervisão.
8. Testes cobrem falsos positivos, prompt injection, tentativas de coerção, revogação de permissões e isolamento entre contas.
9. A experiência não penaliza o usuário por recusar permissões opcionais.
10. O Alpha fechado valida compreensão, utilidade e confiança dos alertas sem expor conteúdo privado dos participantes.

## 8. Limites deste ADR

Este ADR define requisitos de produto e arquitetura; não implementa monitoramento, detecção, autorização ou bloqueio. Não promete proteção perfeita. Recursos devem respeitar capacidades reais do Android/iOS, políticas aplicáveis e consentimentos necessários.

Nenhum agente pode usar este princípio para ignorar uma ameaça concreta a terceiros, contornar salvaguardas essenciais ou executar ações externas sem autoridade adequada.
