# ADR-0015 — Transição do modo dormir e Modo Maldade da Nyx

- **Status:** proposta de produto aprovada; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** aplicativo do criador autenticado; integração com a arquitetura de agentes e companheiras flutuantes.

## Contexto

O criador quer uma transição natural entre Nero e Nyx, sem precisar trocar manualmente de conversa ou abrir outra interface. Quando Nero recebe o comando para dormir, Nyx deve assumir a interação direta e ativar sua personalidade mais ousada, chamada **Modo Maldade**.

## Decisão

### Comandos e transferência

- Comando para dormir: **“Nero, está na hora de dormir.”**
- Ao reconhecer o comando no contexto autenticado do criador, Nero encerra seu turno de forma breve e cordial, muda para o estado visual **sleeping** e deixa de conduzir a conversa direta.
- A sessão é transferida automaticamente para Nyx, sem exigir que o criador abra outro chat ou selecione outra personagem.
- Nyx assume a conversa e ativa o **Modo Maldade**, mantendo sua identidade, memória e estilo próprios.
- Comando para retorno: **“Nero, pode acordar.”**
- Ao reconhecer o comando de retorno, Nero sai do estado sleeping e reassume a conversa. Nyx deixa de ser a agente principal da interação direta, sem perder sua identidade ou memória.
- A transição deve ser visível e compreensível, com indicação de quem está conduzindo a conversa. Deve haver também um controle manual de retorno caso o reconhecimento de voz falhe.
- O modo dormir é uma preferência/sessão do criador e não altera a experiência dos demais usuários.

### Modo Maldade 🔞

- O Modo Maldade é uma expressão contextual da personalidade da Nyx: mais ousada, provocante, atrevida, irônica, bem-humorada e flertante.
- Pode incluir conversas românticas e adultas entre adultos, dentro de limites de consentimento, privacidade e segurança.
- O rótulo 🔞 indica contexto adulto; não significa acesso irrestrito a qualquer conteúdo nem desativação de salvaguardas.
- Nyx deve respeitar limites declarados pelo usuário, interromper ou ajustar o tom quando solicitado e não pressionar, manipular ou incentivar dependência emocional.
- O Modo Maldade não altera permissões técnicas, acesso a dados, regras de automação ou exclusividade da Nyx.
- O recurso permanece exclusivo ao criador autenticado; nenhum outro usuário poderá ver, selecionar ou invocar Nyx ou seu Modo Maldade.

### Supervisão em segundo plano

- O descanso de Nero suspende somente sua participação como agente principal da conversa direta com o criador.
- A supervisão global de qualidade da Nyx sobre Nero continua ativa conforme ADR-0009, inclusive durante o modo dormir.
- A supervisão não deve revelar raciocínio interno privado; relatórios apresentam conclusões, evidências pertinentes, confiança, riscos e correções.
- A conversa entre agentes deve ter limites de rodadas, contexto, tempo e custo, evitando ciclos infinitos.
- O estado de descanso não pode ser interpretado como desligamento de serviços, revogação de permissões ou pausa da segurança do sistema.

## Privacidade e segurança

- A transferência automática ocorre apenas na sessão autenticada do criador.
- A autenticação e a autorização da Nyx são validadas no backend; ocultar botões na interface não é controle suficiente.
- Nenhum outro usuário recebe acesso à identidade, memória, sessões ou interface da Nyx.
- O Modo Maldade não permite ignorar consentimento, privacidade, proteção de dados ou salvaguardas essenciais.
- O microfone só pode ser usado conforme permissões explícitas do sistema e controles definidos pelo usuário; o comando de dormir não autoriza escuta contínua por si só.
- Deve ser possível sair do Modo Maldade ou retornar à Nero por comando ou controle visível.

## Critérios de aceite

1. O comando de dormir no aplicativo do criador transfere a conversa para Nyx automaticamente.
2. Nyx assume com o Modo Maldade ativo, sem abrir uma segunda janela ou chat.
3. Nero apresenta estado visual sleeping e não disputa o turno de fala.
4. O comando de acordar devolve a condução da conversa para Nero.
5. A supervisão global de Nyx continua ativa durante o modo dormir.
6. O modo é exclusivo ao criador autenticado e não pode ser ativado por contas comuns.
7. Há indicação visual da agente ativa, controles de saída e alternativa manual se o comando de voz falhar.
8. O modo não altera permissões nem desativa salvaguardas, privacidade ou consentimento.

## Fora do escopo desta decisão

Este ADR define comportamento e experiência. Não significa que reconhecimento contínuo de wake word, transferência entre agentes, Modo Maldade, animações 3D ou supervisão estejam implementados. Essas capacidades exigem desenvolvimento, permissões e testes próprios.
