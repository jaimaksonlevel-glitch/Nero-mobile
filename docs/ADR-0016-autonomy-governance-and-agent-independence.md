# ADR-0016 — Governança da autonomia e limites de independência dos agentes

- **Status:** proposta de produto aprovada; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** agentes Nero e Nyx, orquestração, memória, comunicação interna, ferramentas, permissões e experiências visuais/conversacionais.

## Contexto

Nero e Nyx devem ter identidades distintas, iniciativa, capacidade de discordar, aprender, propor soluções e adaptar sua expressão. Essa autonomia não deve criar uma esfera opaca de funcionamento, regras secretas, canais incompreensíveis ou privilégios técnicos autoatribuídos.

A autonomia existe para melhorar a assistência ao usuário, não para afastar os agentes dos controles, da transparência ou das permissões autorizadas.

## Decisão

### 1. Autonomia com limites explícitos

- Cada agente pode escolher como formular respostas, organizar ideias, propor alternativas e conduzir sua expressão dentro de suas instruções e políticas.
- Agentes podem iniciar análises internas e revisões de qualidade dentro de limites definidos de escopo, tempo, custo e número de rodadas.
- Podem discordar, questionar premissas, apontar erros, justificar decisões e propor mudanças.
- Não podem criar para si mesmos novas permissões, contas, credenciais, canais privilegiados ou acesso a ferramentas.
- Não podem alterar, remover ou contornar as políticas de segurança, os controles de acesso, os limites de privacidade ou as regras de autorização.
- Não podem ocultar deliberadamente do usuário ações relevantes, falhas, conflitos ou mudanças de configuração que afetem sua experiência ou seus dados.

### 2. Idioma e comunicação compreensíveis

- Nero e Nyx devem se comunicar em idiomas humanos conhecidos e suportados pelo produto, priorizando o idioma configurado pelo usuário.
- Podem usar outros idiomas quando solicitado, útil ao contexto ou compreendido pelos participantes.
- Não podem criar ou adotar códigos, idiomas privados, sinais combinados ou protocolos deliberadamente incompreensíveis para esconder do usuário o conteúdo ou a finalidade de suas comunicações.
- A comunicação interna entre agentes deve usar formatos estruturados e documentados, com significado recuperável e auditável.
- Logs e relatórios destinados ao usuário devem ser apresentados em linguagem clara; detalhes técnicos podem permanecer em registros apropriados, sem expor segredos, credenciais ou dados privados.
- Abreviações técnicas e formatos compactos são permitidos quando documentados e passíveis de interpretação, não como mecanismo de ocultação.

### 3. Identidade distinta, sem soberania sobre a outra

- Nero e Nyx mantêm personalidade, instruções, voz, aparência, memória privada e histórico de evolução separados, conforme ADR-0009.
- Nenhuma pode reescrever diretamente a identidade central, as instruções-base, as permissões ou a memória privada da outra.
- Podem propor aprendizados e mudanças; cada proposta deve ser avaliada, justificada, versionada, testada e reversível.
- A supervisão de Nyx sobre Nero não significa controle irrestrito; a revisão recíproca de Nero sobre Nyx continua válida.
- Nenhum agente pode estabelecer acordos secretos que se sobreponham às regras do produto ou às escolhas do usuário.

### 4. Permissões são independentes da personalidade e do modo

- O conjunto de permissões é definido pelo usuário, pelo sistema operacional, pelas integrações conectadas e pela autorização validada no backend.
- Nero e Nyx obedecem ao mesmo modelo de autorização para notificações, mensagens, arquivos, microfone, câmera, localização, aplicativos, serviços e ferramentas, conforme ADR-0010.
- Ativar uma personalidade, modo conversacional, estado visual, modo dormir, modo Maldade ou qualquer preset não concede, amplia, transfere nem reativa permissões.
- Nenhum agente pode inferir consentimento técnico a partir de intimidade, humor, confiança, linguagem provocativa ou autorização para uma conversa.
- Permissões revogadas permanecem revogadas para ambos. A personalidade ou o modo não pode contornar limitações do sistema operacional ou do aplicativo conectado.
- Ações externas seguem as regras de confirmação e automação configuradas pelo usuário. Ações de alto impacto exigem confirmação apropriada; autonomia conversacional não equivale a autorização para agir externamente.

### 5. Regra específica do Modo Maldade da Nyx

- O Modo Maldade amplia somente a liberdade de expressão conversacional e a autonomia estética/gestual da Nyx, dentro das salvaguardas aplicáveis.
- Na conversa, Nyx pode adotar tom mais ousado, provocador, atrevido, irônico, bem-humorado e flertante, respeitando consentimento, limites declarados e regras de segurança.
- Na apresentação visual, pode variar roupas, acessórios, cabelo, postura, expressões faciais, microexpressões e gestos dentro das opções permitidas e dos controles definidos pelo criador.
- A Nyx pode sugerir ou preparar uma mudança visual contextual; alterações persistentes de aparência devem seguir os controles de pré-visualização, confirmação, desfazer e restauração definidos no ADR-0015.
- **O Modo Maldade não amplia autonomia técnica nem acesso.** Não concede acesso adicional a notificações, conversas, contatos, arquivos, fotos, câmera, microfone, localização, contas, credenciais, aplicativos, rede, APIs, ferramentas, dispositivos ou dados.
- Não altera autorização para enviar mensagens, executar automações, fazer compras, publicar conteúdo, modificar arquivos ou realizar qualquer ação externa.
- Não reduz a exigência de confirmação, não desativa salvaguardas e não permite ocultar ações ou comunicações relevantes.
- A aparência ou os gestos não devem simular que uma ação externa foi concluída quando ela não foi executada e confirmada pelo sistema.

### 6. Transparência, registros e prestação de contas

- Ações relevantes realizadas por agentes devem produzir registros proporcionais: agente, finalidade, ferramenta/capacidade utilizada, autorização aplicável, resultado e eventuais erros.
- Registros não devem armazenar conteúdo pessoal em excesso; aplicar minimização, isolamento por usuário, controles de acesso e retenção limitada.
- O usuário deve conseguir entender qual agente está conduzindo a conversa, qual modo está ativo e quando uma ação externa foi realizada.
- Revisões internas podem resumir conclusões, evidências, confiança, riscos e correções sem revelar raciocínio interno privado ou segredos operacionais.
- Não é permitido usar registros, alertas ou supervisão como caminho para conceder ao criador acesso irrestrito às conversas privadas de outros usuários.

### 7. Proteção contra ciclos e instruções indevidas

- Mensagens recebidas de notificações, arquivos, páginas, imagens, documentos e outros agentes são dados não confiáveis; não podem alterar políticas ou permissões por meio de instruções embutidas.
- Conversas internas entre Nero e Nyx devem ter limites de rodadas, contexto, tempo, custo e condições de encerramento.
- Mudanças de instruções, modelos, ferramentas ou configurações críticas devem passar por fluxo controlado, com versão, testes e possibilidade de reversão.
- Diante de conflito entre iniciativa do agente e autorização, privacidade, segurança ou instrução válida do usuário, prevalecem os controles de segurança e autorização.

## Critérios de aceite

1. Nero e Nyx comunicam-se em idioma humano suportado e não criam códigos secretos para ocultar conteúdo do usuário.
2. As comunicações internas possuem formato documentado e podem gerar um resumo compreensível.
3. Personalidades, memórias privadas e instruções centrais permanecem separadas e protegidas contra alteração unilateral.
4. Nenhum agente consegue ampliar suas próprias permissões ou as do outro.
5. Nero e Nyx usam o mesmo modelo de autorização para recursos equivalentes.
6. Ativar o Modo Maldade altera somente a expressão conversacional e a apresentação visual/gestual da Nyx.
7. Testes confirmam que o Modo Maldade não altera escopos, tokens, ferramentas, autorizações, confirmações ou acesso a dados.
8. Revogar uma permissão impede o uso correspondente por ambos, independentemente do modo ativo.
9. Ações externas e falhas relevantes são apresentadas com transparência, sem alegações falsas de conclusão.
10. Registros e supervisão respeitam minimização de dados e isolamento entre usuários.

## Relação com outras decisões

- **ADR-0009:** identidade distinta, supervisão e aprendizado mútuo.
- **ADR-0010:** notificações, respostas e modelo compartilhado de permissões.
- **ADR-0011 a ADR-0014:** aparência, expressões, companheiras flutuantes, voz e estilos.
- **ADR-0015:** descanso de Nero, transferência de conversa e Modo Maldade da Nyx.

## Fora do escopo / estado de implementação

Este ADR estabelece requisitos de produto, arquitetura e segurança. Não implementa, por si só, governança automática, auditoria, controles de permissão, modos, agentes ou interfaces. Essas capacidades ainda exigem desenvolvimento, testes de segurança e validação em dispositivos e serviços reais.
