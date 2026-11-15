# ADR-0012 — Companheiras Flutuantes: avatares contextuais sobre outros aplicativos

- **Status:** proposta de produto aprovada para estudo técnico; implementação pendente.
- **Data:** 2026-11-15.

## Contexto

O usuário deseja que Nero e, no aplicativo exclusivo do criador, Nyx possam aparecer como avatares interativos enquanto outros aplicativos estão em uso. A inspiração é a representação divertida de personagens que acompanham alguém no ombro, como o anjo e o diabinho dos desenhos animados.

O objetivo é tornar as assistentes companheiras contextuais e acessíveis, sem transformar a interface em algo intrusivo ou comprometer a privacidade.

## Decisão de produto

Criar o recurso **Companheiras Flutuantes**, com disponibilidade e comportamento adaptados às APIs de cada sistema operacional.

### Experiência

1. O usuário poderá ativar ou desativar a presença flutuante e escolher quando ela aparece.
2. O avatar poderá ser arrastado, minimizado, ocultado temporariamente e fechado.
3. Toque no avatar abre controles compactos: conversar por texto/voz, ouvir uma sugestão, dispensar ou abrir a conversa completa.
4. As personagens poderão usar expressões, animações e falas curtas coerentes com suas personalidades.
5. Nero poderá aparecer para todos os usuários. Nyx só poderá aparecer no aplicativo/sessão do criador autenticado, nunca para usuários comuns.
6. No aplicativo do criador, Nero e Nyx poderão aparecer juntas ou alternar a presença, conforme preferência do criador e espaço disponível.
7. A aparição contextual poderá considerar somente eventos e conteúdo que o usuário autorizou. A presença visual não concede, por si só, acesso ao conteúdo de outros aplicativos.
8. O comportamento padrão será discreto: sem interromper digitação, cobrir controles importantes, enviar mensagens ou falar em voz alta sem autorização.
9. O usuário terá controles claros de horário, aplicativos permitidos, frequência, tamanho, posição, animações, áudio e modo silencioso.
10. O recurso poderá ser desativado globalmente ou por aplicativo, sem afetar a conversa normal dentro do Nero Mobile.

## Android

- Investigar implementação nativa com `SYSTEM_ALERT_WINDOW` / `TYPE_APPLICATION_OVERLAY`, solicitando autorização explícita por meio das configurações do sistema.
- Explicar antes da solicitação o que será exibido, quando e como desligar.
- Projetar serviço e ciclo de vida respeitando restrições atuais de execução em segundo plano, bateria, notificações e versões Android.
- Não usar overlay para enganar o usuário, capturar toques de forma oculta, sobrepor telas de autenticação, ocultar avisos do sistema ou induzir ações.
- Garantir que o avatar possa ser movido, recolhido e removido facilmente.
- Tratar aplicativos/telas sensíveis e conteúdos protegidos como contextos em que a sobreposição pode ser automaticamente ocultada ou suspensa.
- Validar compatibilidade em aparelhos reais, diferentes versões Android e fabricantes.

## iOS

- Não prometer overlay arbitrário persistente sobre todos os aplicativos: o iOS não oferece a aplicativos comuns uma API geral equivalente ao overlay Android.
- Avaliar alternativas oficiais compatíveis, como notificações, widgets, Live Activities, extensões e Picture in Picture apenas nos casos de uso permitidos pela plataforma.
- Manter a experiência completa de avatar dentro do próprio aplicativo e oferecer acesso rápido por recursos do sistema quando disponíveis.
- Comunicar claramente diferenças entre plataformas, sem simular capacidade inexistente.

## Privacidade e segurança

- O overlay não implica gravação de tela, leitura universal de conteúdo, captura de teclado ou bypass de proteções de outros aplicativos.
- Qualquer acesso a notificações, mensagens ou conteúdo permanece sujeito às permissões separadas, consentimento granular e limitações de cada plataforma (ver ADR-0010).
- Indicador visual persistente quando a companheira estiver ativa; controles de pausa e encerramento acessíveis.
- Não exibir conteúdo privado em locais/telas onde possa ser visto por terceiros sem escolha consciente do usuário.
- Nunca mostrar mensagens, nomes, contatos, códigos ou dados sensíveis no avatar por padrão.
- O usuário define aplicativos permitidos e pode revogar a autorização a qualquer momento.
- A sobreposição deve respeitar janelas de segurança, telas bancárias, autenticação, permissões e conteúdo protegido.
- Nenhuma ação externa (como responder ou enviar mensagem) é executada apenas porque o avatar apareceu; seguem valendo as regras de confirmação e automação da ADR-0010.

## Critérios de aceite

- No Android compatível, usuário concede a permissão do sistema conscientemente e consegue exibir, mover, recolher, pausar e fechar o avatar.
- O avatar não bloqueia controles essenciais nem se sobrepõe a telas sensíveis.
- O usuário consegue limitar a aparição a aplicativos e horários selecionados.
- Nero está disponível a todos os usuários; Nyx permanece exclusiva do criador autenticado, também na camada flutuante.
- O recurso não lê nem captura conteúdo de outros aplicativos sem autorização independente.
- No iOS, a interface oferece somente alternativas permitidas e descreve honestamente as limitações.
- Desempenho, consumo de bateria, acessibilidade e estabilidade são validados em dispositivos reais antes de lançamento.

## Dependências

- ADR-0009: identidade e supervisão da Nyx, exclusividade do criador e privacidade.
- ADR-0010: notificações, permissões e respostas em aplicativos externos.
- ADR-0011: aparência visual personalizável da Nero e autonomia visual da Nyx.

## Escopo e estado

Esta ADR define a proposta de produto e os requisitos de estudo. Não significa que overlay, serviço Android, integração iOS, avatares animados ou acesso contextual estejam implementados. É necessário realizar uma prova técnica nativa, especialmente no Android, antes de estimar entrega.
