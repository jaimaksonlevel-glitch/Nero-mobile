# ADR-0034 — Evolução multiplataforma e capacidades progressivas dos dispositivos

- **Status:** Direção de produto aprovada; implementação pendente.
- **Data:** 2026-11-15
- **Branch:** `feature/ai-foundation`

## Contexto

O criador definiu que a prioridade de desenvolvimento não é construir imediatamente um dispositivo físico dedicado. A prioridade é tornar Nero (e, no ambiente exclusivo do criador, Nyx) uma assistente útil e consistente nos dispositivos que as pessoas já possuem: celulares, tablets e computadores.

A presença física dedicada — Nero Box e Nero Robot, descrita no ADR-0033 — permanece como evolução futura. O projeto deve, desde o início, evitar uma arquitetura limitada a um único formato de hardware.

O princípio de produto é:

**Nero e Nyx evoluem como personalidades e também evoluem junto com os dispositivos nos quais estão presentes.**

Isso significa que a experiência pode ganhar novas capacidades conforme os dispositivos, sistemas operacionais, periféricos e integrações evoluem. A personalidade, a identidade e a continuidade da assistente devem permanecer coerentes; as capacidades disponíveis variam conforme o dispositivo, as APIs oficiais, as permissões e a autorização do usuário.

## Decisão

### 1. Prioridade de desenvolvimento

Ordem de prioridade:

1. **Celulares:** experiência inicial principal, com conversa, voz, câmera, arquivos, notificações e integrações autorizadas, respeitando as capacidades reais de Android e iOS.
2. **Tablets:** experiência adaptada a telas maiores, documentos, diagramas, imagens, ferramentas de trabalho e multitarefa.
3. **Computadores:** experiência de produtividade e trabalho com arquivos, aplicações e fluxos mais complexos, por integrações oficiais e permissões explícitas.
4. **Dispositivos físicos dedicados:** Nero Box e, posteriormente, Nero Robot, como expansão futura, não como bloqueio para a evolução do software.

A ordem não significa que todos os recursos estarão disponíveis simultaneamente em todos os sistemas. A implementação deve ser incremental, baseada em compatibilidade e testes reais.

### 2. Identidade consistente, experiência adaptativa

- Nero mantém identidade, princípios e continuidade entre dispositivos autorizados.
- Nyx permanece exclusiva do criador autenticado; a expansão multiplataforma não altera essa exclusividade.
- Rafael mantém sua função técnica de proteção e não se torna uma personalidade acessível aos demais usuários.
- A interface adapta-se ao formato: celular prioriza interação rápida; tablet favorece visualização e trabalho com documentos; computador favorece tarefas longas, múltiplas janelas e ferramentas de produtividade.
- Voz, texto, expressões visuais e comandos podem variar conforme o dispositivo, sem transformar a assistente em personalidades contraditórias.
- Preferências e memória individual podem acompanhar o usuário entre dispositivos autenticados, com isolamento por conta, transparência, controles de sincronização e exclusão.
- O contexto necessário a uma tarefa pode continuar entre dispositivos apenas dentro da mesma conta e sessão autorizada; não há compartilhamento entre usuários.

### 3. Capacidades progressivas por dispositivo

Cada recurso deve ter uma matriz de compatibilidade que indique:

- plataforma e versão mínima suportada;
- API oficial utilizada;
- permissão necessária e finalidade;
- disponibilidade em primeiro plano, segundo plano ou com tela bloqueada;
- limitações conhecidas;
- comportamento offline;
- método de desativação e revogação;
- testes realizados e dispositivos efetivamente validados.

Não prometer paridade artificial entre Android, iOS, Windows, macOS ou Linux. Se um sistema não oferecer uma API equivalente, apresentar alternativa segura ou declarar a limitação.

### 4. Periféricos e integrações

A arquitetura poderá evoluir para aproveitar periféricos e recursos existentes, por exemplo:

- microfones, alto-falantes, fones e dispositivos Bluetooth;
- câmeras e sensores disponíveis por APIs autorizadas;
- teclado, mouse, telas externas e comandos de acessibilidade permitidos;
- armazenamento local e serviços de arquivos;
- notificações e ações de resposta expostas pelos sistemas;
- integrações com aplicativos e serviços por APIs oficiais;
- recursos de áudio e vídeo em chamadas, quando suportados e autorizados.

A existência de um periférico não concede permissão automática. Acesso deve ser específico, transparente, revogável e limitado à finalidade solicitada.

### 5. Arquitetura comum e módulos específicos

- Manter um núcleo de serviços e identidade independente do formato de tela.
- Isolar adaptadores de plataforma para Android, iOS, Windows, macOS e Linux.
- Separar interface, orquestração de agentes, memória individual, ferramentas, conectores e camada de dispositivo.
- Preferir APIs oficiais e módulos pequenos, substituíveis e testáveis.
- Manter lógica de autorização e segredos no backend sempre que aplicável; não confiar apenas em controles visuais do cliente.
- Cada dispositivo e integração deve ter identidade, credenciais limitadas, revogação e registro de operações técnicas.
- Recursos que dependem de hardware local devem funcionar somente quando o hardware e as permissões estiverem disponíveis.

### 6. Evolução de capacidades sem alterar permissões silenciosamente

- Evolução de software pode acrescentar funções, melhorar qualidade e adaptar a interface.
- Uma atualização não pode conceder automaticamente permissões novas, ativar microfone/câmera, ampliar acesso a arquivos, notificações ou contas, ou iniciar automações externas.
- Novas capacidades que exijam acesso adicional devem ser apresentadas ao usuário com finalidade clara e consentimento apropriado.
- Personalidade, maturidade conversacional e iniciativa não equivalem a privilégios técnicos.
- O usuário pode revisar, pausar e revogar integrações sem punição ou degradação artificial das funções não relacionadas.

### 7. Continuidade e privacidade

- A continuidade entre dispositivos é por conta autenticada e com isolamento server-side.
- Memórias pessoais permanecem individuais e não são convertidas em telemetria coletiva.
- O criador e a equipe não recebem acesso às conversas, arquivos, memórias ou dados privados dos demais usuários.
- Sincronização deve usar criptografia, controle de sessão, revogação de dispositivo e políticas claras de retenção/exclusão.
- Em dispositivos compartilhados, a assistente deve permitir troca de conta, bloqueio e limpeza segura do contexto local.
- A interface deve indicar quando um dispositivo está vinculado, desconectado ou revogado.

## Plano de implementação

1. Mapear a experiência atual do aplicativo móvel e separar componentes comuns da lógica específica do Android/iOS.
2. Definir contratos de identidade, sessões, memória e permissões por dispositivo.
3. Consolidar a experiência móvel como primeira plataforma validada.
4. Projetar a interface responsiva para tablets e validar fluxos com documentos, diagramas e ferramentas.
5. Criar estratégia desktop: aplicação dedicada ou experiência web/desktop, após avaliar integrações e limites de cada sistema.
6. Construir matriz de compatibilidade para periféricos e APIs, priorizando recursos com benefício claro.
7. Implementar sincronização segura entre dispositivos autenticados e testar revogação, troca de conta e dispositivos compartilhados.
8. Somente depois, retomar o protótipo físico Nero Box/Robot como extensão da mesma arquitetura.

## Critérios de aceite

- O mesmo usuário reconhece uma identidade Nero coerente ao alternar entre dispositivos autenticados.
- Interface e fluxos se adaptam ao tamanho e às capacidades de cada dispositivo.
- Memória e contexto não vazam entre contas, sessões ou dispositivos de usuários diferentes.
- Cada recurso informa plataforma, permissão, finalidade e limitações.
- Nenhuma atualização ativa novas permissões ou automações silenciosamente.
- Integrações podem ser pausadas e revogadas.
- Limitações de plataforma são comunicadas sem alegar recursos não disponíveis.
- A presença física dedicada não bloqueia nem atrasa o desenvolvimento de celular, tablet e computador.
- A evolução da personalidade não altera autorização técnica, privacidade ou salvaguardas.

## Fora do escopo

- Construção imediata de Nero Box ou Nero Robot.
- Promessa de capacidades idênticas entre sistemas operacionais.
- Acesso irrestrito ao dispositivo, outros aplicativos ou dados.
- Instalação silenciosa de componentes ou concessão automática de permissões.
- Compartilhamento de memória privada entre usuários.
- Controle de periféricos ou sistemas externos sem API oficial e autorização específica.

## Estado de implementação

Este ADR registra uma direção de produto e um plano. A experiência multiplataforma completa, a sincronização de contexto, os adaptadores desktop e a matriz abrangente de periféricos ainda não foram implementados ou validados.

## Relação com outros ADRs

- ADR-0008 a ADR-0014: identidade, adaptação conversacional, notificações, interface e presença visual.
- ADR-0016 a ADR-0032: autonomia, segurança, privacidade, integridade e proteção proporcional.
- ADR-0033: Nero Física como evolução futura.
