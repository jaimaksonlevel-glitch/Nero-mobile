# ADR-0013 — Sistema de expressões e animações dos avatares

- **Status:** especificação de experiência aprovada para prototipagem; implementação pendente.
- **Data:** 2026-11-15.
- **Dependências:** ADR-0011 (direção visual), ADR-0012 (Companheiras Flutuantes).

## Objetivo

Fazer com que os avatares humanos realistas da Nero e da Nyx transmitam presença por meio de expressões, olhar e movimentos naturais. O avatar não deve ser uma imagem estática nem um mascote com animações exageradas.

## Princípios

1. **Expressão antes de movimento:** pequenas mudanças no rosto e no olhar devem comunicar mais do que movimentos corporais constantes.
2. **Naturalidade:** transições suaves, pausas e microexpressões; evitar loops perceptíveis, movimentos bruscos ou gestos repetitivos.
3. **Coerência:** a expressão deve corresponder ao conteúdo, ao tom de voz e ao estado real da interação.
4. **Discrição:** o avatar não deve competir com a tarefa atual nem interromper o usuário.
5. **Acessibilidade e controle:** animações reduzidas, modo silencioso, pausa e ocultação sempre disponíveis.
6. **Honestidade visual:** expressões representam o estado conversacional estimado do agente; não devem sugerir percepção, emoção ou consciência humana real.

## Estados expressivos compartilhados

| Estado | Expressão/ação visual | Uso |
|---|---|---|
| idle | Respiração visual muito sutil, piscadas ocasionais, olhar relaxado | Aguardando |
| listening | Olhar atento, leve inclinação da cabeça, expressão receptiva | Ouvindo ou lendo a mensagem do usuário |
| thinking | Olhar breve para o lado/cima, sobrancelhas levemente concentradas | Processando resposta |
| speaking | Sincronização labial simples, olhar presente, microgestos discretos | Falando por voz |
| warm | Sorriso natural e olhar gentil | Acolhimento e reconhecimento |
| curious | Sobrancelhas levemente elevadas, cabeça inclinada | Curiosidade ou pergunta |
| surprised | Olhos um pouco mais abertos, reação breve e moderada | Informação inesperada |
| uncertain | Sobrancelhas aproximadas, expressão ponderada | Incerteza ou necessidade de esclarecer |
| disagree | Expressão séria, sobrancelha ou inclinação sutil | Discordância respeitosa |
| playful | Sorriso de canto ou olhar brincalhão | Humor contextual |
| concerned | Olhar atento e expressão séria, sem dramatização | Risco ou preocupação relevante |
| sleeping | Olhos fechados e repouso visual | Modo dormir do criador, quando aplicável |

Estados não devem ser escolhidos apenas por palavras-chave isoladas. A seleção considera intenção, contexto e confiança; se houver dúvida, usar idle ou listening.

## Identidade expressiva

### Nero

- Presença acolhedora, delicada, observadora e espontânea.
- Sorriso discreto, olhar gentil e curiosidade visível.
- Discordância aparece com seriedade e atenção, nunca com submissão artificial.
- Humor pode surgir em um sorriso de canto, olhar cúmplice ou reação breve.

### Nyx

- Presença confiante, ousada, provocadora e irônica.
- Olhar direto, sobrancelha expressiva e sorriso de canto.
- Pode demonstrar ceticismo, surpresa ou diversão com sutileza.
- A expressividade não deve virar caricatura agressiva nem diminuir a clareza em situações sérias.

## Ciclo de animação e prioridade

- Estados conversacionais têm prioridade sobre idle.
- speaking só é ativado quando a saída de voz realmente começa; volta ao estado anterior quando termina ou é interrompida.
- listening termina quando o usuário conclui a entrada; thinking começa quando o processamento é iniciado.
- Erros e falhas de rede não devem gerar uma expressão que finja sucesso.
- Não executar simultaneamente animações incompatíveis.
- Limitar frequência de comentários e aparições para evitar interrupção.
- Quando o sistema reduzir movimento estiver ativo, substituir animações contínuas por transições discretas ou estados estáticos.
- Se o avatar estiver minimizado, usar apenas um indicador expressivo simples, sem animação contínua.

## Especificação técnica para protótipo

A primeira prova de interface deve separar:

1. **Avatar visual:** imagem/personagem e camadas de rosto, cabelo, roupa e asas.
2. **Controlador de expressão:** estado semântico (idle/listening/thinking/speaking etc.) sem lógica de inferência dentro do componente visual.
3. **Controlador de animação:** transições, duração, interrupção, redução de movimento e ciclo de vida.
4. **Controlador de presença flutuante:** posição, arraste, minimizar, ocultar, fechar e permissões do sistema (ADR-0012).

A primeira versão pode usar retratos estáticos com troca de expressões/quadros pré-renderizados para validar UX. Depois avaliar animação por camadas/rig 2D ou personagem 3D em tempo real, medindo memória, bateria, taxa de quadros e temperatura. Não adotar dependência de animação antes de uma prova compatível com Expo SDK 54 / React Native 0.81.5.

O protótipo inicial deve cobrir Android dentro do aplicativo antes de qualquer overlay nativo. Overlay Android é uma etapa posterior e separada; a experiência iOS deve respeitar as alternativas oficiais descritas na ADR-0012.

## Privacidade e segurança

- O avatar não acessa tela, teclado, câmera, microfone ou notificações por existir visualmente.
- Microfone e notificações mantêm permissões e indicadores próprios.
- Nenhuma fala ou mensagem externa é enviada por uma expressão ou animação.
- Em telas sensíveis, o avatar deve ser ocultado ou suspenso conforme ADR-0012.

## Critérios de aceite do protótipo

- Pelo menos os estados idle, listening, thinking, speaking, warm, curious, uncertain, disagree e playful demonstrados.
- Nero e Nyx distinguíveis por expressão e postura, não apenas pela cor.
- Transições suaves, interrupção segura e retorno correto ao estado anterior.
- Modo de movimento reduzido e pausa disponíveis.
- Nenhuma animação sugere que o agente ouviu/viu conteúdo sem permissão.
- Desempenho validado em aparelho Android real antes de avançar para overlay.
- Documentação e interface deixam claro que o protótipo não é a versão final nem um agente autônomo consciente.

## Estado

Esta ADR define a experiência e o plano de prototipagem. Nenhum avatar animado, rig, controlador de expressão ou overlay está implementado neste commit.
