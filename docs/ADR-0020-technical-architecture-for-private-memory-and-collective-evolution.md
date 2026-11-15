# ADR-0020 — Arquitetura Técnica de Memória Individual e Evolução Coletiva Protegida

- **Status:** proposta técnica aprovada para planejamento; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0009, ADR-0016, ADR-0018 e ADR-0019.
- **Decisão:** separar tecnicamente o plano de dados pessoais de cada usuário do plano de métricas e evolução coletiva. Nyx só poderá consumir informações que atravessem um gateway de privacidade e sejam aprovadas para análise coletiva.

## 1. Objetivo e princípios

Transformar a regra de privacidade imutável do ADR-0019 em fronteiras técnicas verificáveis.

Princípios obrigatórios:
1. isolamento por usuário/tenant desde a entrada até armazenamento, recuperação, processamento e exclusão;
2. minimização de dados por padrão;
3. negação por padrão para qualquer fluxo não explicitamente autorizado;
4. separação de credenciais, serviços, bancos e permissões entre memória individual e telemetria coletiva;
5. nenhum acesso de criador, equipe ou Nyx ao conteúdo privado por meio do painel de evolução;
6. possibilidade de auditar, testar e comprovar as fronteiras.

## 2. Planos separados

### 2.1 Plano de memória individual

Responsável por:
- armazenar preferências e memórias da Nero daquele usuário;
- recuperar somente o contexto pertencente à conta e sessão autorizadas;
- aplicar controles de acesso, retenção, exportação, correção e exclusão;
- manter versões e permitir reversão de alterações de memória;
- impedir que dados de uma conta sejam incluídos no contexto de outra.

Requisitos:
- toda consulta de memória deve carregar uma identidade autenticada e um tenant validado no servidor;
- o tenant nunca pode ser aceito apenas a partir de um identificador enviado livremente pelo cliente;
- consultas devem filtrar por tenant no próprio limite de armazenamento, não apenas na camada visual;
- chaves de criptografia e políticas de acesso devem limitar o impacto de uma falha;
- logs não devem copiar o conteúdo das memórias;
- prompts, resumos, embeddings e caches derivados continuam sendo dados potencialmente pessoais e seguem os mesmos controles.

### 2.2 Plano de telemetria e evolução coletiva

Responsável por:
- coletar eventos técnicos estritamente necessários;
- validar eventos contra um esquema permitido;
- remover identificadores diretos e campos livres;
- agregar resultados em grupos com tamanho mínimo;
- aplicar proteção adicional contra inferência e reidentificação;
- publicar conjuntos aprovados para análise da Nyx e relatórios de equipe.

Este plano não terá credenciais para consultar o banco de memória individual. O banco de memória não terá uma função de exportação em massa para o plano coletivo.

## 3. Fluxo de dados permitido

1. Nero atende o usuário usando o contexto isolado da conta.
2. Componentes autorizados emitem eventos técnicos mínimos, como versão, tipo de funcionalidade, latência, categoria de erro e resultado de avaliação.
3. Um coletor valida o evento contra uma lista de campos permitidos; campos desconhecidos são rejeitados.
4. Um gateway de privacidade aplica minimização, normalização, supressão de valores raros e remoção de identificadores.
5. Um agregador reúne eventos em grupos que satisfaçam limiares definidos para o caso de uso.
6. Uma avaliação de risco verifica possibilidade de reidentificação, inferência ou reconstrução de conteúdo.
7. Quando apropriado, são aplicadas técnicas como privacidade diferencial, com parâmetros e orçamento documentados.
8. Apenas o conjunto aprovado é disponibilizado à Nyx para análise.
9. Nyx produz hipóteses, métricas e propostas de melhoria; não recebe acesso ao banco de memória nem ao fluxo bruto de conversas.
10. Propostas passam por sandbox, testes, revisão e implantação gradual conforme ADR-0018 e ADR-0019.

Se qualquer etapa falhar, o conjunto não é liberado. A falha deve reduzir a disponibilidade da análise coletiva, nunca enfraquecer a privacidade.

## 4. Esquema permitido e dados proibidos

O coletor deve usar allowlist estrita. Exemplos de campos potencialmente permitidos, conforme necessidade:
- versão do aplicativo, serviço e modelo;
- identificador não pessoal de funcionalidade;
- categoria padronizada de erro;
- duração em faixas, não timestamps de atividade individual desnecessários;
- resultado agregado de teste;
- contadores de uso em intervalos e grupos suficientemente grandes.

Não permitir no fluxo coletivo:
- texto de prompt, resposta, conversa ou feedback livre;
- nomes, e-mails, telefones, IDs de conta, IPs ou identificadores persistentes de dispositivo;
- localização precisa, contatos, notificações ou dados de outros aplicativos;
- imagens, PDFs, áudio, anexos, transcrições ou diagramas;
- memórias, perfis, preferências pessoais ou histórico de uma pessoa;
- embeddings, vetores, resumos ou tokens derivados de conteúdo privado;
- credenciais, tokens de sessão, chaves ou segredos.

A lista é restritiva: novos campos exigem avaliação de finalidade, privacidade e segurança antes de serem permitidos.

## 5. Acesso da Nyx e da equipe

- Nyx recebe somente datasets aprovados pelo gateway, com esquema, finalidade, período, tamanho do grupo e versão de transformação documentados.
- Nyx não recebe credenciais de banco, acesso de shell, consultas livres, logs brutos ou endpoint para recuperar conversas.
- O painel do criador/equipe apresenta indicadores agregados, resultados de testes e propostas; não oferece busca por usuário ou navegação por sessões.
- Acesso administrativo à infraestrutura não deve implicar acesso automático ao conteúdo. Segredos e permissões devem ser separados por função.
- Relatórios pequenos ou raros devem ser suprimidos para evitar inferência sobre uma pessoa.
- Toda liberação de dataset deve ter trilha de auditoria de quem/qual serviço acessou, finalidade, versão e parâmetros de privacidade.

## 6. Memória, personalização e exclusão

- A memória individual deve ser armazenada em namespace/partição lógica segura por tenant, com autorização verificada no servidor.
- O contexto enviado ao modelo deve conter apenas dados da sessão e da conta autenticadas, no limite necessário à tarefa.
- Não usar memórias individuais para fine-tuning, treinamento coletivo ou avaliação compartilhada por padrão.
- A exclusão solicitada pelo usuário deve alcançar memória primária, caches, índices vetoriais, cópias derivadas e backups conforme política de retenção documentada.
- Dados agregados já liberados devem ser avaliados quanto à possibilidade de contribuição identificável. Quando não for possível retirar uma contribuição com segurança, não coletar dados individuais identificáveis para essa finalidade.
- Mudanças de modelo ou prompt não podem alterar silenciosamente memórias ou preferências pessoais.

## 7. Aprimoramento do modelo e das capacidades

A evolução geral deve priorizar:
- testes sintéticos escritos por especialistas;
- benchmarks de capacidade e segurança;
- casos de regressão reproduzíveis sem dados pessoais;
- feedback voluntário estruturado e tratado pelo gateway;
- métricas agregadas com risco de reidentificação avaliado.

Não iniciar treinamento ou fine-tuning com conversas privadas como atalho para melhoria. Qualquer técnica futura que envolva dados de usuários exigirá uma decisão de arquitetura separada, finalidade explícita, avaliação de impacto, controles legais e técnicos, transparência e opção adequada ao usuário. O fato de dados estarem agregados ou pseudonimizados não basta, isoladamente, para autorizar treinamento.

## 8. Controles de segurança

- autenticação forte e autorização no servidor;
- segregação de serviços, contas de serviço, credenciais e redes;
- criptografia em trânsito e em repouso;
- rotação de segredos e menor privilégio;
- validação de esquema e limites de taxa;
- proteção contra prompt injection e conteúdo não confiável nos eventos;
- logs de auditoria sem conteúdo privado;
- testes automatizados de isolamento entre tenants;
- testes de extração, inferência, reidentificação e membership inference quando aplicável;
- monitoramento de alterações no gateway, allowlists e políticas;
- artefatos e transformações versionados, revisados e assinados.

## 9. Papel do Modo Deus

Conforme ADR-0018, Modo Deus:
- verifica a integridade do gateway, allowlists, políticas e assinaturas;
- bloqueia publicação de dataset quando houver campos não permitidos, falha de validação ou risco não resolvido;
- pode congelar a análise coletiva e colocar o pipeline em quarentena;
- emite ao criador alerta técnico minimizado, sem expor conteúdo privado;
- não possui uma chave mestra para ler memórias ou conversas;
- não pode relaxar os limites do gateway nem conceder a Nyx acesso ao plano individual.

A aplicação dessas regras deve depender também de controles determinísticos e permissões de infraestrutura, não somente da decisão do agente.

## 10. Fases de implementação

**Fase 1 — Fundação de privacidade**
- definir modelo de identidade, tenant e autorização;
- mapear todos os locais de memória, cache, logs e anexos;
- estabelecer política de retenção, exclusão e exportação;
- criar testes automatizados de isolamento.

**Fase 2 — Telemetria segura**
- definir esquema mínimo de eventos;
- implementar coletor com allowlist e rejeição de campos livres;
- separar armazenamento e credenciais;
- criar agregação com limiares e supressão de grupos raros.

**Fase 3 — Gateway e auditoria**
- implementar avaliação de risco e, quando adequado, privacidade diferencial;
- versionar transformações e parâmetros;
- registrar auditoria minimizada;
- testar reidentificação e vazamento.

**Fase 4 — Análise da Nyx**
- fornecer apenas datasets aprovados;
- gerar relatórios agregados e hipóteses;
- usar benchmarks sintéticos para validar propostas;
- bloquear qualquer caminho de acesso direto à memória.

**Fase 5 — Melhoria controlada**
- revisão técnica, segurança e privacidade;
- aprovação humana para alterações críticas;
- rollout gradual, monitoramento e rollback;
- verificar que personalizações individuais permanecem intactas.

## 11. Critérios de aceite

A arquitetura só pode avançar para produção quando:
- uma conta não consegue consultar memória de outra, mesmo manipulando requisições;
- Nyx não possui caminho técnico para consultar conversas ou memórias individuais;
- o painel administrativo não permite pesquisar conteúdo privado;
- eventos com texto livre, identificadores ou campos inesperados são rejeitados;
- grupos pequenos e resultados raros são suprimidos;
- riscos de reidentificação e inferência são testados e documentados;
- exclusão alcança índices e cópias derivadas conforme política;
- a análise coletiva funciona com dados sintéticos e agregados;
- a interrupção do gateway bloqueia a liberação de novos datasets;
- o Modo Deus consegue congelar o fluxo sem obter acesso ao conteúdo protegido.

## 12. Estado

Este ADR é uma especificação técnica. **Nenhum dos serviços, bancos segregados, gateway de privacidade, agregador, privacidade diferencial, painel ou integração de análise da Nyx descritos aqui está implementado.** A construção deve começar pela fundação de identidade, autorização, isolamento e ciclo de vida dos dados, antes de habilitar qualquer evolução coletiva.
