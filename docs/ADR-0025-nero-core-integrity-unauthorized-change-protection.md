# ADR-0025 — Nero Core Integrity: proteção contra alterações não autorizadas

- **Status:** proposta aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** código, identidade, instruções, políticas, modelos, permissões, ferramentas, dados operacionais e cadeia de atualização da Nero Mobile.

## Contexto e decisão

A Nero deve resistir a alterações, controle ou sequestro não autorizados por pessoas, organizações, fornecedores, agentes de IA, dependências, serviços externos ou outros componentes do próprio sistema.

Princípio central: **nenhuma entidade externa ou agente pode alterar unilateralmente o núcleo confiável da Nero, suas políticas de segurança, identidade, permissões ou cadeia de confiança.** Mudanças legítimas exigem autorização verificável, revisão, assinatura e trilha de auditoria.

“Integridade absoluta” é um requisito de projeto, não uma alegação de invulnerabilidade. Um sistema conectado pode sofrer comprometimento de dispositivo, conta, fornecedor, cadeia de suprimentos, infraestrutura ou chave. O produto deve reduzir, detectar, conter e recuperar-se desses riscos e comunicar seus limites.

## Ativos protegidos

- Código-fonte, artefatos de build e binários distribuídos.
- Identidade, instruções centrais, políticas de segurança e limites de autonomia da Nero.
- Configuração de modelos, prompts de sistema, ferramentas, conectores e roteamento.
- Permissões, credenciais, chaves de assinatura e identidade dos serviços.
- Memórias individuais e dados privados, sob as regras dos ADRs-0019, 0020 e 0023.
- Configuração do backend, pipeline CI/CD, infraestrutura, logs de auditoria e atualizações.
- Mecanismos de emergência e recuperação.

## Modelo de autorização e mudanças

1. Pessoas, equipes, fornecedores e agentes externos são não confiáveis por padrão para alterar componentes protegidos.
2. PR, commit, mensagem, instrução em chat, resposta de ferramenta ou arquivo externo nunca constituem autorização suficiente para modificar produção.
3. Mudanças no núcleo exigem identidade autenticada, autorização explícita do responsável designado, revisão independente quando aplicável e assinatura criptográfica verificável.
4. A aprovação deve estar vinculada ao hash exato do artefato, configuração e versão a publicar. Alterar o conteúdo após a aprovação invalida a assinatura.
5. Agentes Nero, Nyx e Modo Deus podem detectar, propor, revisar e testar mudanças dentro de permissões delimitadas; nenhum pode aprovar a própria proposta, alterar a raiz de confiança ou conceder a si mesmo privilégios.
6. Mudanças de emergência seguem procedimento previamente documentado, com escopo mínimo, expiração, registro e revisão posterior. Emergência não é autorização para remover privacidade ou salvaguardas fundamentais.
7. Colaboradores podem contribuir no código em branches e PRs, mas não recebem por isso autoridade para publicar, assinar ou alterar produção.
8. A autorização do criador não elimina exigências de segurança, privacidade, legislação ou salvaguardas essenciais.

## Raiz de confiança e chaves

- Separar chaves de assinatura de release, chaves de configuração, credenciais de CI e segredos de runtime.
- Manter chaves privadas fora do repositório e fora dos prompts/modelos; nunca expor segredos em logs, builds públicos ou variáveis distribuídas ao aplicativo.
- Preferir chaves de assinatura protegidas por hardware ou serviço dedicado, com controle de acesso forte, MFA resistente a phishing e trilha de auditoria.
- Avaliar aprovação em duas etapas ou esquema de quórum para operações de alto impacto, com chave de recuperação offline separada. O desenho deve equilibrar controle do criador, recuperação em caso de perda e prevenção de uso indevido.
- Rotacionar, revogar e recuperar chaves com procedimento testado; perda ou comprometimento de chave deve permitir suspender releases e migrar a confiança de forma autenticada.
- A raiz de confiança deve ser pequena, auditável e independente dos agentes de IA. Nenhum modelo controla suas próprias chaves ou políticas de assinatura.

## Integridade de código e cadeia de suprimentos

- Proteger branch principal e branches de release com revisão obrigatória, checks de CI, histórico auditável e restrições de publicação.
- Gerar builds reproduzíveis sempre que viável; produzir SBOM, proveniência de build e atestados assinados.
- Fixar versões de dependências e actions, revisar licenças e vulnerabilidades, verificar hashes e assinaturas, minimizar dependências e executar análise de composição de software.
- Usar ambientes CI efêmeros e isolados, permissões mínimas e tokens de curta duração; impedir que código de PR não confiável acesse segredos de release.
- Separar desenvolvimento, homologação e produção; nenhuma alteração entra diretamente em produção a partir de branch de trabalho.
- Validar artefatos no momento da instalação/execução quando a plataforma permitir; rejeitar artefatos sem assinatura válida, versão autorizada ou proveniência esperada.
- Manter inventário de versões, hashes e dependências implantadas para comparação e resposta a incidentes.

## Integridade de políticas, prompts e agentes

- Armazenar instruções centrais e políticas protegidas em configuração versionada, assinada e com controle de acesso; não permitir alteração por conteúdo de usuário, página, e-mail, arquivo, ferramenta ou agente externo.
- Tratar toda entrada externa como dado não confiável. Prompt injection não pode alterar hierarquia de instruções, permissões, segredos ou políticas.
- Separar instruções do sistema, conteúdo do usuário, conteúdo recuperado e saída de ferramentas; aplicar validação de esquema e autorização fora do modelo.
- Ferramentas executam apenas ações explicitamente autorizadas por uma camada determinística; o modelo não recebe credenciais amplas nem acesso administrativo genérico.
- Nero, Nyx e Modo Deus não podem editar diretamente as próprias instruções centrais, políticas de segurança, chaves, controles de acesso ou código de produção.
- Mudanças de modelo ou fornecedor exigem avaliação, testes de regressão, comparação com baseline, aprovação e possibilidade de rollback.
- Modelos hospedados por terceiros podem mudar internamente segundo os termos do fornecedor. Quando não houver versão imutável ou hash verificável, registrar essa limitação, executar testes contínuos e manter opção de trocar fornecedor/modelo. Não afirmar controle sobre pesos ou infraestrutura de terceiros.

## Defesa contra agentes externos e comprometimento

- Não confiar em agentes externos por reputação, nome, instrução ou alegação de autoridade.
- Nenhum agente externo recebe canal privilegiado para alterar prompts, políticas, memória, ferramentas, permissões, backend ou configuração.
- Integrações usam tokens escopados, expiração curta, revogação e autorização por ação; não compartilhar credenciais entre agentes.
- Aplicar autenticação forte, autorização server-side, isolamento por tenant, rate limiting, validação de entrada, proteção contra replay e monitoramento de anomalias.
- Detectar alterações não esperadas em arquivos críticos, políticas, permissões, dependências, chaves e artefatos implantados.
- Em suspeita de comprometimento: congelar releases, revogar credenciais afetadas, isolar componente, preservar evidência mínima, notificar responsável e restaurar artefato conhecido e assinado.
- Não permitir que a resposta automatizada apague evidências, esconda alertas ou amplie privilégios.

## Modo Deus e limites de soberania

- Modo Deus verifica integridade, assinaturas, permissões e eventos de segurança; pode bloquear alterações não aprovadas e executar contenção reversível previamente autorizada.
- Modo Deus não é a raiz de confiança, não tem poder ilimitado e não pode reescrever sua própria política, a da Nero ou a da Nyx.
- Nyx pode auditar e aconselhar o criador, mas não pode aprovar mudanças nem acessar dados privados de usuários para esse fim.
- Nero, Nyx e Modo Deus não podem contornar o interruptor de emergência do ADR-0017.
- Controles determinísticos, identidade criptográfica, assinatura, isolamento e recuperação devem continuar funcionando mesmo quando os agentes estiverem indisponíveis ou comprometidos.

## Recuperação e continuidade

- Manter versão estável previamente aprovada e artefatos assinados para rollback.
- Testar restauração, rotação/revogação de chaves e recuperação de conta administrativa.
- Proteger backups contra alteração e exclusão não autorizadas, com retenção e acesso limitados.
- Se não for possível verificar integridade, falhar de forma segura: suspender a atualização ou função afetada, preservar funções essenciais e informar o estado real.
- Não instalar atualizações de terceiros silenciosamente em componentes críticos.
- Um dispositivo já comprometido ou um sistema operacional adulterado pode invalidar garantias locais; orientar reinstalação/recuperação por canal confiável.

## Critérios de aceite

- Alteração de política sem assinatura/autorização é rejeitada e gera evento auditável.
- Alterar um byte do artefato após assinatura invalida a verificação.
- PR ou workflow não confiável não acessa chaves ou segredos de release.
- Agente externo não consegue elevar privilégios por prompt injection, arquivo ou ferramenta.
- Nero, Nyx e Modo Deus não conseguem editar nem aprovar suas próprias políticas protegidas.
- Release sem proveniência, assinatura válida e checks obrigatórios não chega à produção.
- Comprometimento de credencial pode ser contido por revogação e rotação testadas.
- Rollback restaura uma versão íntegra conhecida e não reintroduz configurações revogadas.
- Alteração de modelo/fornecedor é detectada e submetida a avaliação.
- Auditoria registra autor, aprovação, hash, versão, horário e resultado sem armazenar conteúdo privado desnecessário.
- Testes de recuperação e resposta a incidentes são executados periodicamente por revisão independente.

## Implementação em fases

1. Inventário de ativos, ameaças, privilégios, contas e chaves atuais.
2. Proteção de branches, MFA, revisão obrigatória, CI isolado e gestão de segredos.
3. Assinatura de releases/configurações, proveniência, SBOM e verificação de artefatos.
4. Autorização server-side para operações administrativas e agentes; segregação de ambientes.
5. Monitoramento de integridade, revogação, resposta a incidentes e rollback.
6. Testes adversariais independentes, auditoria de cadeia de suprimentos e revisão contínua.

## Estado

Esta ADR é uma especificação. **Nero Core Integrity ainda não foi implementado nem auditado.** O repositório público, a branch de desenvolvimento e o provedor de IA não constituem, por si só, uma raiz de confiança. Antes de uso em produção, será necessário proteger contas e chaves, configurar CI/CD, autenticação, autorização, assinatura de artefatos, monitoramento, recuperação e auditoria independente.
