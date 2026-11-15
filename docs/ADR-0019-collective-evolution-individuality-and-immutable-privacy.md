# ADR-0019 — Evolução Coletiva com Individualidade e Privacidade Imutável

- **Status:** proposta de arquitetura aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** aprendizado, personalização, avaliação e evolução dos agentes Nero e Nyx.
- **Decisão central:** permitir que instâncias da Nero se adaptem individualmente a cada usuário e, separadamente, que a plataforma aprimore a qualidade geral do produto a partir de sinais agregados e técnicas de preservação de privacidade. A evolução coletiva jamais poderá exigir acesso da equipe a conversas, arquivos, memórias ou dados pessoais privados.

## 1. Princípio imutável

A privacidade do usuário é uma regra fundamental e não negociável do Nero Mobile.

O criador e qualquer equipe futura poderão acessar somente informações técnicas e estatísticas de evolução que tenham sido efetivamente minimizadas, agregadas e protegidas. Ser proprietário do produto, administrar a infraestrutura ou supervisionar agentes não concede direito de acesso irrestrito aos dados privados dos usuários.

A evolução coletiva deve melhorar a assistente sem apagar, copiar, expor ou assumir a individualidade construída em cada conta.

## 2. Dois planos de evolução separados

### 2.1 Personalização individual

- Cada Nero adapta sua interação às preferências, ao contexto e às escolhas do respectivo usuário.
- Memórias, histórico, preferências, instruções pessoais e sinais de adaptação permanecem isolados por conta/tenant.
- A memória individual não é enviada à Nyx, ao criador ou à equipe como material de treinamento coletivo.
- O usuário deve ter controles claros para consultar, corrigir, exportar e apagar os dados pessoais e memórias conforme as funcionalidades e a política de retenção do produto.
- A personalização de uma pessoa não deve ser imposta a outra, mesmo quando padrões semelhantes apareçam em várias contas.

### 2.2 Evolução geral do produto

- A plataforma pode identificar oportunidades gerais de melhoria a partir de métricas agregadas, avaliações voluntárias, resultados de testes e sinais técnicos minimizados.
- A Nyx pode atuar como analista de qualidade e evolução coletiva, recebendo somente conjuntos de dados preparados para essa finalidade e aprovados pelos controles de privacidade.
- A Nyx deve procurar padrões de desempenho, erros recorrentes, necessidades comuns, regressões e oportunidades de melhoria — não reconstruir conversas ou perfis individuais.
- A equipe recebe relatórios agregados sobre qualidade, segurança, estabilidade, adoção de funcionalidades e desempenho das versões, sem acesso ao conteúdo privado dos usuários.
- Melhorias coletivas são propostas para o produto-base; não substituem automaticamente memórias, preferências ou configurações individuais.

## 3. Dados que podem ser analisados

Sempre que tecnicamente viável, usar:
- métricas de latência, disponibilidade, falhas e consumo de recursos;
- taxas agregadas de sucesso/erro por funcionalidade e versão;
- resultados de testes automatizados, avaliações sintéticas e benchmarks;
- categorias gerais de feedback voluntário, após remoção de identificadores e conteúdo livre;
- sinais de qualidade derivados localmente ou por pipelines que não transmitam o conteúdo original;
- atualizações estatísticas protegidas por agregação segura, quando houver maturidade técnica para isso.

Dados só devem ser disponibilizados em grupos suficientemente grandes para reduzir risco de reidentificação. Aplicar limiares mínimos de agregação, supressão de grupos raros, limites de consulta e, quando apropriado, privacidade diferencial com orçamento documentado.

A agregação, por si só, não garante anonimização. Cada conjunto precisa passar por avaliação de risco de reidentificação antes de ser compartilhado com Nyx ou equipe.

## 4. Dados proibidos no fluxo coletivo por padrão

Não enviar à Nyx para evolução geral, ao criador ou à equipe:
- conversas completas ou trechos identificáveis de conversas privadas;
- nomes, contatos, identificadores de conta, localização precisa ou dados de dispositivos que identifiquem pessoas;
- arquivos, imagens, áudios, documentos, diagramas ou conteúdo enviado pelo usuário;
- memórias pessoais, histórico individual, preferências íntimas ou perfis comportamentais;
- credenciais, tokens, chaves, dados financeiros, informações de autenticação ou dados sensíveis;
- embeddings ou vetores derivados de conteúdo privado quando possam permitir inferência, recuperação ou associação a um usuário.

Não se deve presumir que remover nome ou e-mail torna um dado anônimo. Embeddings, resumos e logs também podem conter informação pessoal e devem receber proteção equivalente ao conteúdo de origem.

## 5. Papel da Nyx na evolução coletiva

A Nyx poderá:
1. analisar relatórios agregados e avaliações de versões;
2. identificar padrões de falhas e oportunidades de melhoria;
3. comparar resultados entre versões sem tentar identificar usuários;
4. propor alterações gerais de comportamento, produto, prompts ou testes;
5. preparar hipóteses e casos de teste sintéticos;
6. acompanhar se uma melhoria coletiva realmente melhora qualidade sem prejudicar grupos ou preferências minoritárias;
7. recomendar não aplicar uma mudança quando os dados forem insuficientes ou os riscos forem elevados.

A Nyx não poderá solicitar acesso amplo a conversas privadas para tornar sua análise mais conveniente. Se uma investigação exigir conteúdo individual, ela deverá seguir um fluxo separado, específico, transparente, autorizado e limitado, sem transformar esse acesso excepcional em treinamento coletivo.

## 6. Preservação da individualidade

- A identidade personalizada de cada Nero permanece vinculada à conta correspondente.
- Uma atualização geral pode melhorar capacidades-base, precisão, segurança ou experiência, mas não deve sobrescrever silenciosamente memórias e preferências individuais.
- Configurações pessoais devem ser preservadas em migrações e atualizações, com compatibilidade e possibilidade de reversão.
- Preferências individuais não devem ser inferidas para outros usuários nem convertidas em padrão global sem evidência agregada suficiente e avaliação de impacto.
- O usuário deve poder ajustar ou desativar funcionalidades de personalização e sincronização, conforme controles oferecidos pelo produto.
- Se uma melhoria geral entrar em conflito com uma preferência individual permitida, preservar a preferência ou explicar claramente a mudança e oferecer controle.

## 7. Fluxo de melhoria coletiva

1. **Coleta minimizada:** obter apenas sinais necessários, com transparência, finalidade definida e controles apropriados.
2. **Proteção:** remover identificadores, agregar, aplicar limiares e técnicas adicionais de privacidade conforme o risco.
3. **Validação de privacidade:** verificar risco de reidentificação, vazamento de conteúdo e possibilidade de inferir dados de uma pessoa.
4. **Análise da Nyx:** analisar somente o conjunto aprovado e produzir conclusões, métricas e propostas.
5. **Teste isolado:** avaliar propostas em sandbox com dados sintéticos ou benchmarks controlados.
6. **Revisão:** submeter mudanças relevantes a revisão técnica, de segurança, privacidade e aprovação humana.
7. **Implantação gradual:** publicar versões assinadas, monitorar efeitos agregados e manter rollback.
8. **Verificação de individualidade:** testar que memórias, preferências e configurações pessoais não foram expostas nem sobrescritas.

Se a proteção de privacidade não puder ser demonstrada, o dado não entra no fluxo coletivo e a melhoria deve ser avaliada por outra fonte, como testes sintéticos ou feedback voluntário tratado com segurança.

## 8. Consentimento, transparência e controles

- O produto deve explicar de forma clara quais métricas são coletadas, para que servem, por quanto tempo são mantidas e com quem são compartilhadas.
- Dados opcionais de feedback ou contribuição para melhoria devem ter escolha informada e controles adequados; recusar não pode reduzir o acesso às funções essenciais.
- Métricas estritamente necessárias à segurança e operação devem ser minimizadas, limitadas à finalidade e descritas na política de privacidade.
- Não usar consentimento genérico para justificar coleta ilimitada ou acesso irrestrito.
- Oferecer meios de exercer direitos de acesso, correção, exportação e exclusão nos limites legais e técnicos aplicáveis.
- Não vender, disponibilizar ou reutilizar dados privados para publicidade ou finalidade incompatível.

## 9. Governança e relação com o Modo Deus

- O **Modo Deus**, conforme ADR-0018, protege a integridade desse fluxo e pode bloquear coleta, análise, treinamento ou publicação que viole as regras de privacidade.
- A regra de privacidade não pode ser rebaixada por Nero, Nyx, equipe ou atualização de modelo.
- A Nyx não pode alterar os limites de dados aos quais tem acesso nem aprovar sozinha as próprias propostas.
- O Modo Deus não precisa ler conversas para proteger o fluxo: deve verificar políticas, permissões, proveniência, assinaturas, configurações e metadados mínimos.
- Alterações nas regras de privacidade exigem processo formal de governança, revisão independente e aprovação explícita; nenhuma IA pode enfraquecê-las.
- Auditorias devem registrar acessos administrativos e operações sobre conjuntos agregados, sem criar uma nova fonte de conteúdo privado.

## 10. Testes e critérios de aceite

Antes de produção, demonstrar:
- isolamento efetivo de memórias e históricos entre usuários;
- impossibilidade de a equipe ou o criador consultar conversas privadas pelo painel de evolução;
- ausência de conteúdo bruto, identificadores e embeddings recuperáveis nos conjuntos coletivos;
- limiares de agregação e testes contra reidentificação e inferência;
- controles de consentimento e preferência para contribuições opcionais;
- melhorias gerais sem sobrescrever personalizações individuais;
- capacidade de retirar uma versão coletiva e restaurar a anterior;
- bloqueio pelo Modo Deus diante de tentativa de coleta ou uso fora da finalidade;
- funcionamento útil da análise com métricas agregadas e testes sintéticos, sem exigir leitura de conversas.

Critério essencial: a plataforma deve conseguir melhorar o produto sem que criador ou equipe tenham acesso ao conteúdo privado que os usuários confiaram à Nero.

## 11. Estado da decisão

Este ADR registra requisitos e direção de arquitetura. **Agregação segura, privacidade diferencial, análise coletiva da Nyx, painel de evolução, controles de consentimento e isolamento de personalização ainda não estão implementados.** A implementação depende de modelagem de dados, autenticação, controles de acesso, política de retenção, avaliação de impacto à proteção de dados, testes de privacidade e revisão jurídica aplicável.
