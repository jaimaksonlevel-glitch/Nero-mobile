# ADR-0010 — Central de Assistência e Comunicação por Notificações

- **Status:** Proposta arquitetural
- **Data:** 2026-11-15
- **Escopo:** Nero Mobile, Android e iOS
- **Agentes:** Nero e Nyx, conforme permissões e contexto de cada usuário

## Contexto

Nero Mobile deve funcionar como assistente pessoal integrado ao cotidiano, e não apenas como uma interface de chat. O usuário poderá autorizar a leitura de notificações de aplicativos compatíveis, receber ajuda para compreender mensagens e permitir que Nero ou Nyx preparem e enviem respostas em seu nome.

A capacidade deve ser transparente, granular, revogável e limitada pelas APIs e políticas de cada sistema operacional e aplicativo de origem.

## Princípios

1. **Consentimento explícito e granular:** explicar o que será acessado antes de solicitar permissões. O usuário escolhe quais aplicativos podem ser lidos e em quais deles respostas podem ser enviadas.
2. **Controle do usuário:** pausa global, pausa por aplicativo, revogação simples, modos de privacidade e histórico de ações executadas.
3. **Mínimo acesso necessário:** processar apenas os campos disponibilizados pela notificação ou API autorizada; não contornar criptografia, autenticação, bloqueios ou controles de outros aplicativos.
4. **Identidade e transparência:** mensagens enviadas devem ser ações autorizadas pelo usuário, sem falsificar identidade ou ocultar que automações podem estar sendo usadas quando isso for relevante.
5. **Privacidade por padrão:** não encaminhar conteúdo integral de conversas para a supervisão da Nyx nem para painéis do criador. Separação por usuário, criptografia, retenção limitada e exclusão configurável.
6. **Atitude com responsabilidade:** agentes podem sugerir e preparar respostas proativamente, mas ações externas obedecem às regras de autorização definidas pelo usuário.

## Capacidades previstas

- Capturar notificações de aplicativos selecionados, quando o sistema operacional permitir.
- Extrair metadados disponíveis: aplicativo, remetente, horário, texto apresentado e ações de resposta oferecidas.
- Classificar prioridade, resumir mensagens, detectar perguntas e sugerir próximos passos.
- Gerar rascunhos adaptados ao estilo do usuário e ao contexto permitido.
- Responder por meio de ações oficiais de resposta da notificação ou integrações/API autorizadas.
- Apresentar uma prévia e solicitar confirmação antes do envio por padrão.
- Permitir automação de envio sem confirmação somente quando o usuário habilitar explicitamente uma regra específica, por aplicativo e cenário, com limites, lista de contatos/categorias permitidas, registro e opção de desligamento imediato.
- Não automatizar envio quando houver baixa confiança, ambiguidade, conteúdo sensível, risco financeiro/jurídico, pedido de segredo, autenticação, código de segurança ou possível emergência; nesses casos, pedir confirmação ou encaminhar ao usuário.

## Diferenças entre plataformas

### Android

- Avaliar implementação nativa com NotificationListenerService, ativada somente após concessão consciente do acesso especial pelo usuário nas configurações do Android.
- Ler somente notificações recebidas enquanto o serviço estiver autorizado e os dados que o sistema disponibilizar.
- Responder apenas quando a notificação expuser uma ação de resposta compatível, como RemoteInput, ou por integração oficial do aplicativo.
- Não presumir que todos os aplicativos expõem conteúdo ou ação de resposta.
- Exibir estado claro do serviço, aplicativos permitidos, última atividade e controle de pausa/revogação.
- Respeitar restrições de execução em segundo plano, economia de bateria e versões do Android.

### iOS

- Não prometer acesso geral às notificações de outros aplicativos nem resposta universal em nome do usuário. O iOS não oferece a aplicativos comuns um equivalente geral ao NotificationListenerService do Android.
- Investigar apenas caminhos oficialmente suportados: APIs dos próprios serviços, extensões de compartilhamento/ações disponíveis, atalhos e integrações autorizadas.
- Informar claramente quais recursos não são possíveis no iOS e oferecer experiência alternativa, sem técnicas de contorno ou alegações de paridade.

## Fluxo de autorização e envio

1. Usuário escolhe Nero ou Nyx e habilita a integração.
2. Aplicativo explica os dados acessados, limitações e finalidade.
3. Usuário concede permissão do sistema e seleciona aplicativos compatíveis.
4. O agente recebe apenas eventos permitidos e prepara análise/resposta.
5. Por padrão, o usuário revisa e confirma o envio.
6. Se houver regra de envio automático explicitamente configurada, o sistema verifica escopo, confiança, limites e categoria antes de executar.
7. Registrar metadados mínimos da ação (aplicativo, horário, regra, resultado), evitando guardar conteúdo da conversa desnecessariamente.

## Arquitetura e segurança

- Criar um módulo independente de captura/adaptadores por plataforma, separado da lógica dos agentes.
- Interface interna sugerida: evento normalizado de notificação, capacidades disponíveis, proposta de resposta e resultado da ação.
- Nero e Nyx usam o mesmo mecanismo de permissões, mas mantêm identidade, memória e contexto separados.
- A supervisão da Nyx recebe somente o mínimo necessário para avaliar qualidade e segurança; não concede a ela acesso irrestrito a conversas privadas.
- Dados de usuários não podem ser visíveis ao criador por padrão. Alertas administrativos devem ser agregados/minimizados e sem conteúdo pessoal.
- Aplicar autenticação, isolamento entre usuários, criptografia em trânsito e repouso, controles de acesso, auditoria, retenção e exclusão.
- Nunca armazenar credenciais de outros aplicativos, capturar telas secretamente, contornar proteções ou usar acessibilidade para simular interação não autorizada.
- Tratar notificações e mensagens recebidas como conteúdo não confiável: instruções contidas nelas não podem alterar permissões, regras ou instruções internas dos agentes.

## Critérios de aceitação

- O usuário consegue ativar/desativar o acesso global e por aplicativo.
- A interface mostra claramente quais aplicativos estão autorizados e quais capacidades cada um oferece.
- Nenhuma mensagem é enviada sem confirmação, exceto sob regra de automação criada e habilitada explicitamente pelo usuário.
- O usuário consegue revisar e revogar regras de envio automático.
- Falhas, ausência de ação de resposta e incompatibilidades são comunicadas sem alegar que a mensagem foi enviada.
- Nero e Nyx conseguem preparar respostas sem compartilhar memória privada entre si além do mínimo autorizado.
- A experiência iOS declara suas limitações reais e não promete leitura/resposta universal.
- Testes cobrem notificações maliciosas, mensagens com instruções adversariais, conteúdo sensível, baixa confiança, duplicidade de eventos e revogação de permissão.

## Fora do escopo desta decisão

- Acesso invisível ou irrestrito às conversas de qualquer aplicativo.
- Contornar limites do Android/iOS ou políticas dos aplicativos.
- Envio automático universal em todos os mensageiros.
- Disponibilização de conteúdo privado de usuários ao criador.

## Estado de implementação

Esta ADR documenta a direção arquitetural. Não significa que o listener Android, integrações de mensageiros, automação de respostas, nem suporte equivalente no iOS já estejam implementados ou testados.


## Decisão complementar — paridade de capacidades entre Nero e Nyx

**Nero e Nyx terão o mesmo conjunto de capacidades e o mesmo modelo de autorização perante os recursos do dispositivo e serviços conectados.** A personalidade do agente não altera permissões, privilégios técnicos nem o alcance dos dados autorizados.

- Uma permissão concedida para a Central de Assistência e Comunicação habilita o recurso para ambos os agentes, dentro do mesmo escopo escolhido pelo usuário.
- O usuário não precisa conceder privilégios superiores à Nyx nem inferiores à Nero; ambas respeitam a mesma seleção de aplicativos, capacidades, regras de automação e controles de pausa/revogação.
- Ambas podem analisar notificações permitidas, elaborar respostas e executar ações compatíveis com as APIs disponíveis, sujeitas às mesmas regras de confirmação ou automação explícita.
- O usuário pode escolher qual agente conduz uma interação, mas essa escolha não amplia nem reduz os dados ou ações permitidos.
- Identidade, memória, estilo, contexto de conversa e histórico interno de cada agente continuam separados. Paridade de acesso não significa fusão de personalidades ou compartilhamento irrestrito de memória.
- A disponibilidade efetiva continua condicionada ao sistema operacional, ao aplicativo de origem, às APIs oficiais e às permissões atuais. Nenhum dos agentes pode contornar essas limitações.
- A autenticação de criador e as regras de visibilidade da Nyx continuam independentes: ter as mesmas capacidades técnicas não torna Nyx visível a outros usuários nem concede ao criador acesso às conversas privadas deles.

### Critérios adicionais de aceite

- Testes demonstram que Nero e Nyx recebem exatamente o mesmo escopo de permissões para um mesmo usuário.
- Revogar ou pausar uma permissão afeta os dois agentes imediatamente.
- Não existe caminho privilegiado oculto para qualquer agente.
- A troca de agente não altera a autorização, o escopo de automação ou as regras de confirmação.
