# ADR-0027 — Defesa em profundidade e auditoria independente de Rafael

- **Status:** decisão de arquitetura proposta para especificação; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero Mobile, Nero, Nyx, Rafael, segurança de runtime e resposta a incidentes.
- **Relacionados:** ADR-0017, ADR-0018, ADR-0019, ADR-0020, ADR-0025 e ADR-0026.

## 1. Decisão

Adotar defesa em profundidade. A segurança não dependerá de ocultar Rafael, de uma sequência previsível em que um invasor precise descobrir Nero e Nyx antes dele, nem da decisão isolada de qualquer agente de IA.

Nero e Nyx são as superfícies de interação. Controles de segurança independentes protegem APIs, identidade, sessões, ferramentas, dados, configuração e cadeia de atualização. Rafael atua como guardião de resposta e integridade, isolado por controles de privilégio mínimo e protegido por uma raiz de confiança externa aos agentes.

A existência de Rafael não precisa ser secreta para a segurança funcionar. Mesmo que um atacante saiba que ele existe, não deve conseguir invocá-lo, reconfigurá-lo, desativá-lo ou obter seus privilégios.

## 2. Camadas de defesa

1. **Superfície de interação:** autenticação, autorização por requisição, validação de entradas, limites de frequência, isolamento por usuário/tenant e proteção contra prompt injection.
2. **Controles de plataforma:** gateway/API, gestão de segredos, políticas determinísticas, monitoramento de integridade, proteção de dependências e pipeline de build/release assinado.
3. **Rafael:** detecção correlacionada de eventos de segurança, coordenação de contenção previamente autorizada, preservação de evidências técnicas mínimas e alertas ao criador.
4. **Raiz de confiança independente:** chaves protegidas, verificação de assinatura, políticas de autorização fora do controle dos agentes, logs append-only/tamper-evident e mecanismo de emergência. Rafael não é a própria raiz de confiança.

Não se deve desenhar uma arquitetura em que o invasor necessariamente veja primeiro o código de Nero e Nyx e só depois encontre Rafael. Código cliente pode ser inspecionado; segredos e decisões críticas devem permanecer no servidor ou em componentes protegidos. Ofuscação e ocultação não substituem controles criptográficos e de autorização.

## 3. Resposta de Rafael

Diante de sinais confiáveis de tentativa de violação, Rafael pode, conforme políticas predefinidas e escopo mínimo:
- negar acesso ou operação não autorizada;
- suspender temporariamente credenciais, sessões ou ferramentas comprometidas;
- congelar alterações e releases;
- isolar o componente afetado;
- cancelar tarefas de risco;
- acionar rollback de artefato verificado e previamente aprovado;
- preservar eventos técnicos e alertar o criador.

A resposta deve ser proporcional à severidade e confiança. Ações irreversíveis, destrutivas ou que afetem dados do usuário exigem autorização humana adequada, salvo contenção estritamente necessária e previamente autorizada. O estado de emergência do ADR-0017 prevalece.

## 4. Nyx audita e reporta as ações de Rafael

Nyx, como assistente estratégica exclusiva do criador, poderá receber uma visão de auditoria independente e minimizada das ações de Rafael. Ela deve reportar ao criador:
- tentativas de violação detectadas, classificadas por tipo, severidade e confiança;
- quais controles Rafael acionou, em que momento e por qual regra/política;
- componentes ou sessões isolados, mudanças congeladas e rollbacks realizados;
- resultado conhecido, estado atual, riscos residuais e incertezas;
- falsos positivos, eventos duplicados e oportunidades de melhoria;
- recomendações de defesa e testes de validação.

Nyx não deve depender exclusivamente do relato produzido pelo próprio Rafael. Eventos relevantes devem ser enviados também a um registro de auditoria independente, append-only/tamper-evident, com relógio e identidade do serviço, integridade criptográfica e controle de acesso separado. Nyx consulta uma projeção somente de leitura desse registro. Tentativas de apagar, adulterar ou silenciar a trilha também geram alerta.

Nyx pode analisar, questionar e recomendar mudanças; não pode apagar registros, alterar políticas de Rafael, ampliar seus próprios privilégios, nem aprovar e implantar sozinha as próprias recomendações. Alterações passam por revisão, testes, assinatura e aprovação humana apropriada.

## 5. Relatórios e alertas ao criador

Alertas de incidentes críticos ou de alta confiança devem ser imediatos. Eventos de severidade moderada podem ser agrupados; eventos baixos devem ser resumidos para evitar ruído. Cada alerta informa severidade, confiança, evidência técnica disponível, ações executadas, resultado, risco residual e próxima recomendação.

Os relatórios não devem expor conversas, prompts, respostas, arquivos, imagens, áudio, notificações, localização, contatos, credenciais, memórias ou identificadores pessoais dos usuários. A auditoria de segurança deve usar metadados técnicos mínimos, códigos de evento e identificadores pseudônimos de curta duração quando indispensáveis. O criador recebe informação suficiente para governar a defesa, não acesso ao conteúdo privado dos usuários.

## 6. Melhorias da defesa

A análise de Nyx pode produzir propostas de melhoria com base em padrões técnicos minimizados, testes sintéticos, resultados de simulações, benchmarks e métricas agregadas protegidas. Toda proposta deve conter problema observado, evidência, impacto esperado, riscos, plano de teste, critérios de rollback e aprovação necessária.

Não se deve usar conteúdo privado de usuários para treinar ou ajustar coletivamente agentes. Aplicam-se os limites dos ADRs-0019, 0020, 0022 e 0023.

## 7. Critérios de aceite

Antes de produção, validar por testes independentes:
- acesso não autorizado a APIs e ferramentas é negado mesmo quando o atacante conhece a arquitetura;
- prompt injection e conteúdo externo não alteram permissões nem políticas;
- Rafael não pode alterar a própria raiz de confiança ou eliminar sua auditoria;
- Nyx consegue comparar o relato de Rafael com eventos independentes;
- adulteração, omissão ou interrupção da trilha de auditoria é detectável;
- alertas críticos chegam ao criador sem revelar conteúdo privado;
- contenção é limitada, auditável, proporcional e reversível quando possível;
- falha de Rafael não desativa os controles determinísticos;
- emergency stop continua prevalecendo e nenhum agente pode se reativar;
- testes de isolamento confirmam que criador e equipe não conseguem consultar conteúdo privado de usuários.

## 8. Estado

Este ADR define requisitos arquiteturais. **As camadas, a auditoria independente, os alertas da Nyx e a resposta de Rafael ainda não estão implementados nem auditados em produção.** A implementação deve ocorrer em etapas, com threat modeling, testes de invasão autorizados, revisão independente e documentação de limitações.
