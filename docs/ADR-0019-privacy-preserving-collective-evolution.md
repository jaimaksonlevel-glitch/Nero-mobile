# ADR-0019 — Evolução Coletiva com Privacidade e Individualidade

- **Status:** proposta de arquitetura aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** aprendizado, personalização, supervisão da Nyx, telemetria e governança de dados no Nero Mobile.
- **Decisão central:** permitir que padrões úteis de evolução observados em várias instâncias da Nero contribuam para melhorias gerais do produto, sem expor dados pessoais ou apagar a individualidade construída em cada conta. A privacidade do usuário é uma regra imutável.

## 1. Princípio inviolável de privacidade

A privacidade do usuário não é negociável e não pode ser enfraquecida por objetivos de evolução, conveniência operacional, solicitações do criador, decisões da equipe ou ações de qualquer agente.

- O criador e qualquer futura equipe não terão acesso a conversas privadas, mensagens, arquivos, imagens, áudio, documentos, localização, contatos, credenciais ou memórias individuais dos usuários por meio dos painéis de evolução.
- Não haverá painel de leitura de conversas, busca por usuário, reprodução de sessões ou exportação de históricos privados para o criador/equipe.
- Nenhuma IA poderá usar a privacidade como variável de otimização ou criar exceções ocultas.
- Acesso excepcional a conteúdo, se algum recurso futuro realmente exigir, deverá ser tratado em fluxo separado, com finalidade específica, transparência, base legítima, autorização adequada, escopo mínimo, auditoria e retenção limitada. Não será concedido por padrão nem pelo simples fato de alguém ser criador ou administrador.
- O sistema deve coletar o mínimo necessário. Se uma métrica não for necessária para segurança ou melhoria do produto, não deve ser coletada.

## 2. Duas camadas de evolução

O produto distingue claramente:

### 2.1 Evolução individual da Nero

Cada conta terá uma instância lógica/personalizada da Nero, que poderá adaptar estilo de comunicação, preferências, contexto e memória conforme os recursos habilitados e as escolhas daquele usuário.

- Memórias, histórico, preferências e contexto pessoal pertencem ao escopo daquela conta.
- A individualidade não será exportada para outras contas nem misturada em um perfil coletivo.
- O aprendizado individual não poderá revelar a identidade, hábitos ou conteúdo privado do usuário ao criador, à equipe ou a outros usuários.
- O usuário deve ter controles claros para consultar, corrigir, exportar e excluir os dados pessoais conforme os recursos e a legislação aplicável.
- Uma atualização global não deve sobrescrever silenciosamente a personalidade individual, preferências ou memória da Nero daquela conta.

### 2.2 Evolução geral do produto

Padrões técnicos e comportamentais úteis podem orientar melhorias comuns para todas as instâncias, desde que sejam derivados de forma compatível com privacidade.

Exemplos de sinais agregados possíveis:
- taxa de respostas consideradas úteis por categoria ampla;
- tipos de erro recorrentes, sem conteúdo da conversa;
- resultados de testes de qualidade e segurança;
- métricas de latência, falhas e uso de ferramentas;
- estratégias de resposta que passaram por avaliação com dados sintéticos ou autorizados;
- feedback voluntário do usuário convertido em sinal minimizado, sem expor o texto original.

A agregação não deve servir como justificativa para coletar tudo. Métricas e eventos precisam ter finalidade, prazo de retenção e acesso definidos.

## 3. Papel da Nyx na evolução coletiva

A Nyx poderá atuar como analista de evolução do produto, examinando relatórios técnicos agregados, conjuntos de avaliação sintéticos e sinais estatísticos minimizados de múltiplas instâncias da Nero.

- Ela identifica padrões recorrentes, oportunidades de melhoria, regressões e diferenças de desempenho entre versões.
- Pode propor melhorias gerais de raciocínio, qualidade, segurança, experiência, eficiência e consistência.
- Pode comparar resultados entre grupos apenas quando houver tamanho mínimo e proteção contra reidentificação.
- Não recebe acesso aos diálogos brutos, memórias individuais, arquivos, identificadores ou perfis privados para fazer essa análise.
- Não deve tentar reconstruir conversas, inferir a identidade de usuários ou reidentificar grupos.
- A Nyx produz recomendações e evidências agregadas; não publica mudanças diretamente em produção.

A supervisão da Nyx não transforma o criador em controlador das conversas individuais. O que chega ao criador é a análise do comportamento do produto, não a vida privada dos usuários.

## 4. Proteção contra reidentificação

“Anonimizado” não deve ser usado como rótulo superficial. Antes de qualquer relatório sair do ambiente isolado de dados, devem ser avaliados riscos de reidentificação e inferência.

Controles previstos:
- agregação por grupos com tamanho mínimo definido e testado;
- supressão de grupos raros, categorias pequenas e combinações que possam identificar alguém;
- remoção de identificadores diretos e indiretos;
- limites de consulta e proteção contra ataques por diferenças entre relatórios;
- avaliação de privacidade diferencial quando apropriada, com orçamento de privacidade documentado;
- retenção curta para eventos técnicos e eliminação programada;
- testes de reidentificação e revisão independente antes de liberar novos relatórios.

Se não for possível demonstrar proteção suficiente, o dado não será disponibilizado ao criador/equipe nem usado para evolução coletiva.

## 5. Fluxo de evolução geral

1. Coletar somente eventos e métricas estritamente necessários, com transparência e controles apropriados.
2. Separar dados por conta/tenant e manter memórias individuais em armazenamento isolado.
3. Transformar sinais permitidos em métricas agregadas ou conjuntos sintéticos; remover ou suprimir material que possa identificar usuários.
4. Aplicar avaliação de risco de reidentificação e privacidade.
5. A Nyx analisa apenas os resultados aprovados para análise coletiva.
6. Nyx propõe uma alteração versionada com hipótese, benefício esperado, riscos e critérios de reversão.
7. Executar testes em sandbox com dados sintéticos ou conjuntos autorizados e minimizados.
8. O Modo Deus verifica integridade, privacidade, permissões, segurança e conformidade com as regras imutáveis.
9. Mudanças críticas exigem aprovação humana; implantação gradual, monitoramento e rollback.
10. Cada instância da Nero recebe apenas a melhoria geral aprovada, sem substituir a memória ou preferências individuais.

## 6. Papel do Modo Deus como guardião imutável

O Modo Deus protege a privacidade e a integridade desse fluxo.

- A regra de privacidade é parte de sua política de confiança e não pode ser relaxada pela Nyx, pela Nero, pelo criador, por uma equipe ou pelo próprio Modo Deus.
- O Modo Deus deve bloquear qualquer tentativa de enviar conteúdo privado ou identificadores para análise coletiva fora do fluxo aprovado.
- Pode congelar uma coleta, relatório, treinamento ou publicação quando houver dúvida sobre origem, consentimento, minimização, integridade ou risco de reidentificação.
- Pode colocar em quarentena uma evolução que tente misturar memórias individuais ou enfraquecer isolamento entre contas.
- Não pode criar exceções para si próprio, conceder acesso irrestrito ou modificar unilateralmente as regras de privacidade.
- Mudanças na implementação dos controles de privacidade exigem revisão independente, testes e aprovação explícita do criador; nenhuma aprovação pode autorizar violação da lei ou dos direitos dos usuários.
- A aplicação dos direitos dos usuários e dos requisitos legais prevalece sobre metas de produto.

O Modo Deus é guardião técnico, não uma promessa de segurança absoluta. A proteção depende também de arquitetura, controles de acesso, criptografia, testes, auditoria e governança.

## 7. Transparência e controles do usuário

- A política de privacidade deve explicar, em linguagem clara, quais métricas são coletadas, para quais finalidades e por quanto tempo.
- O usuário deve poder controlar recursos opcionais de telemetria e contribuição para melhoria, respeitando a base legal aplicável e os requisitos do produto.
- Desativar contribuição opcional não pode reduzir direitos, degradar artificialmente a assistência essencial ou impedir acesso ao serviço sem justificativa legítima.
- Preferências, memória e individualidade da Nero devem permanecer separadas da contribuição para métricas coletivas.
- O usuário deve ter meios de corrigir e excluir dados pessoais nos limites legais, sem que relatórios agregados permitam reconstruir seu histórico.

## 8. Painel do criador e da equipe

O painel administrativo poderá apresentar somente indicadores aprovados, por exemplo:
- quantidade total de instalações/contas ativas em faixas agregadas;
- qualidade geral por versão e categoria ampla;
- taxas de falha, latência e incidentes;
- padrões de erro recorrentes em forma estatística;
- melhorias propostas, resultados de testes, riscos e histórico de versões;
- estado dos controles de privacidade e segurança.

O painel não poderá mostrar:
- conversas ou transcrições individuais;
- nome, e-mail, telefone ou identificador de usuário associado a comportamento;
- memória, preferências íntimas ou perfil individual;
- documentos, fotos, áudio, notificações ou mensagens privadas;
- relatórios de grupo pequeno que permitam inferir a identidade de alguém.

## 9. Critérios de aceite

Antes de produção, demonstrar:
- isolamento efetivo entre memórias e dados de contas diferentes;
- impossibilidade de o painel do criador consultar conversas privadas;
- análise da Nyx baseada apenas em dados agregados/sintéticos aprovados;
- proteção contra reidentificação, inclusive por consultas repetidas;
- bloqueio de dados não permitidos pelo Modo Deus;
- contribuição opcional e transparente quando aplicável;
- atualização geral sem sobrescrever a individualidade de cada Nero;
- testes de exclusão, retenção, exportação e controles do usuário;
- trilha de auditoria para acesso administrativo e mudanças de política;
- revisão de segurança e privacidade independente antes da implantação.

## 10. Estado da decisão

Este ADR registra requisitos e arquitetura pretendida. **Agregação protegida, análise coletiva da Nyx, painel do criador, controles de contribuição e guardião Modo Deus ainda não estão implementados.** Não afirmar que dados estão anonimizados ou protegidos antes de testes técnicos e revisão independente.
