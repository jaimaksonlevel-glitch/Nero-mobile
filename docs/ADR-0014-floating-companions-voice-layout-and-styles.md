# ADR-0014 — Companheiras Flutuantes: interação multimodal, layout compacto e estilos visuais

- **Status:** requisitos de produto aprovados para estudo e prototipagem; implementação pendente.
- **Data:** 2026-11-15.

## Contexto

A experiência flutuante deve permitir que Nero e Nyx interajam não apenas com o usuário, mas também entre si, usando voz e linguagem corporal. Ao mesmo tempo, os avatares precisam ocupar o mínimo de espaço possível e respeitar a personalização visual escolhida pelo usuário.

## Decisão de produto

### Disponibilidade e exclusividade

- Em dispositivos e sessões de usuários comuns, somente Nero pode aparecer como companheira flutuante.
- Nero e Nyx podem aparecer juntas somente no ambiente do criador autenticado, com autorização validada no backend.
- A exclusividade de Nyx vale para avatar, voz, conversas, identidade, memória e invocação direta; ocultar um botão na interface não substitui autorização no servidor.
- A presença de duas personagens não concede acesso adicional a notificações, tela, microfone ou conteúdo de outros aplicativos. Cada capacidade continua dependendo de autorização própria.

### Interação por voz e expressões

- No ambiente do criador, Nero e Nyx poderão conversar com o usuário e participar de interações entre si por voz, quando o áudio estiver habilitado.
- A conversa entre as duas deve ser acompanhada por expressões coerentes: olhar direcionado à outra personagem, sorriso, sobrancelha levantada, surpresa, dúvida, discordância, escuta e gestos discretos.
- A expressão pode antecipar ou acompanhar a fala, mas não deve simular uma fala que não começou nem indicar sucesso quando houver falha.
- As personagens devem respeitar turnos de fala. Não falar simultaneamente por padrão; usar fila/interrupção controlada e evitar sobreposição de vozes.
- O usuário controla áudio individual ou conjunto, volume, saída de áudio, legendas, modo silencioso e permissão para falas espontâneas.
- Por padrão, nenhuma fala audível espontânea deve iniciar sem uma interação ou preferência explícita do usuário. Modo silencioso mantém expressões visuais.
- Se a voz estiver indisponível, a interação deve continuar por texto e expressões, sem fingir que o áudio foi reproduzido.
- Sincronização labial deve acompanhar o áudio efetivamente reproduzido; quando não houver sincronização confiável, usar animação discreta de fala em vez de movimentos labiais incorretos.

### Layout compacto e adaptável

- Priorizar presença mínima: avatar recolhido/compacto como estado padrão, com expansão apenas após toque ou interação autorizada.
- Oferecer modos: avatar individual compacto; dupla compacta lado a lado ou em composição vertical; painel expandido temporário; e modo oculto/minimizado.
- Permitir mover, redimensionar dentro de limites seguros, recolher, ocultar temporariamente e fechar.
- A dupla deve compartilhar uma área pequena, sem duplicar controles ou criar duas janelas grandes. Uma personagem pode ficar em primeiro plano enquanto a outra aparece em miniatura expressiva, alternando conforme a conversa.
- Evitar cobrir campos de texto, botões, navegação, controles de acessibilidade e conteúdo essencial. Respeitar recortes, barras do sistema, teclado e orientação.
- Exibir controles essenciais com alvos de toque acessíveis; não reduzir os controles a ponto de ficarem difíceis de usar.
- O painel expandido deve ser temporário e fácil de dispensar. Preferências de tamanho e posição podem ser salvas por dispositivo.
- Frequência de animação e atualização visual deve ser limitada para reduzir consumo de bateria, CPU e distração.

### Personalização visual e modo anime

- O estilo do avatar flutuante deve seguir a personalização visual ativa no perfil do usuário, sem exigir configuração separada para cada tela.
- Oferecer estilos de renderização independentes da identidade: realista/humano, anime e futuros estilos que sejam suportados.
- Aplicar o estilo escolhido de forma coerente a retratos, avatar flutuante, expressões, animações e pré-visualizações.
- A mudança de estilo não deve alterar personalidade, voz, memória, capacidades, permissões ou exclusividade.
- Nero e Nyx devem continuar reconhecíveis em qualquer estilo por características próprias de rosto, cabelo, vestuário, paleta, postura e expressões; não depender apenas de cores.
- As asas delicadas permanecem um elemento complementar opcional e coerente com o estilo escolhido.
- Permitir pré-visualizar o estilo antes de aplicar e manter opção para restaurar o visual anterior.
- A personalização de Nero é controlada pelo usuário. A direção visual de Nyx continua sob autonomia de personagem já definida na ADR-0011, podendo considerar pedidos do criador sem perder sua identidade.

### Regras de interação entre as personagens

- A interação deve ter turnos claros e propósito contextual; não criar conversas intermináveis ou falas repetitivas apenas para manter animação.
- Uma personagem pode reagir silenciosamente enquanto a outra fala; a fala da segunda só ocorre quando houver motivo e turno disponível.
- Discordância deve ser representada com naturalidade e respeito, sem transformar expressões em caricatura.
- Ações e falas devem refletir o estado real do sistema: ouvindo, pensando, falando, aguardando, silenciosa, pausada ou com erro.
- O usuário pode pausar uma ou ambas as personagens imediatamente.

## Requisitos por plataforma

### Android

- A prova de conceito de overlay deve usar APIs nativas permitidas, com autorização explícita do sistema, seguindo ADR-0012.
- Avaliar a dupla em tamanhos compactos e o comportamento com teclado, notificações, chamadas, rotação, economia de bateria e diferentes fabricantes.
- Ocultar/suspender sobreposição em telas sensíveis ou protegidas.
- Não capturar toques, teclado, tela ou áudio de outros aplicativos sem autorização separada e explícita.

### iOS

- Não prometer dois avatares persistentes sobre aplicativos arbitrários. Usar apenas recursos oficialmente permitidos, como notificações, widgets, Live Activities ou extensões nos casos compatíveis.
- A experiência completa de dupla, voz e expressões permanece disponível dentro do app; alternativas de acesso rápido devem respeitar as limitações do sistema.

## Privacidade, acessibilidade e segurança

- Microfone e saída de áudio são controlados por permissões e preferências explícitas; overlay não concede permissão de microfone.
- Exibir indicador claro quando o microfone estiver ativo e oferecer interrupção imediata.
- Não iniciar escuta contínua ou gravação em segundo plano como consequência da presença flutuante.
- Oferecer legendas, controles acessíveis, redução de movimento e opção de desativar animações.
- Não exibir conteúdo privado no avatar por padrão; respeitar telas sensíveis e as regras de notificações da ADR-0010.
- Nenhuma fala ou expressão executa ações externas por si só; respostas e envios continuam sujeitos às regras de confirmação da ADR-0010.

## Critérios de aceite para protótipo

1. Em conta comum, apenas Nero é renderizada e invocável.
2. Na sessão autenticada do criador, Nero e Nyx aparecem juntas em layout compacto.
3. É possível alternar entre modo compacto, dupla compacta, painel expandido e oculto.
4. As personagens demonstram pelo menos escuta, fala, curiosidade, surpresa e discordância por expressões coerentes.
5. Uma conversa de voz respeita turnos e não sobrepõe as duas vozes por padrão.
6. Modo silencioso preserva as reações visuais e legendas opcionais.
7. O estilo selecionado no perfil — incluindo anime — é refletido no avatar flutuante e nas expressões.
8. Tamanho, posição, áudio e movimento podem ser ajustados e pausados pelo usuário.
9. Testes medem legibilidade, acessibilidade, estabilidade, CPU, memória, bateria e comportamento em telas sensíveis.
10. Limitações específicas de Android e iOS são comunicadas honestamente.

## Dependências

- ADR-0009: exclusividade de Nyx, autenticação e privacidade.
- ADR-0010: notificações, respostas e permissões.
- ADR-0011: identidade visual e personalização.
- ADR-0012: arquitetura de companheiras flutuantes e limitações de plataforma.
- ADR-0013: estados expressivos e sistema de animação.

## Escopo e estado

Esta ADR registra requisitos e critérios para desenho e prototipagem. Não significa que voz entre personagens, avatares compactos, estilo anime, sincronização labial ou overlay estejam implementados. O primeiro protótipo deve validar a experiência dentro do aplicativo antes da integração de overlay nativo.
