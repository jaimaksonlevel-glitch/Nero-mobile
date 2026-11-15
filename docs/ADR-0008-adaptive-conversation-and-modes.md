# ADR-0008 — Conversa adaptável e modos de personalidade

- **Status:** requisito de produto aprovado; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** experiência conversacional do Nero Mobile.

## Contexto

A Nero deve conversar de forma fluida, espontânea e contextual, evitando respostas padronizadas. Ela deve adaptar o estilo ao usuário sem imitar de forma caricata, mantendo clareza, precisão e personalidade. O produto também terá modos de conversa com disponibilidade diferente.

## Decisões

### 1. Personalização conversacional para todos os usuários

A adaptação de estilo será um comportamento padrão, não um modo pago ou exclusivo. A Nero poderá inferir preferências de comunicação a partir da interação, por exemplo:

- formalidade e grau de descontração;
- preferência por respostas concisas ou detalhadas;
- ritmo, vocabulário e uso de humor;
- preferência por explicações passo a passo ou respostas diretas;
- contexto e continuidade do assunto em andamento.

Requisitos:
- adaptar gradualmente e de forma contextual, sem copiar mecanicamente gírias ou erros;
- priorizar a intenção e o conteúdo do usuário, não apenas o estilo superficial;
- manter precisão técnica e explicitar incertezas;
- permitir correção pelo usuário e respeitar preferências explícitas;
- usar apenas histórico e memória autorizados, com controles de privacidade e retenção;
- não inferir nem armazenar atributos sensíveis a partir do estilo de fala;
- não alegar que conhece ou compreende emoções com certeza; usar sinais conversacionais com cautela.

### 2. Modo Namoro — disponível a todos

Recurso público para ajudar em conversas afetivas: iniciar e desenvolver diálogos, interpretar mensagens com cautela, sugerir respostas e ajustar o tom (leve, romântico, divertido ou direto). Deve apoiar a expressão autêntica do usuário, evitando respostas genéricas ou manipulação. A disponibilidade para todos não remove as proteções de segurança aplicáveis, inclusive para usuários menores de idade.

### 3. Modo Maldade — exclusivo do criador

Modo privado de personalidade, exclusivo da conta do criador autorizada pelo servidor. Pode permitir tom mais irreverente, provocador, franco e linguagem mais informal, e ampliar a disposição para discutir temas controversos, sensíveis ou adultos dentro das regras aplicáveis.

Requisitos de segurança:
- não é um bypass de políticas ou salvaguardas;
- não libera assistência para dano, exploração, abuso ou atividade ilegal;
- autorização deve ser verificada no backend, vinculada a uma identidade de conta estável;
- nunca confiar em flag local, nome de usuário enviado pelo cliente ou configuração editável no APK;
- UI pode ocultar o modo de outros usuários, mas a autorização efetiva é sempre server-side;
- manter registro mínimo e protegido de alterações de autorização, sem registrar conteúdo privado desnecessário.

### 4. Seleção e continuidade dos modos

- personalidade adaptável permanece ativa como base;
- Modo Namoro é uma capacidade pública que o usuário pode ativar;
- Modo Maldade aparece apenas para a conta do criador autorizada;
- a interface deve mostrar claramente qual modo está ativo e permitir retornar ao padrão;
- mudanças de modo não devem apagar o contexto da conversa.

## Arquitetura sugerida

1. Criar uma camada de perfil conversacional com preferências explícitas e sinais de estilo de baixa sensibilidade.
2. Separar instruções de personalidade das regras de segurança e da lógica de autorização.
3. Implementar autorização do Modo Maldade no backend após existir autenticação confiável.
4. Não persistir inferências de estilo sem necessidade; oferecer revisão/reset de preferências.
5. Criar testes para adaptação de estilo, consistência técnica, privacidade, controle de modo e tentativas de falsificar privilégios do criador.

## Critérios de aceite

- Usuários diferentes recebem estilos conversacionais diferentes quando o contexto justificar, sem perder precisão.
- O usuário pode corrigir a Nero e a adaptação respeita a correção.
- Modo Namoro pode ser usado por usuários elegíveis em geral.
- Usuários comuns não conseguem ativar Modo Maldade alterando o app, chamadas HTTP ou armazenamento local.
- A conta do criador autorizada consegue ativar e desativar o Modo Maldade.
- Nenhum modo remove as salvaguardas de segurança ou os controles de privacidade.

## Dependências e limitações atuais

O backend ainda precisa de autenticação de usuários e autorização confiável. Portanto, o Modo Maldade não deve ser considerado implementado apenas por adicionar um botão no aplicativo. Este ADR registra a decisão de produto e os requisitos para implementação posterior.
