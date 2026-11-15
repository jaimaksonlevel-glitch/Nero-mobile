# ADR-0017 — Desativação de emergência e interruptor geral dos agentes

- **Status:** proposta de segurança aprovada; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** aplicativo, backend, agentes, sessões, ferramentas, áudio, notificações, automações e avatares.

## Contexto

O usuário precisa manter controle efetivo sobre os agentes, inclusive quando houver comportamento inesperado, suspeita de comprometimento, erro de automação ou falha de segurança. A capacidade de interromper os agentes não pode depender da cooperação da própria Nero ou Nyx, nem de o backend estar disponível.

## Decisão

### 1. Interruptor geral sob controle do usuário

- Deve existir um controle de fácil acesso, claramente identificado como **“Desativar agentes”** ou **“Parada de emergência”**.
- O controle deve estar disponível nas configurações de segurança e em um acesso rápido persistente na experiência do aplicativo.
- No aplicativo do criador, o interruptor geral desativa Nero e Nyx simultaneamente.
- O criador também pode desativar Nero ou Nyx individualmente.
- Nos aplicativos de usuários comuns, o usuário pode desativar Nero e todos os recursos de agente associados à sua conta.
- O controle não pode depender de comandos de voz, reconhecimento da personalidade, aprovação do agente ou resposta do backend para interromper imediatamente os recursos locais.
- A ação de emergência deve ser deliberada para evitar toque acidental, mas rápida e simples. A interface pode usar confirmação curta ou gesto de pressionar e segurar, sem criar obstáculos em uma emergência.

### 2. Efeito imediato da desativação

Ao desativar um agente, o sistema deve, na medida tecnicamente possível:

1. Impedir novas solicitações e novas ações iniciadas pelo agente.
2. Cancelar tarefas, execuções, ciclos de supervisão e chamadas de ferramentas em andamento.
3. Interromper geração e reprodução de voz; parar captura de áudio iniciada pelo aplicativo.
4. Fechar ou ocultar avatares, overlays e animações; impedir que reapareçam automaticamente.
5. Pausar respostas a notificações, envio de mensagens e automações.
6. Bloquear novas chamadas autenticadas do agente no backend.
7. Invalidar ou revogar tokens e sessões específicos do agente quando aplicável.
8. Registrar o evento de desativação sem armazenar conteúdo pessoal desnecessário.
9. Exibir confirmação objetiva de quais componentes foram interrompidos e indicar qualquer tarefa que não pôde ser cancelada imediatamente.

A desativação deve ser fail-closed: se o sistema não conseguir confirmar autorização válida ou estado ativo, não deve permitir que o agente inicie uma nova ação externa.

### 3. Camadas local e servidor

- **Interruptor local:** persiste no dispositivo e interrompe imediatamente interface, áudio, overlays, tarefas locais e chamadas que ainda não foram enviadas.
- **Interruptor no backend:** mantém estado de agente desativado por conta/agente, rejeita novas solicitações, cancela trabalhos canceláveis e invalida sessões/credenciais associadas.
- **Sincronização:** quando a conexão voltar, o estado de desativação local deve ser sincronizado com o backend. A ausência de rede nunca pode reativar o agente.
- **Defesa em profundidade:** cada serviço e ferramenta deve verificar autorização e estado ativo no momento da execução; esconder botões ou encerrar a interface não é suficiente.
- **Falha de infraestrutura:** se o backend estiver indisponível, o controle local ainda deve desativar os recursos locais e bloquear novas chamadas. A interface deve informar que a revogação remota será confirmada quando houver conexão.
- Nenhum agente pode ignorar, atrasar, reverter ou modificar o estado de desativação.

### 4. Reativação separada e explícita

- Desativar não é o mesmo que excluir: memórias, configurações e histórico não devem ser apagados automaticamente.
- A reativação exige ação explícita do usuário autenticado; não pode ocorrer por conversa, modo dormir, Modo Maldade, atualização do app, reinício do dispositivo ou decisão de outro agente.
- A reativação deve mostrar quais permissões e integrações continuam concedidas e permitir revisão antes de retomar ações externas.
- Se a desativação ocorreu por incidente de segurança, a reativação pode exigir autenticação reforçada e revisão dos registros do incidente.
- A reativação de um agente não reativa automaticamente o outro nem restaura permissões que foram revogadas.

### 5. Separação entre parar agentes e revogar permissões

- O usuário pode desativar os agentes sem precisar revogar manualmente cada permissão do sistema operacional; a desativação bloqueia o uso dessas capacidades pelo produto.
- O usuário também pode revogar permissões específicas, como notificações, microfone, câmera, localização e integrações, sem desativar todos os demais recursos.
- A desativação geral prevalece sobre qualquer modo, preset, automação ou autorização anterior.
- Regras de envio automático e tarefas agendadas devem ser suspensas junto com o agente responsável.
- A desativação não pode impedir o usuário de acessar o sistema operacional ou as configurações para revogar permissões diretamente.

### 6. Proteção contra abuso e comprometimento

- Somente o titular autenticado da conta pode reativar seus agentes; Nyx permanece exclusiva ao criador autenticado.
- Agentes não podem desativar o interruptor, ocultá-lo, alterar sua posição para impedir acesso ou exigir justificativa do usuário.
- Mudanças no estado de ativação devem ser auditadas com data/hora, origem, agente e resultado, minimizando dados pessoais.
- Tentativas repetidas de reativação não autorizada devem ser bloqueadas e sinalizadas.
- O estado de emergência deve ser protegido contra alterações feitas por prompts, mensagens recebidas, documentos, notificações ou instruções de outros agentes.

### 7. Limites honestos

- Nenhum aplicativo consegue garantir controle absoluto se o próprio sistema operacional, dispositivo, conta ou backend estiver comprometido.
- O produto deve reduzir riscos por isolamento, autenticação, autorização no servidor, revogação de sessão, armazenamento seguro, auditoria e testes de segurança.
- O aplicativo deve explicar quando a interrupção local foi concluída, quando a revogação remota ainda aguarda conexão e quais componentes dependem de controles do Android/iOS.
- Não afirmar que uma tarefa externa foi cancelada se ela já tiver sido aceita por um serviço de terceiros e não houver confirmação de cancelamento.

## Critérios de aceite

1. O usuário encontra o interruptor de emergência em no máximo dois passos a partir da tela principal.
2. O interruptor local funciona sem internet e não depende de resposta de Nero ou Nyx.
3. A desativação do criador interrompe Nero e Nyx; também há controles individuais.
4. Usuários comuns conseguem desativar Nero em sua própria conta.
5. Nenhum agente consegue reativar a si próprio ou ao outro.
6. O backend rejeita novas solicitações e ações para agentes desativados, mesmo que o cliente tente contornar a interface.
7. Voz, microfone, overlays, notificações, respostas e automações são interrompidos ou bloqueados conforme os limites de cada plataforma.
8. A desativação persiste após reinício do app/dispositivo e sincroniza com o backend quando a rede retornar.
9. Reativação exige ação explícita e autenticação válida, sem restaurar permissões revogadas.
10. Testes cobrem perda de rede, backend indisponível, sessão expirada, execução concorrente, tentativas de reativação não autorizada e falhas de cancelamento.

## Relação com outras decisões

- **ADR-0009:** agentes, supervisão e identidade.
- **ADR-0010:** notificações, respostas e permissões.
- **ADR-0012 a ADR-0014:** overlays, avatares, voz e animações.
- **ADR-0015:** modo dormir e Modo Maldade.
- **ADR-0016:** limites de autonomia e separação entre expressão e permissões.

## Fora do escopo / estado de implementação

Este ADR define requisitos. O interruptor de emergência, revogação de sessões, cancelamento distribuído, sincronização de estado e testes de segurança ainda não estão implementados. A eficácia real depende de implementação no cliente, backend, integrações e testes em dispositivos e serviços suportados.
