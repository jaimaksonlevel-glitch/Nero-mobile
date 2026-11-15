# ADR-0024 — Nero Shield: proteção digital inteligente

- **Status:** proposta aprovada para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero e Nyx, com o mesmo modelo de permissões e proteção para todos os usuários.

## Contexto e decisão

Nero e Nyx devem oferecer uma camada de proteção digital semelhante a um antivírus moderno, ampliada para riscos de engenharia social, phishing, fraude, arquivos maliciosos, links perigosos e tentativas de comprometer contas, dispositivos ou dados.

O nome do conjunto será **Nero Shield**. Ele é uma camada de defesa em profundidade integrada ao produto, não uma promessa de imunidade nem um substituto automático do antivírus, das proteções do sistema operacional, de backups ou do julgamento do usuário.

Nenhum produto consegue detectar todos os ataques. A interface deve comunicar limites, evidências e grau de confiança, sem declarar um dispositivo “100% seguro”.

## Princípios e paridade

1. Nero e Nyx usam as mesmas capacidades, permissões, fontes de inteligência e regras de proteção. A personalidade não concede privilégios técnicos.
2. A proteção é habilitada e explicada de forma transparente; o usuário pode consultar, pausar integrações e revogar permissões.
3. Análise local é preferida quando tecnicamente viável. Conteúdo privado não é enviado a serviços externos para análise sem base legal, transparência e autorização apropriada.
4. Conteúdo recebido — mensagens, páginas, QR codes, arquivos, imagens e documentos — é dado não confiável. Não pode alterar instruções, conceder permissões nem autorizar ações.
5. Alertas distinguem evidência observada, indicador, hipótese e conclusão. Exibem nível de confiança, gravidade, motivo e próximos passos.
6. Proteção não é vigilância: sem captura oculta de tela, microfone, câmera, notificações, localização, tráfego ou arquivos; sem acesso fora das permissões e finalidade autorizadas.
7. O usuário mantém controle. Ações destrutivas ou externas — apagar arquivos, bloquear contatos, denunciar pessoas, alterar credenciais, desinstalar apps, enviar dados ou isolar recursos — não são executadas automaticamente apenas por uma suspeita.
8. Nero Shield não substitui as proteções nativas do Android/iOS nem promete acesso de baixo nível que os sistemas não oferecem a aplicativos comuns.

## Superfícies de risco cobertas

### 1. Links, sites e navegação
- Detectar URLs suspeitas, domínios imitadores, homógrafos, encurtadores, redirecionamentos, certificados inválidos quando observáveis e padrões de phishing.
- Consultar serviços de reputação/listas de ameaça aprovados, com atualização, origem, data e política de privacidade documentadas.
- Alertar sobre páginas falsas de login, pagamentos, suporte técnico, lojas e carteiras digitais.
- Não inserir credenciais, códigos de autenticação ou dados de pagamento em páginas suspeitas.
- A reputação de um domínio é um sinal, não uma prova definitiva; domínios novos e comprometidos podem escapar da detecção.

### 2. Arquivos e anexos
- Avaliar tipo real do arquivo, extensão, tamanho, hash, assinatura e indicadores de conteúdo perigoso.
- Integrar um mecanismo antimalware mantido e licenciado adequadamente (por exemplo, serviço de varredura local/servidor aprovado), com atualização de assinaturas e verificação de integridade.
- Tratar arquivos compactados, macros, scripts, executáveis, instaladores, documentos com conteúdo ativo e arquivos poliglotas como superfícies de risco.
- Usar sandbox isolada e descartável para análise dinâmica somente quando disponível e aprovada; nunca executar conteúdo suspeito no ambiente principal do usuário.
- Arquivos criptografados, formatos não suportados e arquivos grandes podem não ser inspecionáveis; informar análise inconclusiva em vez de declarar segurança.
- Quarentena deve preservar evidências, permitir revisão e restauração controlada; exclusão definitiva exige confirmação do usuário.

### 3. Mensagens, e-mails e engenharia social
- Identificar indicadores de phishing, fraude, falsificação de identidade, pedidos urgentes de dinheiro, roubo de credenciais/códigos, falsas oportunidades, extorsão, coerção e manipulação.
- Considerar contexto, citação, humor, ficção e explicações legítimas antes de classificar.
- Não afirmar intenção criminosa nem rotular pessoas com base em um único texto.
- Nunca enviar resposta, denunciar, bloquear ou encaminhar conteúdo sem a autorização e as regras explícitas aplicáveis.
- Mensagens e notificações só podem ser analisadas quando o usuário conceder a integração correspondente; não há leitura universal de apps.

### 4. QR codes, imagens e documentos
- Extrair e inspecionar o destino de QR codes antes de recomendar abertura.
- Alertar para QR codes que redirecionem a domínios suspeitos, pagamentos ou autenticação inesperados.
- Detectar sinais visuais de páginas falsas, comprovantes adulterados e documentos potencialmente maliciosos, deixando claro que análise visual não comprova autenticidade.
- Não confiar em instruções embutidas em imagens, PDFs ou documentos.

### 5. Contas, identidade e sessões
- Orientar sobre autenticação multifator, passkeys, senhas únicas, recuperação de conta e verificação por canal independente.
- Alertar sobre pedidos de códigos OTP, tokens, chaves privadas, frases-semente ou credenciais.
- Integrar alertas de segurança de provedores somente por APIs oficiais e com autorização; nunca solicitar senha ou código para a Nero/Nyx.
- Não afirmar que uma conta foi comprometida sem evidência suficiente.

### 6. Aplicativos, permissões e dispositivo
- Oferecer auditoria explicável das permissões que o sistema operacional disponibilizar: microfone, câmera, localização, notificações, acessibilidade, arquivos e sobreposição.
- Alertar sobre permissões excessivas ou inesperadas, instalações de fontes desconhecidas e configurações inseguras quando detectáveis.
- No Android, usar apenas APIs públicas e permissões concedidas; não exigir root, explorar vulnerabilidades ou contornar o sandbox.
- No iOS, respeitar sandbox, entitlements e APIs oficiais; não prometer varredura de outros apps, monitoramento universal ou inspeção irrestrita do sistema.
- Verificar atualizações e configurações de segurança quando a plataforma permitir, recomendando correções oficiais.

### 7. Rede e ameaças emergentes
- Orientar sobre Wi-Fi público, redes falsas, DNS suspeito e conexões inseguras quando houver sinais disponíveis por APIs permitidas.
- Não prometer inspeção de todo o tráfego do dispositivo nem interceptação TLS de outros aplicativos.
- Considerar indicadores de malware, ransomware, spyware, trojans, downloads drive-by, exploração de vulnerabilidades e exfiltração.
- Conteúdo e links novos ou desconhecidos devem poder resultar em “não foi possível determinar”.

## Pipeline de decisão

1. **Entrada autorizada:** receber somente conteúdo/sinais dentro do escopo e das permissões concedidas.
2. **Normalização segura:** tratar entrada como dado não confiável; limitar tamanho, tipo, frequência e recursos.
3. **Análise em camadas:** verificações locais determinísticas, assinaturas/reputação atualizadas, heurísticas e análise contextual por IA.
4. **Correlação:** combinar sinais independentes, evitar duplicatas e considerar falsos positivos.
5. **Classificação:** severidade (informativo, baixo, médio, alto, crítico) e confiança (baixa, média, alta), com explicação.
6. **Resposta proporcional:** informar, recomendar, solicitar confirmação ou bloquear uma ação dentro da capacidade e autorização disponível.
7. **Auditoria mínima:** registrar evento técnico minimizado, decisão, versão das regras e ação; sem replicar conteúdo privado em telemetria coletiva.
8. **Reavaliação:** permitir contestação, correção de falso positivo e atualização de inteligência.

## Respostas proporcionais

- **Informativo/baixo:** orientação discreta e recomendações preventivas.
- **Médio:** aviso claro, explicação e confirmação antes de prosseguir com ação de risco.
- **Alto:** recomendação forte para não abrir/executar/compartilhar; bloquear a ação dentro do próprio fluxo protegido quando houver fundamento e autorização.
- **Crítico:** interromper ação perigosa que esteja sob controle do Nero Shield, preservar evidências mínimas, orientar contenção e solicitar intervenção do usuário. Ações remotas ou irreversíveis dependem de autorização específica.

Nunca apagar arquivos, alterar senhas, encerrar contas, bloquear contatos, denunciar pessoas ou enviar dados a terceiros por conta própria. Uma detecção incerta não justifica uma ação irreversível.

## Arquitetura e privacidade

- Criar serviço de segurança com módulos separados: URL/reputação, arquivos, conteúdo/engenharia social, auditoria de permissões e orquestração de alertas.
- Manter políticas determinísticas e assinadas independentes do modelo de IA. A IA explica e correlaciona sinais; não é a única barreira de segurança.
- Isolar análise de arquivos em sandbox com limites de CPU, memória, tempo, rede e armazenamento; sem credenciais nem acesso ao host.
- Manter feeds e assinaturas com origem, licença, versão, assinatura criptográfica, atualização segura e rollback.
- Não enviar arquivos, mensagens, imagens, áudio ou documentos privados a terceiros por padrão. Se uma verificação externa for necessária, informar o que será enviado, para qual finalidade e obter autorização apropriada.
- Telemetria para melhoria coletiva segue ADR-0019, ADR-0020 e ADR-0022: somente indicadores minimizados e agregados aprovados pelo gateway. Nyx e o criador não recebem conversas, arquivos, dados pessoais ou conteúdo bruto.
- Segredos, tokens e credenciais nunca entram em prompts, logs ou telemetria.
- Modo Deus pode verificar integridade de políticas, assinaturas, versões e permissões, e congelar um módulo comprometido; não ganha acesso irrestrito ao conteúdo privado.
- Interruptor de emergência do ADR-0017 deve desativar as funções correspondentes e impedir reativação automática.

## Limites por plataforma

### Android
- Investigar APIs oficiais para verificação de links/arquivos recebidos pelo próprio app, compartilhamento explícito, armazenamento concedido e auditoria de permissões.
- Qualquer integração de acessibilidade, VPN local, serviço em segundo plano ou overlay exige avaliação separada de necessidade, consentimento, política da loja e impacto de privacidade.
- Não alegar proteção antivírus em tempo real de todos os aplicativos ou arquivos do aparelho sem capacidade e autorização comprovadas.

### iOS
- Limitar a proteção ao conteúdo entregue ao app, integrações oficiais, extensões e capacidades explicitamente concedidas.
- Não alegar varredura geral do aparelho, inspeção de outros apps ou monitoramento universal.

## Critérios de aceite

- Testes com amostras benignas, maliciosas e desconhecidas, incluindo falsos positivos e formatos não suportados.
- Testes de phishing, homógrafos, redirecionamentos, QR codes, anexos, macros, arquivos compactados e prompt injection.
- Sandbox não permite fuga para host, acesso a segredos ou comunicação não autorizada.
- Nenhum conteúdo privado é transmitido sem transparência e autorização apropriada.
- Contas/tenants permanecem isolados; logs e métricas não revelam conteúdo privado.
- Alertas mostram motivo, confiança, severidade, limitações e próximos passos.
- Ações irreversíveis e externas exigem autorização específica.
- Atualizações de assinaturas/políticas são autenticadas, verificadas e reversíveis.
- Nero e Nyx demonstram paridade de permissões e proteções.
- Testes específicos comprovam somente capacidades realmente disponíveis em cada plataforma.
- Teste de emergência comprova desativação e bloqueio de reativação automática.

## Fases propostas

1. Threat model, inventário de dados, política de privacidade e seleção de fontes/licenças.
2. Verificador de URLs e mensagens compartilhadas explicitamente pelo usuário.
3. Varredura de arquivos importados com mecanismo antimalware e sandbox isolada.
4. QR codes, imagens, documentos e orientação de segurança de contas.
5. Auditoria de permissões e integrações oficiais Android/iOS.
6. Painel de alertas, histórico minimizado, contestação e testes adversariais.
7. Piloto controlado, métricas de falsos positivos/negativos, revisão independente e rollout gradual.

## Estado

Esta ADR registra requisitos e arquitetura proposta. **Nero Shield ainda não está implementado.** Não há mecanismo antimalware integrado, sandbox, feeds de reputação, monitoramento de dispositivo, auditoria de permissões ou proteção em tempo real. Nenhuma proteção deve ser anunciada como ativa antes de ser implementada, testada e validada em cada plataforma.
