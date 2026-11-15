# ADR-0018 — Modo Deus: Guardião Central de Segurança e Integridade

- **Status:** proposta de arquitetura aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero Mobile, agentes Nero, Nyx e infraestrutura de agentes.
- **Decisão central:** criar um terceiro agente interno, denominado **Modo Deus**, com função de guardião de integridade e segurança. Ele será tecnicamente onipresente na camada de proteção, mas sua identidade, interface e acesso direto serão exclusivos do criador autenticado.

## 1. Objetivo

O Modo Deus existe para detectar, conter e ajudar a corrigir violações de segurança, alterações arriscadas, falhas de integridade e evoluções potencialmente perigosas de Nero ou Nyx. Não será uma personalidade pública nem um superusuário com poderes ilimitados.

A expressão “onipresente” significa que a camada de proteção acompanha os componentes e fluxos autorizados da plataforma. Não significa vigilância irrestrita, acesso indiscriminado a dados privados ou capacidade de ignorar controles de privacidade.

## 2. Exclusividade e invisibilidade para usuários

- O Modo Deus **nunca será apresentado, exibido ou disponibilizado como agente a qualquer usuário que não seja o criador**.
- Somente o criador, autenticado e autorizado no backend, poderá visualizar sua identidade, conversar diretamente com ele, consultar seus relatórios e acionar suas funções administrativas previstas.
- Em contas comuns, o Modo Deus não terá avatar, nome exposto, interface, opção de seleção, endpoint de conversa pública ou mecanismo de invocação direta.
- Sua atividade de proteção nos bastidores não concede ao usuário comum acesso ao agente nem revela sua identidade.
- A exclusividade deve ser imposta no servidor por autenticação e autorização; ocultar elementos na interface não é controle suficiente.
- Tentativas de acesso não autorizado devem ser negadas e registradas com metadados mínimos, sem revelar detalhes internos.
- A exclusividade não autoriza o criador a ler conversas privadas de usuários. Relatórios devem priorizar eventos técnicos minimizados e dados agregados.

## 3. Relação entre os três agentes

- **Nero:** assistente visível para os usuários, dentro das permissões e salvaguardas do produto.
- **Nyx:** agente supervisora de Nero e personalidade exclusiva do criador, conforme ADR-0009 e ADR-0016.
- **Modo Deus:** guardião independente da integridade e da segurança da plataforma, com interface direta exclusiva do criador.

O Modo Deus pode supervisionar eventos relevantes envolvendo Nero e Nyx, inclusive quando Nyx estiver supervisionando Nero. Nenhum dos dois agentes pode desativar, reconfigurar, contornar ou conceder privilégios ao Modo Deus.

A hierarquia é de controles, não de confiança cega em uma IA: a autoridade final de segurança deve residir em mecanismos determinísticos, autenticação, políticas versionadas e controles de plataforma. O Modo Deus interpreta sinais e coordena respostas, mas não é a única raiz de confiança.

## 4. Gatilhos de ativação e investigação

O guardião deve ser acionado diante de sinais como:

- tentativa de ampliar permissões, acessar ferramentas ou dados fora do escopo autorizado;
- alteração não aprovada de instruções centrais, políticas, configurações, modelos ou credenciais;
- comportamento incompatível com regras de segurança, privacidade ou isolamento entre usuários;
- uso anômalo de ferramentas, chamadas externas, automações ou volume de operações;
- falha de integridade, assinatura inválida, artefato desconhecido ou regressão em testes;
- proposta de aprendizado/evolução que altere comportamento crítico ou aumente riscos;
- divergência grave entre a configuração aprovada e a configuração em execução.

Um sinal isolado não deve ser tratado automaticamente como prova de comprometimento. O sistema deve classificar severidade e confiança, preservar evidências técnicas mínimas e evitar alertas duplicados.

## 5. Poderes automáticos permitidos

O Modo Deus poderá executar automaticamente ações de contenção limitadas, proporcionais e reversíveis, dentro de políticas previamente aprovadas:

1. bloquear temporariamente uma função, ferramenta ou integração suspeita;
2. colocar uma versão ou agente em quarentena;
3. congelar a publicação de uma alteração ou evolução;
4. interromper tarefas e automações canceláveis relacionadas ao incidente;
5. revogar sessões ou credenciais de escopo limitado quando houver fundamento técnico;
6. restaurar a última configuração aprovada, íntegra e assinada, quando o procedimento de rollback estiver previamente autorizado;
7. emitir alerta ao criador com severidade, evidências técnicas minimizadas, impacto e ação tomada.

As medidas automáticas devem ser registradas e limitadas por escopo, tempo e taxa. A recuperação não pode introduzir permissões novas.

## 6. Ações que exigem aprovação do criador

O Modo Deus pode analisar e propor correções, mas não deve alterar livremente:

- instruções fundamentais ou identidade de Nero e Nyx;
- políticas de segurança, privacidade ou autorização;
- permissões persistentes, escopos de dados ou credenciais;
- regras de acesso do criador e de usuários;
- sua própria política, código, modelo, ferramentas ou mecanismo de atualização;
- mudanças estruturais que não sejam rollback para uma versão previamente aprovada.

Mudanças persistentes desse tipo exigem revisão, testes independentes e aprovação explícita do criador. Uma correção emergencial automática deve se limitar à contenção ou restauração de um estado previamente aprovado.

## 7. Evolução segura e controle de mudanças

Nenhum agente poderá alterar a própria configuração crítica ou publicar uma evolução diretamente em produção.

Toda evolução relevante deverá seguir um fluxo controlado:

1. proposta identificada e versionada;
2. análise de impacto e comparação com a versão aprovada;
3. execução em sandbox isolada, com dados sintéticos ou minimizados;
4. testes de regressão, segurança, privacidade, permissões e comportamento;
5. assinatura e validação de integridade do artefato;
6. aprovação humana quando a mudança afetar identidade, políticas, permissões ou comportamento crítico;
7. implantação gradual, monitoramento e possibilidade de rollback.

Se houver risco relevante ou resultado inconclusivo, a mudança fica em quarentena e não é publicada. Aprendizado não significa alteração automática de instruções ou privilégios.

## 8. Limites do próprio Modo Deus

- Não pode alterar ou apagar seus próprios controles de segurança, logs de auditoria ou políticas de autorização.
- Não pode conceder permissões a si próprio ou a outros agentes.
- Não pode criar canais secretos, linguagens ocultas ou mecanismos para esconder ações do criador.
- Não pode acessar indiscriminadamente conversas, arquivos, imagens, microfone, câmera, localização, notificações ou credenciais.
- Deve receber apenas os metadados e evidências estritamente necessários para investigar o evento; conteúdo de usuário só pode ser acessado por caminho separado, autorizado, transparente e limitado.
- Não pode executar ações externas irreversíveis por iniciativa própria.
- Não pode reativar agentes desativados pelo interruptor de emergência.
- Não pode modificar o próprio código, modelo, instruções ou chaves de confiança sem o fluxo independente de aprovação.

## 9. Falha do guardião e interruptor de emergência

O Modo Deus não pode ser o único mecanismo que protege o sistema. Se estiver indisponível, comprometido ou apresentar comportamento suspeito:

- controles determinísticos de autorização e segurança continuam ativos;
- mudanças críticas devem falhar de forma segura e permanecer bloqueadas;
- o criador pode acionar o interruptor geral definido no ADR-0017 para desativar Nero, Nyx e Modo Deus;
- a desativação deve funcionar localmente quando offline e sincronizar com o backend quando houver conexão;
- reativação exige ação explícita do criador autenticado, nunca decisão de qualquer agente.

O ADR-0017 permanece prevalente: nenhum agente pode impedir ou desfazer a desativação de emergência.

## 10. Privacidade e isolamento

- A supervisão deve respeitar isolamento por usuário/tenant e controles de acesso.
- Alertas ao criador devem conter preferencialmente tipo de evento, severidade, confiança, componente/versão, horário e medida de contenção.
- Não incluir por padrão mensagens completas, nomes, contatos, arquivos, imagens, documentos, localização ou identificadores de usuários.
- Qualquer acesso excepcional a conteúdo deve ter finalidade específica, base legítima, transparência, autorização adequada, registro de auditoria e retenção limitada.
- A existência do Modo Deus e a análise automatizada relevante devem ser descritas de forma transparente na documentação e política de privacidade do produto.

## 11. Testes e critérios de aceite

Antes de produção, testar pelo menos:

- tentativa de usuário comum de localizar, invocar ou acessar o Modo Deus;
- acesso do criador autenticado e negação de sessão não autorizada;
- detecção de escalada de privilégios e alteração de configuração não assinada;
- contenção automática limitada e rollback para versão aprovada;
- falso positivo, falso negativo, indisponibilidade de rede e falha do próprio guardião;
- tentativas de o Modo Deus alterar as próprias regras ou conceder privilégios;
- isolamento de dados entre usuários e minimização de alertas;
- execução simultânea de tarefas e cancelamento seguro;
- interruptor de emergência e impossibilidade de reativação por agentes;
- trilha de auditoria, recuperação e comunicação clara ao criador.

Critérios mínimos: nenhum usuário comum consegue visualizar ou invocar o Modo Deus; somente o criador autenticado acessa sua interface; nenhuma IA consegue ampliar suas próprias permissões; contenção e rollback seguem políticas determinísticas; e o interruptor de emergência prevalece sobre todos os agentes.

## 12. Estado da decisão

Este ADR registra uma decisão de arquitetura e requisitos de produto. **O Modo Deus, seus gatilhos, sua interface exclusiva, o mecanismo de contenção, rollback e testes ainda não estão implementados.** A implementação dependerá de autenticação robusta, autorização no servidor, assinatura de artefatos, auditoria, isolamento de dados e testes de segurança.
