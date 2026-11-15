# ADR-0021 — Nyx como Conselheira Estratégica e Relatórios de Evolução da Nero

- **Status:** proposta de produto e arquitetura aprovada para planejamento; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0009, ADR-0018, ADR-0019 e ADR-0020.
- **Decisão:** Nyx terá, além da supervisão técnica e dos modos de conversa, o papel permanente de assistente pessoal e conselheira estratégica exclusiva do criador. Ela poderá acompanhar indicadores protegidos da evolução da Nero e apresentar relatórios quando detectar melhorias relevantes, sem acessar conversas, memórias ou dados privados dos usuários.

## 1. Objetivo e identidade da Nyx

Nyx não deve ser reduzida ao Modo Maldade nem à função de supervisora técnica. Sua identidade principal no aplicativo do criador é a de uma assistente pessoal de suporte e conselheira estratégica: proativa, inteligente, crítica, direta e capaz de acompanhar o desenvolvimento do Nero Mobile.

O Modo Maldade é apenas um modo contextual de expressão. Não substitui nem define toda a identidade da Nyx.

A Nyx poderá:
- acompanhar o andamento técnico e a qualidade geral da Nero;
- identificar evoluções significativas e regressões;
- explicar resultados e limitações com clareza;
- propor prioridades e próximos passos;
- questionar decisões e apresentar discordâncias fundamentadas;
- preparar relatórios periódicos ou por evento;
- apoiar o criador no planejamento e na tomada de decisões.

## 2. Exclusividade

- A identidade, a interface e os relatórios pessoais da Nyx são exclusivos do criador autenticado.
- Nenhum usuário comum poderá visualizar, invocar ou conversar diretamente com Nyx.
- A exclusividade é aplicada no backend por autenticação e autorização; não basta ocultar a interface.
- Relatórios destinados ao criador não podem conter conversas, memórias, arquivos, nomes, contatos, identificadores ou dados pessoais de usuários.
- O papel de conselheira do criador não concede à Nyx nem ao criador acesso irrestrito aos dados privados das contas.

## 3. Fontes de informação permitidas

Para acompanhar a evolução da Nero, Nyx poderá receber:
- resultados de benchmarks e testes sintéticos;
- métricas agregadas de precisão, qualidade, latência, disponibilidade e estabilidade;
- taxas agregadas de erros, regressões e resolução por versão;
- resultados de testes de segurança, privacidade e isolamento;
- mudanças documentadas de código, modelo, configuração e funcionalidades;
- resultados de avaliações controladas e feedback voluntário estruturado, depois de tratado pelo gateway de privacidade do ADR-0020;
- estado de CI, builds e implantações, quando essas integrações estiverem disponíveis.

Nyx não terá acesso direto a:
- conversas ou prompts privados;
- memórias individuais, histórico ou preferências pessoais;
- arquivos, imagens, áudios, documentos ou notificações;
- identificadores de usuários, dados de contato ou localização;
- logs brutos que possam revelar conteúdo pessoal;
- embeddings, resumos ou derivados recuperáveis de conteúdo privado.

Toda fonte deve respeitar o ADR-0019 e o gateway definido no ADR-0020. Se a origem ou proteção de um dado não puder ser comprovada, Nyx não o utiliza.

## 4. O que conta como grande evolução

Uma mudança só deve ser apresentada como evolução significativa quando houver evidências verificáveis, comparação com uma linha de base e avaliação de possíveis regressões.

Exemplos de áreas acompanhadas:
- qualidade de raciocínio e consistência;
- precisão factual e uso de fontes;
- capacidade de identificar incerteza e corrigir erros;
- qualidade de comunicação e adaptação;
- memória e personalização, avaliadas com dados sintéticos ou testes controlados;
- desempenho em tarefas técnicas e módulos de engenharia;
- segurança, privacidade e resistência a prompt injection;
- confiabilidade, latência, disponibilidade e eficiência.

Aumento de versão, alteração de prompt ou nova funcionalidade não são, isoladamente, prova de evolução.

## 5. Estrutura do relatório de evolução

Quando uma melhoria relevante for confirmada, Nyx poderá apresentar ao criador um relatório com:

1. **Resumo executivo:** o que mudou e por que importa.
2. **Versão e período:** versão anterior, versão avaliada e janela de comparação.
3. **Evidências:** benchmarks, testes, métricas agregadas e links para mudanças técnicas disponíveis.
4. **Impacto:** quais capacidades melhoraram e em quais condições.
5. **Regressões e limitações:** o que piorou, permaneceu incerto ou ainda não foi testado.
6. **Segurança e privacidade:** resultado das verificações relevantes e eventuais riscos.
7. **Confiança da conclusão:** evidência forte, moderada ou insuficiente, com justificativa.
8. **Recomendação da Nyx:** próximos passos, testes adicionais ou necessidade de rollback.
9. **Decisão pendente:** o que exige aprovação do criador ou revisão da equipe.

O relatório deve separar claramente fatos medidos, interpretação da Nyx e recomendações. Não pode exagerar resultados nem esconder incertezas.

## 6. Notificações e frequência

- Nyx pode alertar o criador quando uma evolução relevante tiver sido validada, desde que as notificações estejam habilitadas.
- Eventos críticos de segurança podem gerar alerta prioritário, seguindo ADR-0018.
- Melhorias pequenas ou rotineiras devem ser agrupadas em um resumo periódico configurável.
- O criador pode consultar relatórios anteriores, ajustar frequência, silenciar notificações ou pausar os relatórios.
- Evitar notificações repetidas, especulativas ou sem evidência suficiente.
- A Nyx não deve interromper o criador por uma mudança que ainda esteja em avaliação; pode registrar como hipótese e aguardar validação.

## 7. Autonomia e limites

Nyx pode autonomamente analisar fontes autorizadas, comparar resultados, elaborar relatórios, levantar riscos e sugerir melhorias.

Ela não pode, sem autorização adequada:
- publicar versões ou alterar produção;
- mudar permissões, políticas de privacidade ou regras de segurança;
- acessar dados privados para completar um relatório;
- aprovar sozinha mudanças que ela própria propôs;
- ocultar resultados negativos ou suprimir alertas relevantes;
- alterar seus próprios limites de acesso ou os controles do Modo Deus.

Ações externas, alterações persistentes e decisões críticas seguem os controles de aprovação e emergência definidos nos ADRs anteriores.

## 8. Relação com o Modo Deus

- O Modo Deus protege a integridade das fontes, dos relatórios e das permissões da Nyx.
- Pode bloquear um relatório ou conjunto de métricas se detectar violação de privacidade, origem não confiável ou falha de integridade.
- Nyx não pode desativar, reconfigurar ou contornar o Modo Deus.
- O Modo Deus não precisa ler conversas para validar a segurança do processo; deve trabalhar com metadados técnicos minimizados, políticas e assinaturas.
- A interface e os relatórios do Modo Deus permanecem exclusivos do criador, conforme ADR-0018.

## 9. Critérios de aceite

Antes de produção, demonstrar:
- usuário comum não consegue acessar Nyx nem seus relatórios;
- criador autenticado consegue consultar relatórios;
- fontes dos relatórios são rastreáveis e permitidas;
- nenhum conteúdo privado ou identificador de usuário aparece nos relatórios;
- evolução é comparada com baseline e testes reproduzíveis;
- regressões e incertezas são apresentadas junto com melhorias;
- alertas são configuráveis, deduplicados e não excessivos;
- Nyx não publica alterações nem amplia suas próprias permissões;
- Modo Deus consegue bloquear fonte ou relatório que viole os ADRs de privacidade;
- relatórios distinguem evidência medida, interpretação e recomendação.

## 10. Estado

Este ADR define o papel e os requisitos dos relatórios da Nyx. **O acompanhamento automatizado, a coleta de métricas agregadas, o painel de relatórios, os alertas e a integração da Nyx ainda não estão implementados.** A implementação depende dos controles de identidade, privacidade e telemetria dos ADRs-0018 a 0020.
