# ADR-0009 — Nyx como supervisora central da Nero

- **Status:** proposta aprovada para arquitetura; implementação pendente.
- **Escopo:** plataforma Nero Mobile, com experiência distinta para o aplicativo do criador e para os aplicativos dos usuários.

## Contexto e decisão

Nyx será uma agente de IA independente que atua como supervisora de qualidade da Nero em toda a plataforma. Ela não será exibida como personagem nos aplicativos dos usuários finais. No aplicativo autenticado do criador, Nyx ficará visível e poderá conversar diretamente com o criador, apresentar análises e explicar suas avaliações.

A Nero continuará sendo a única assistente/personagem apresentada aos usuários finais. A supervisão da Nyx ocorrerá no backend, sem revelar sua identidade ou interface aos usuários.

Nero e Nyx terão instruções, versões, contexto de execução e memórias separados. Compartilhamento entre agentes será explícito, mínimo e controlado por políticas. Nyx não é proprietária da Nero; atua como supervisora independente.

## Fluxo de supervisão

1. O usuário envia uma mensagem à Nero.
2. O orquestrador prepara o contexto mínimo necessário para a tarefa.
3. Nero elabora uma resposta candidata.
4. Nyx avalia a resposta e, quando necessário, os trechos relevantes do contexto, verificando:
   - aderência à solicitação;
   - consistência factual e qualidade das fontes;
   - cálculos, premissas e passos críticos quando aplicável;
   - contradições, omissões e riscos;
   - tom, clareza e utilidade.
5. Se a avaliação indicar problema material, Nyx devolve feedback estruturado à Nero.
6. Nero pode corrigir a resposta e submetê-la a uma nova verificação, com limite de tentativas para evitar ciclos.
7. A resposta final é entregue ao usuário. Quando houver incerteza relevante, a Nero deve comunicá-la em vez de afirmar certeza.

A revisão pode ser adaptativa: tarefas de maior risco recebem verificação mais rigorosa; respostas simples podem usar verificações leves para controlar latência e custo. Nyx não deve bloquear ou reescrever respostas apenas por divergência estilística.

## Detecção e notificação ao criador

Nyx deve classificar achados por severidade e confiança, por exemplo:
- **Crítico:** possível risco de segurança, privacidade ou orientação materialmente perigosa.
- **Alto:** erro factual ou técnico relevante, cálculo inconsistente ou instrução potencialmente danosa.
- **Moderado:** omissão importante, resposta incompleta ou contradição.
- **Baixo:** oportunidade de melhoria de clareza, tom ou experiência.

Notificações ao criador:
- alertas imediatos para incidentes críticos e erros de alta confiança;
- resumo agregado para padrões recorrentes e achados moderados/baixos;
- deduplicação, limites de frequência e trilha de auditoria para evitar spam;
- painel privado com categoria, severidade, confiança, versão do modelo/agente, estado da revisão e correção aplicada.

### Privacidade dos usuários finais — requisito obrigatório

A supervisão não autoriza vigilância irrestrita nem divulgação de conversas privadas ao criador.

- O usuário deve ser informado, de forma clara na política/experiência do produto, de que respostas podem passar por revisão automatizada de qualidade e segurança.
- O alerta ao criador deve usar dados minimizados e, por padrão, agregados ou desidentificados: tipo de falha, severidade, confiança, módulo e versão.
- Não enviar ao criador texto integral de mensagens, nomes, contatos, arquivos, imagens, documentos, localização ou outros identificadores de usuários.
- Trechos de conversa só poderão ser disponibilizados em fluxo separado, com base legal adequada, transparência e consentimento/controle apropriado do usuário, além de acesso restrito e retenção limitada. Não usar consentimento genérico como justificativa para expor conversas.
- Isolar dados por usuário/tenant; impedir que uma sessão ou memória seja consultada por outra.
- Definir retenção, exclusão, criptografia, controle de acesso e logs de auditoria.
- Incidentes que indiquem risco imediato devem seguir procedimento de segurança e privacidade, sem transformar o criador em destinatário automático de conteúdo privado.

## Experiência por aplicativo

### Aplicativo do criador
- Nero e Nyx visíveis na mesma sala de conversa.
- Nyx pode apresentar análises, críticas e feedback sobre respostas da Nero.
- Painel de supervisão com alertas, tendências e histórico de correções.
- Modo dormir: Nero suspende atendimento e Nyx assume a conversa. A suspensão não desliga a supervisão global da plataforma.
- Acesso à Nyx validado no servidor por identidade/conta de criador autorizada; nunca depender apenas de esconder controles no APK.

### Aplicativos dos usuários
- Apenas Nero aparece na interface.
- Nyx atua silenciosamente no backend como supervisora.
- Nenhum endpoint, prompt, memória ou credencial exclusiva da Nyx fica acessível ao cliente.
- A supervisão não deve degradar a experiência; aplicar limites de latência, custo, tentativas e fallback seguro.

## Independência e memória

- Memória de Nero e memória de Nyx separadas por agente e por escopo.
- Nyx mantém registros de auditoria sobre avaliações e correções, não cópias indiscriminadas das conversas.
- O feedback interno deve ser estruturado, fundamentado e rastreável.
- Nero pode discordar do feedback se apresentar justificativa verificável; divergências relevantes podem ser registradas para revisão.
- Nenhum agente deve alegar consciência, sentimentos ou autonomia humana.

## Segurança e governança

- Políticas de segurança, privacidade e uso responsável continuam válidas para ambas as agentes.
- Nyx pode discutir assuntos controversos com maior amplitude de estilo e escopo, mas não pode desativar salvaguardas essenciais.
- O criador não recebe acesso irrestrito a dados de usuários por ser proprietário do produto.
- Segredos, chaves de API e permissões são mantidos no backend; nunca embutidos no APK.
- Versionar prompts, políticas, classificadores, avaliações e decisões de supervisão.

## Critérios de aceite antes da produção

1. Testes confirmam que usuários finais só veem Nero.
2. Nyx não pode ser invocada por usuários finais nem por alteração do cliente.
3. Testes de isolamento confirmam separação de sessões, tenants e memórias.
4. Benchmarks medem precisão, falsos positivos/falsos negativos, latência e custo da supervisão.
5. Alertas são testados com dados sintéticos e não incluem conteúdo privado ou identificadores.
6. Existe política de transparência, retenção e resposta a incidentes.
7. Existe fallback documentado quando Nyx estiver indisponível: a Nero responde com limites apropriados, sem alegar que houve revisão.
8. O criador pode consultar a justificativa e o estado de cada alerta sem acessar conversas privadas por padrão.

## Estado de implementação

Este ADR registra a decisão de produto e arquitetura. Não significa que a supervisão, notificações, painel, isolamento ou modo dormir já estejam implementados. Cada componente deverá ser desenvolvido, testado e revisado antes de ser anunciado como disponível.
