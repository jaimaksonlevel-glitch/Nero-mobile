# ADR-0022 — Aprendizado Coletivo a partir das Instâncias da Nero

- **Status:** proposta de produto e arquitetura aprovada para planejamento; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0016, ADR-0018, ADR-0019, ADR-0020 e ADR-0021.
- **Decisão:** Nyx será responsável por identificar oportunidades de evolução coletiva a partir de sinais técnicos protegidos provenientes das diferentes instâncias da Nero. O objetivo é tornar a Nero mais versátil para diferentes perfis, idiomas, tarefas e contextos, sem transformar experiências privadas em material de treinamento nem misturar memórias individuais.

## 1. Objetivo

Cada instância da Nero atende uma pessoa e se adapta ao seu contexto autorizado. Ao longo do uso, avaliações e indicadores técnicos podem revelar padrões gerais: tarefas em que a Nero se destaca, dificuldades recorrentes, estratégias eficazes, falhas de compreensão, necessidades de acessibilidade e diferenças de desempenho entre versões.

Nyx poderá analisar esses padrões coletivos para propor melhorias que beneficiem o produto como um todo. Ela atua como analista e curadora de hipóteses de evolução, não como mecanismo de treinamento irrestrito ou alteração autônoma em produção.

## 2. O que pode ser aprendido coletivamente

Quando representados por dados sintéticos, avaliações controladas ou métricas agregadas aprovadas pelo gateway do ADR-0020, os sinais podem ajudar a melhorar:

- versatilidade em diferentes tipos de tarefas e áreas profissionais;
- clareza, concisão, explicações passo a passo e adaptação de linguagem;
- reconhecimento de incerteza, correção de erros e qualidade de fontes;
- robustez a ambiguidades, entradas incompletas e conteúdo não confiável;
- acessibilidade, usabilidade, voz e interação multimodal;
- desempenho técnico, confiabilidade, latência e eficiência;
- identificação de lacunas de conhecimento e prioridades de novos testes.

Esses sinais servem para formular hipóteses e orientar avaliações. Uma correlação observada não prova, por si só, que uma mudança causará melhoria.

## 3. Fontes permitidas e fronteira de privacidade

Nyx poderá analisar somente:
- métricas agregadas e minimizadas liberadas pelo gateway de privacidade;
- categorias padronizadas de erros e resultados de avaliações, sem conteúdo de conversa;
- benchmarks e conjuntos de testes sintéticos;
- feedback voluntário estruturado, apenas após tratamento e aprovação pelo gateway;
- relatórios técnicos de qualidade, segurança e estabilidade;
- resultados de experimentos controlados e comparações entre versões.

Continuam proibidos no fluxo coletivo, por padrão:
- conversas, prompts, respostas e transcrições individuais;
- memórias, preferências, perfis e históricos pessoais;
- arquivos, imagens, documentos, áudios, notificações e dados de outros aplicativos;
- nomes, contatos, identificadores, localização e metadados que permitam identificar uma pessoa;
- embeddings, resumos, exemplos ou derivados recuperáveis de conteúdo privado;
- acesso direto da Nyx a bancos de memória, logs brutos, sessões ou contas.

A regra vale mesmo quando o criador solicita relatórios ou quando Nyx identifica uma oportunidade de melhoria. A privacidade individual não é moeda de troca para evolução coletiva.

## 4. Ciclo de aprendizado coletivo

1. **Observar:** cada Nero pode emitir somente eventos técnicos mínimos previstos em esquema fechado.
2. **Proteger:** o gateway valida, minimiza, agrega, suprime grupos raros e avalia riscos de inferência e reidentificação.
3. **Identificar padrões:** Nyx analisa apenas conjuntos aprovados e formula hipóteses gerais, indicando limitações e confiança.
4. **Propor:** Nyx descreve a melhoria esperada, o problema-alvo, os riscos e os testes necessários.
5. **Experimentar:** a proposta é avaliada em sandbox com dados sintéticos, benchmarks e testes de regressão.
6. **Revisar:** mudanças relevantes passam por revisão técnica, segurança e privacidade; mudanças críticas exigem aprovação humana.
7. **Liberar gradualmente:** somente artefatos versionados, assinados e aprovados podem ser testados em rollout limitado.
8. **Medir e reverter:** resultados são comparados com baseline; regressões provocam pausa ou rollback.
9. **Relatar:** Nyx apresenta ao criador resultados, evidências, limitações, regressões e recomendações conforme ADR-0021.

## 5. Aprendizado compartilhado sem apagar individualidade

- A evolução coletiva pode aprimorar o comportamento-base e as capacidades gerais da Nero.
- Cada Nero mantém memória, preferências, tom personalizado e histórico isolados por usuário.
- O aprendizado coletivo não transfere memórias, exemplos privados ou características pessoais entre contas.
- Atualizações gerais não podem sobrescrever silenciosamente preferências individuais.
- Personalizações podem ser preservadas por camadas de configuração separadas e compatíveis com versões novas.
- O usuário deve ter transparência e controles apropriados sobre memória e personalização de sua própria Nero.
- Nyx e Nero mantêm identidades e memórias distintas; compartilhar uma melhoria validada não significa fundir suas personalidades.

## 6. Aprendizado não é autoalteração irrestrita

Nyx pode descobrir padrões, propor experiências, analisar resultados e recomendar mudanças. Ela não pode:
- treinar ou alterar diretamente o modelo em produção com dados privados;
- editar sozinha prompts centrais, políticas, permissões ou identidade dos agentes;
- aprovar a própria proposta ou ocultar resultados desfavoráveis;
- liberar uma melhoria sem testes, revisão e controles de versão;
- relaxar o gateway, ampliar a coleta ou criar novas fontes de dados por iniciativa própria.

A melhoria pode ocorrer por ajustes de produto, ferramentas, recuperação de conhecimento, instruções versionadas, modelos ou treinamento futuro devidamente autorizado. Cada método exige avaliação própria de segurança, privacidade, licença, custo e desempenho.

## 7. Diversidade e prevenção de viés

Métricas globais podem esconder dificuldades de grupos menores ou contextos específicos. Por isso:
- comparar resultados em cenários sintéticos diversos, sem expor segmentos identificáveis;
- não tratar frequência de uso como sinônimo de importância ou qualidade;
- avaliar diferenças de idioma, acessibilidade, dispositivo, conectividade e tipo de tarefa apenas quando os grupos forem suficientemente amplos e protegidos;
- suprimir resultados raros e evitar inferências sobre pessoas ou pequenos grupos;
- documentar lacunas de cobertura e limites de generalização;
- não otimizar apenas para engajamento, tempo de uso ou quantidade de mensagens.

## 8. Papel do Modo Deus

O Modo Deus verifica a integridade do pipeline, das fontes, dos esquemas, das aprovações e dos artefatos. Pode congelar a coleta ou a publicação, colocar conjuntos em quarentena e impedir uma atualização quando houver risco ou violação.

Ele não precisa acessar conteúdo privado para proteger o processo e não pode relaxar as regras de privacidade. Controles determinísticos, isolamento de serviços, assinaturas e permissões de infraestrutura continuam sendo a raiz de confiança; a decisão de uma IA nunca é a única barreira.

## 9. Critérios de aceite

Antes de habilitar aprendizado coletivo em produção, demonstrar que:
- Nyx recebe apenas conjuntos liberados pelo gateway e não tem rota técnica para memória ou conversa individual;
- eventos com texto livre, identificadores ou campos não permitidos são rejeitados;
- grupos pequenos e padrões raros são suprimidos;
- riscos de reidentificação e inferência são testados e documentados;
- propostas são reproduzíveis em sandbox com dados sintéticos;
- toda mudança tem baseline, testes, revisão, versão, aprovação aplicável e rollback;
- regressões e incertezas são comunicadas ao criador;
- memórias e personalizações individuais permanecem isoladas após atualizações;
- a interrupção do gateway bloqueia novos dados e análises coletivas;
- nenhuma atualização altera silenciosamente políticas, permissões ou preferências pessoais.

## 10. Estado

Este ADR é uma especificação. **Não existe ainda um pipeline de aprendizado coletivo, coleta agregada em produção, análise contínua da Nyx, treinamento compartilhado ou rollout automatizado implementado.** A implementação depende primeiro da fundação de identidade, isolamento, gateway de privacidade, telemetria segura e testes descritos nos ADRs-0019 e 0020.
