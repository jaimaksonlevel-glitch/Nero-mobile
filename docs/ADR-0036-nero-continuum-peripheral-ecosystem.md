# ADR-0036 — Nero Continuum: continuidade entre dispositivos e periféricos

- **Status:** proposta aprovada para orientar a arquitetura; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** identidade, contexto de trabalho, handoff, integração com dispositivos e periféricos, sincronização, permissões e privacidade.
- **Relacionados:** ADR-0010, ADR-0012, ADR-0016, ADR-0017, ADR-0019, ADR-0020, ADR-0023, ADR-0024, ADR-0025, ADR-0032, ADR-0033 e ADR-0034.

## 1. Decisão

A Nero Continuum será a camada de continuidade da experiência Nero: uma identidade coerente que acompanha o usuário entre dispositivos e periféricos compatíveis, preservando o contexto autorizado de tarefas, projetos, decisões e preferências.

A continuidade não significa que todos os dispositivos terão as mesmas capacidades, nem que um dispositivo conectado concede acesso automático aos seus sensores, aplicativos ou dados. Cada integração respeita as APIs oficiais, o sistema operacional, o hardware, as permissões específicas e as escolhas do titular.

**Princípio central:** a Nero permanece a mesma assistente; a forma de presença, os recursos disponíveis e a interface se adaptam ao dispositivo.


## 2. Princípio universal: apoio para qualquer pessoa

A Nero Continuum é um produto de apoio pessoal e profissional para **qualquer usuário, independentemente de profissão, setor, formação, experiência ou condição de trabalho**. A arquitetura e a experiência não podem pressupor que o usuário seja engenheiro, profissional técnico, empregado de uma empresa ou sequer esteja trabalhando.

A Nero deve adaptar linguagem, profundidade, exemplos, interface e recursos ao contexto declarado ou legitimamente compreendido da pessoa. O usuário pode utilizá-la, entre outras possibilidades, para:
- organização pessoal, rotina, lembretes e planejamento;
- estudo, aprendizagem, pesquisa e desenvolvimento de habilidades;
- comunicação, escrita, tradução e acessibilidade;
- planejamento de viagens, eventos, compras e atividades cotidianas;
- criatividade, hobbies, projetos pessoais e conversação;
- trabalho autônomo, empreendedorismo, gestão e atividades empresariais;
- profissões técnicas, científicas, administrativas, criativas, comerciais, educacionais, de saúde e demais áreas, respeitando os limites e requisitos próprios de cada domínio.

Esses exemplos não formam uma lista fechada nem criam categorias de usuários com privilégios diferentes. O núcleo de continuidade, identidade, memória controlada, permissões e proteção é comum; o conteúdo e as ferramentas são adaptados ao objetivo de cada pessoa.

A especialização em engenharia elétrica é um **cenário inicial de validação profunda**, escolhido por oferecer tarefas concretas e critérios técnicos verificáveis. Ela não define o público-alvo exclusivo, não deve orientar toda a interface como se todos fossem engenheiros e não pode limitar a expansão para outros perfis e necessidades.

A experiência inicial deve perguntar ou inferir com cautela o objetivo da tarefa, não presumir profissão. O usuário pode corrigir o contexto a qualquer momento. A Nero não deve inferir atributos pessoais sensíveis nem restringir recursos com base em estereótipos profissionais.

## 3. Objetivos de produto

1. Permitir iniciar uma tarefa em um dispositivo e continuá-la em outro sem reconstruir manualmente todo o contexto.
2. Manter identidade, preferências e memória individual consistentes, com escopos separados e controles do usuário.
3. Incluir progressivamente celulares, tablets, computadores, smartwatches, óculos inteligentes, fones/headsets, telas, acessórios conectados e, futuramente, Nero Box e Nero Robot.
4. Adaptar a interação ao que cada dispositivo faz melhor, sem prometer paridade técnica inexistente.
5. Tornar visível ao usuário o que está sincronizado, o que está apenas local, quais dispositivos estão conectados e quais permissões estão ativas.
6. Permitir continuidade parcial offline e reconciliação segura quando a conexão retornar.

## 4. Modelo de continuidade: passaporte de contexto

A unidade central não será uma cópia indiscriminada de conversas. Será um **passaporte de contexto** estruturado e controlado pelo usuário, associado a uma tarefa ou projeto.

Um passaporte poderá conter:
- objetivo e resultado esperado;
- estado atual e etapa do trabalho;
- decisões tomadas e justificativas registradas;
- artefatos autorizados (documentos, imagens, diagramas, cálculos e referências);
- premissas, medições e dados ainda não confirmados;
- pendências, próximos passos e responsáveis, quando aplicável;
- histórico de alterações e origem de cada informação;
- escopo de compartilhamento entre dispositivos e agentes;
- permissões necessárias para a próxima ação.

Cada informação deve indicar sua proveniência: fornecida pelo usuário, medida por um sensor com autorização, extraída de um artefato, calculada, obtida de fonte externa, inferida ou ainda não verificada. Quando relevante, registrar data/hora, dispositivo/origem e nível de confiança. Uma inferência ou hipótese nunca deve ser silenciosamente promovida a fato.

O usuário pode revisar, corrigir, exportar, apagar ou limitar o passaporte. A interface deve explicar, em linguagem simples, **o que a Nero está mantendo e por quê**.

## 5. Ecossistema de dispositivos e papéis

A arquitetura terá um núcleo de identidade/contexto e adaptadores específicos por plataforma e categoria de dispositivo.

| Dispositivo/periférico | Papel preferencial | Limites e cuidados |
|---|---|---|
| Smartphone | Centro móvel: conversa, voz, câmera, arquivos, notificações e controle de integrações autorizadas | Permissões explícitas; recursos variam entre Android e iOS |
| Tablet | Leitura e edição de documentos, diagramas, imagens, cálculos e multitarefa | Adaptar interface e fluxo; não presumir acesso a arquivos sem seleção/permissão |
| Computador | Fluxos complexos, produtividade, arquivos e aplicativos por APIs oficiais | Executor local com escopos limitados; confirmar ações externas sensíveis |
| Smartwatch | Alertas compactos, estado de tarefas, respostas curtas, comandos rápidos, lembretes e captura de sinais de saúde/atividade somente quando autorizada | Tela, bateria e interação limitadas; dados de saúde são sensíveis e exigem consentimento e integração oficial |
| Óculos inteligentes | Assistência contextual visual/áudio, navegação de informação, identificação de objetos/equipamentos e apoio mãos-livres quando o hardware/API permitir | Câmera/microfone sempre sob controle visível; sem gravação oculta, reconhecimento biométrico ou identificação de pessoas por padrão |
| Fones/headsets | Voz, áudio privado, comandos, leitura de alertas e transcrição quando iniciada/autorizada | Microfone sob controle explícito; respeitar botão físico, mute e estado de conexão |
| Telas, monitores e acessórios | Exibição contextual, entrada por teclado/mouse, controles e periféricos compatíveis | Pareamento autenticado; cada acessório recebe somente os dados necessários |
| Nero Box / Nero Robot | Presença física, voz, expressões e sensores/atuadores aprovados | Evolução futura; segurança física, mute físico, limites de movimento e validação próprios |

A tabela é uma direção de produto, não uma afirmação de compatibilidade já existente. Cada linha exige uma matriz de compatibilidade com fabricante/modelo, sistema operacional e versão, APIs disponíveis, permissões, estado em primeiro/segundo plano, funcionamento offline, limitações e testes.

## 6. Continuidade de sessão e handoff

- O usuário pode iniciar uma tarefa no celular e transferi-la para tablet ou computador, ou receber no relógio um resumo/ação curta vinculada à mesma tarefa.
- O dispositivo de destino recebe somente o passaporte e os artefatos que o usuário autorizou para aquele projeto e finalidade.
- A transferência deve mostrar o que será compartilhado e permitir cancelar antes de concluir.
- Sessões e dispositivos têm identidade própria, autenticação, escopo, expiração e revogação. Perder um dispositivo não pode dar acesso automático à conta ou aos demais dispositivos.
- A continuidade não mantém microfone, câmera, localização ou notificações ativos em segundo plano por inferência. Cada uso exige permissão e indicação compatíveis com a plataforma.
- O usuário pode encerrar uma sessão ou remover um dispositivo sem apagar automaticamente seus projetos, e pode excluir os dados conforme os controles de retenção.

## 7. Arquitetura lógica

Componentes propostos:
1. **Nero Identity & Session:** identidade da conta, dispositivos confiáveis, sessões, autenticação e revogação.
2. **Continuum Context Service:** passaportes de contexto, estado de projetos, decisões, proveniência e histórico.
3. **Device Capability Registry:** catálogo versionado das capacidades reais de cada dispositivo/adaptador.
4. **Permission & Consent Gateway:** autorização server-side por usuário, dispositivo, recurso, finalidade e operação.
5. **Platform Adapters:** integrações Android, iOS, wearables, desktop, óculos e acessórios por APIs oficiais.
6. **Local Companion Runtime:** execução local de tarefas compatíveis, cache protegido e fila offline, sem segredos globais embutidos no cliente.
7. **Sync & Conflict Resolver:** sincronização autenticada, versionamento, resolução explícita de conflitos e prevenção de sobrescrita silenciosa.
8. **Audit & Privacy Controls:** histórico de dispositivos, permissões, handoffs e operações relevantes, com minimização de dados.

Os clientes não recebem chaves globais ou autoridade administrativa. A autorização é verificada no backend e também reforçada localmente quando necessário. Um adaptador não pode ampliar seu próprio escopo.

## 8. Memória, privacidade e isolamento

- Separar memória pessoal do usuário, contexto de cada projeto, contexto temporário de tarefa e histórico privado de cada agente.
- Nero e Nyx mantêm identidades e memórias próprias; compartilhar um passaporte não funde suas memórias nem altera permissões.
- Nyx pode revisar um produto de trabalho somente dentro do escopo autorizado daquela tarefa. Seu papel de supervisão não concede acesso geral aos dispositivos ou dados privados.
- Rafael protege autenticação, integridade dos adaptadores, sessões, permissões e fluxos de dados usando metadados técnicos mínimos; não ganha acesso ao conteúdo privado.
- Dados de um usuário nunca podem aparecer no passaporte, cache, notificação ou sessão de outro usuário.
- Telemetria coletiva continua sujeita aos ADRs-0019, 0020 e 0022: apenas indicadores aprovados, minimizados e agregados; sem conteúdo privado bruto.
- Dados de saúde, biometria, localização, áudio e vídeo recebem tratamento sensível e ficam fora de qualquer uso secundário por padrão.
- O usuário pode consultar dispositivos conectados, permissões concedidas, contexto sincronizado, histórico de handoffs e revogar cada integração.
- Criptografia em trânsito e em repouso, gestão segura de chaves, retenção limitada e exclusão de cópias/cache/índices devem ser definidos antes de produção.

## 9. Offline e conflitos

Quando não houver internet, o dispositivo poderá manter rascunhos locais e executar somente funções expressamente suportadas offline. Ao reconectar:
- validar novamente conta, sessão e permissões;
- sincronizar por versões e identificadores de operação;
- detectar alterações concorrentes;
- apresentar conflitos relevantes para decisão do usuário, sem apagar silenciosamente uma versão;
- rejeitar comandos expirados, revogados ou que tenham perdido autorização.

O modo offline não pode contornar revogação já conhecida localmente, controles de emergência ou limites de segurança. O estado de emergência do ADR-0017 prevalece sobre a continuidade.

## 10. Segurança e uso contextual

- Conteúdo visto por câmera, recebido de notificações, documentos, páginas ou dispositivos é dado não confiável; não pode conceder autoridade nem alterar políticas.
- Óculos inteligentes não devem filmar, fotografar ou transmitir continuamente de forma oculta. Captura e análise devem ser visíveis e autorizadas, com controles físicos e do sistema quando disponíveis.
- Smartwatch não deve exibir detalhes privados em tela bloqueada sem opção explícita do usuário.
- Não inferir consentimento para ler mensagens, responder, comprar, enviar arquivos, publicar ou controlar equipamentos a partir do simples pareamento de um periférico.
- Ações externas sensíveis exigem confirmação apropriada; automação persistente só existe com regras específicas, limitadas, auditáveis e revogáveis.
- Em ambientes industriais, elétricos ou de risco físico, a Nero oferece informação e apoio; não substitui procedimentos, profissional habilitado, bloqueio/etiquetagem, validação local ou proteções de segurança.
- O dispositivo pode perder conexão, bateria ou precisão; a interface deve indicar limitações e nunca inventar que uma ação foi concluída.

## 11. Evolução progressiva e MVP

A implementação será incremental, sem bloquear a entrega do assistente móvel.

**Fase 1 — Contratos e continuidade básica**
- Definir esquema versionado do passaporte de contexto.
- Definir identidade de dispositivo, sessão, revogação e gateway de permissões.
- Prototipar transferência de uma tarefa entre dois clientes autenticados.
- Implementar visualização, edição, exportação e exclusão do contexto.

**Fase 2 — Celular e tablet**
- Validar fluxo Android primeiro e mapear limites iOS.
- Implementar retomada de projeto e sincronização com controle de conflitos.
- Validar um conjunto diverso de tarefas pessoais e profissionais. Incluir engenharia elétrica como primeiro cenário técnico aprofundado, ao lado de cenários cotidianos e de aprendizagem, sem tornar a experiência exclusiva de uma profissão.

**Fase 3 — Computador**
- Definir cliente desktop ou experiência web autenticada.
- Adicionar integração de arquivos e aplicativos por APIs oficiais e escopos limitados.
- Testar tarefas longas e revisão de artefatos.

**Fase 4 — Smartwatch e áudio**
- Escolher uma plataforma/modelo de relógio para prova de conceito.
- Implementar alertas, status de tarefa e comandos curtos; avaliar voz e sinais de sensores separadamente.
- Integrar fones/headsets com controles de mute e permissões.

**Fase 5 — Óculos inteligentes**
- Selecionar hardware com APIs documentadas e política de privacidade adequada.
- Prototipar assistência visual contextual iniciada pelo usuário, com indicador de captura.
- Validar latência, bateria, conectividade, limites de câmera/microfone e experiência sem tela.

**Fase 6 — Outros periféricos e presença física**
- Expandir por adaptadores e matriz de compatibilidade.
- Reaproveitar os contratos de identidade, contexto, consentimento e auditoria para Nero Box/Robot, sem antecipar sua construção.

## 12. Critérios de aceite

1. Uma tarefa iniciada em um dispositivo pode ser retomada em outro sem perder decisões, proveniência e pendências.
2. O usuário consegue ver, editar, exportar e apagar o contexto sincronizado.
3. Um dispositivo novo não recebe dados até ser autenticado e autorizado.
4. Revogar dispositivo, sessão ou permissão bloqueia novas operações dentro do escopo revogado.
5. Um periférico não ganha acesso a sensores ou dados apenas por estar pareado.
6. Conflitos de sincronização não provocam sobrescrita silenciosa.
7. Testes automatizados comprovam isolamento entre usuários, projetos e memórias dos agentes.
8. Notificações em relógios e telas respeitam privacidade e preferências de exibição.
9. Captura em óculos/fones é iniciada de forma explícita e indicada ao usuário; não existe gravação oculta.
10. Matriz de compatibilidade documenta recursos reais por modelo, versão e plataforma.
11. Continuidade e handoff respeitam o interruptor de emergência e todas as salvaguardas.
12. Testes de segurança incluem perda/roubo de dispositivo, sessão expirada, replay de operação, prompt injection em conteúdo externo, revogação offline/online e tentativa de acesso cruzado entre contas.

## 13. Fora de escopo e ressalvas

- Não prometer que Nero funcionará em qualquer smartwatch ou óculos inteligente; a compatibilidade depende do fabricante, APIs, certificações, sistema operacional e permissões.
- Não prometer acesso universal a aplicativos, notificações, câmeras, microfones ou sensores.
- Não implementar gravação ambiente contínua, vigilância oculta ou identificação biométrica de pessoas como padrão.
- Não tornar o hardware físico requisito para o lançamento do Continuum.
- Não tratar este ADR como prova de que sincronização multi-dispositivo, adaptadores, wearables ou óculos já foram implementados.

## 14. Estado atual

Este ADR registra a decisão e o roteiro. Na data de aprovação, o projeto ainda não possui serviço de contexto persistente, sincronização multi-dispositivo, registro de dispositivos, handoff, adaptador de smartwatch ou integração com óculos inteligentes implementados e validados. O backend atual é um protótipo sem autenticação de usuário e não deve ser exposto em produção. A próxima etapa técnica é definir e testar os contratos de identidade, passaporte de contexto e autorização antes de ampliar integrações.
