# ADR-0031 — Programa Alpha fechado com criador e dez participantes

- **Status:** proposta aprovada para planejamento; implementação pendente.
- **Data:** 2026-11-15.
- **Relacionados:** ADR-0010, ADR-0019, ADR-0020, ADR-0021, ADR-0023, ADR-0028, ADR-0029 e ADR-0030.

## 1. Objetivo

Definir o primeiro programa de testes reais do Nero Mobile: o criador atua como usuário Alpha principal e pode convidar até dez participantes para experimentar versões controladas do aplicativo.

O Alpha é fechado por convite. Não é lançamento público, não é ambiente de produção e não autoriza acesso irrestrito a dados dos participantes.

## 2. Perfis de acesso

### 2.1 Criador / usuário Alpha principal

- Tem acesso ao Nero Mobile experimental e às funcionalidades liberadas para o Alpha.
- Pode testar diretamente Nero, Nyx e Rafael, conforme os controles de autenticação e disponibilidade.
- Pode convidar, suspender e remover participantes do grupo de testes.
- Recebe relatórios técnicos e agregados sobre qualidade, estabilidade, segurança e evolução da supervisão.
- Não recebe acesso automático a conversas, arquivos, memórias, notificações ou dados pessoais dos participantes.

### 2.2 Participantes convidados

- Limite inicial: dez contas individuais, além da conta do criador.
- A entrada exige convite e ativação da própria conta.
- Cada participante usa Nero como única personalidade de assistente visível.
- Nyx e Rafael não são apresentados como assistentes, interfaces ou personas acessíveis aos participantes.
- Funcionalidades experimentais podem ser habilitadas gradualmente e revogadas.
- Cada participante pode consultar as informações de privacidade, controlar permissões, enviar feedback e sair do programa.
- A participação não implica consentimento genérico para coleta, gravação ou compartilhamento de conteúdo privado.

### 2.3 Nyx — supervisão interna

- Nyx supervisiona a qualidade e a segurança das instâncias Nero por meio de sinais técnicos e dados autorizados, minimizados e protegidos.
- Pode identificar padrões de erro, regressões, inconsistências, falhas de segurança e oportunidades de melhoria.
- Pode produzir relatórios agregados para o criador, com métricas, amostras sintéticas, severidade, confiança, versões e recomendações.
- Não pode pesquisar ou abrir conversas individuais, memórias, arquivos, imagens, áudios, notificações ou identificadores dos participantes.
- Não pode usar o papel de supervisora para contornar o isolamento de dados ou as regras de privacidade.
- Qualquer mecanismo futuro de avaliação com conteúdo de usuário exige finalidade específica, transparência, autorização adequada e revisão de privacidade independente; não é habilitado por este ADR.

### 2.4 Rafael — proteção transversal

- Aplica as regras de integridade, autorização, isolamento e contenção definidas nos ADRs anteriores.
- Protege participantes e agentes sem receber acesso irrestrito ao conteúdo privado.
- Pode bloquear ou suspender funcionalidades experimentais diante de risco técnico relevante, com resposta proporcional e auditável.
- Não pode ampliar o grupo, conceder privilégios ou alterar políticas fundamentais por conta própria.

## 3. Isolamento e simplicidade operacional

O Alpha inicial não precisa de organizações, departamentos, hierarquias corporativas ou administração multiempresa.

Isso **não elimina o isolamento por usuário**. Cada conta deve ter identificador próprio e autorização server-side; memórias, sessões, arquivos, tokens e permissões permanecem segregados. O criador e os demais participantes não podem consultar os dados uns dos outros.

O backend mantém uma lista de convites e participantes autorizados, com limite configurável de dez participantes ativos. Convites devem ser únicos, expirar, ser revogáveis e não conceder acesso até que a pessoa conclua a ativação.

## 4. Dados e feedback do Alpha

Dados permitidos para acompanhamento agregado, após minimização:
- disponibilidade, latência, falhas e erros por versão;
- uso de funcionalidades em contagens agregadas;
- categorias de feedback voluntário;
- resultados de testes sintéticos e benchmarks;
- tipos de incidentes e resultados de controles, sem conteúdo privado;
- métricas agregadas de qualidade, consistência e regressões.

Dados proibidos no painel do criador e nos relatórios da Nyx:
- texto de conversas e respostas individuais;
- nomes, e-mails, telefones e identificadores diretos;
- arquivos, fotos, PDFs, áudio e transcrições;
- notificações, contatos, localização e credenciais;
- memórias pessoais e embeddings ou resumos recuperáveis;
- links que permitam reconstruir a atividade de uma conta específica.

Relatórios devem aplicar limiares mínimos de agregação e supressão de grupos pequenos. Com apenas dez participantes, métricas muito segmentadas podem identificar alguém; nesses casos, apresentar apenas totais do grupo, ocultar o recorte ou usar resultados sintéticos. Não chamar dados de anônimos sem avaliação de risco de reidentificação.

## 5. Consentimento, transparência e controle

Antes de entrar, cada participante deve receber explicação clara de:
- caráter experimental e funcionalidades instáveis;
- dados estritamente necessários à operação e métricas agregadas;
- serviços externos envolvidos, quando aplicável;
- permissões de voz, notificações e outras integrações;
- como enviar feedback, revogar permissões, sair e solicitar exclusão;
- limitações de segurança e ausência de garantia de detecção perfeita.

Microfone, notificações, câmera, arquivos, localização e overlay permanecem desligados até autorização específica no sistema operacional e no aplicativo. Sem gravação ambiente oculta ou coleta silenciosa.

## 6. Gestão do grupo

- O criador administra convites e vagas.
- Participantes podem sair a qualquer momento.
- Contas podem ser suspensas ou removidas, com trilha técnica mínima.
- Convites não devem ser publicados nem reutilizados.
- Não compartilhar credenciais entre participantes.
- Limitar taxa de convites, tentativas de ativação e sessões.
- O limite de dez participantes pode ser alterado somente por decisão explícita do criador e revisão do plano de privacidade/capacidade.

## 7. Critérios de aceite do Alpha

Antes de convidar participantes:
1. Autenticação individual e autorização server-side implementadas.
2. Isolamento entre contas testado automaticamente.
3. Convites únicos, expiráveis e revogáveis.
4. Nyx e Rafael inacessíveis como personas aos participantes.
5. Painel e relatórios do criador sem conteúdo privado ou identificadores individuais.
6. Telemetria allowlist, minimizada e agregada, com supressão de grupos pequenos.
7. Aviso de privacidade e consentimentos por funcionalidade apresentados antes da ativação.
8. Controles para revogar permissões, sair e solicitar exclusão.
9. Rate limits, monitoramento, logs minimizados e procedimento de resposta a incidentes.
10. Plano de rollback e canal de feedback funcionando.

Se algum critério crítico falhar, o Alpha permanece restrito ao criador até correção e reteste.

## 8. Limites do que este ADR autoriza

Este ADR autoriza planejar um grupo fechado de até dez participantes; não cria contas, não envia convites e não publica uma versão.

Não autoriza:
- acesso do criador às conversas privadas dos participantes;
- acesso direto dos participantes à Nyx ou Rafael;
- treinamento de modelos com conversas privadas;
- ativação automática de microfone, notificações ou outras permissões;
- lançamento público, cobrança ou promessa de disponibilidade;
- considerar o sistema seguro apenas porque os testes Alpha não encontraram falhas.

## 9. Próximo passo

Implementar primeiro a Fase 0 do ADR-0030, acrescentando autenticação individual, lista de convites fechados, isolamento por usuário, telemetria minimizada e painel agregado do Alpha. Só depois convidar os dez participantes.
