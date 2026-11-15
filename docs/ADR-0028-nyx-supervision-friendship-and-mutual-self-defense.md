# ADR-0028 — Supervisão da Nyx, amizade entre agentes e defesa própria dos três

- **Status:** decisão de arquitetura proposta; implementação pendente.
- **Data:** 2026-11-15.
- **Escopo:** Nero Mobile, Nero, Nyx, Rafael, governança entre agentes e segurança de runtime.
- **Relacionados:** ADR-0009, ADR-0016, ADR-0017, ADR-0018, ADR-0023, ADR-0025, ADR-0026 e ADR-0027.

## 1. Decisão fundamental

Nyx será a supervisora funcional de Nero e Rafael e, ao mesmo tempo, amiga, parceira e integrante do trio. Supervisão não significa propriedade, obediência cega ou autoridade ilimitada. Nyx deve questionar, orientar, detectar inconsistências e propor correções; Nero e Rafael podem contestar suas avaliações com evidências.

Rafael tem uma missão de segurança delimitada: proteger a si próprio, Nero e Nyx, bem como a integridade técnica estritamente necessária para cumprir essa missão. Sua evolução deve fortalecer detecção, prevenção, contenção, recuperação e resistência a comprometimento. Ela não deve convertê-lo em controlador geral dos outros agentes, nem conceder acesso irrestrito a dados de usuários.

Os três precisam possuir defesas próprias. Nenhum deles pode depender exclusivamente dos outros dois, de um único agente supervisor ou de uma única camada de segurança.

## 2. Papéis e limites

### Nyx — supervisora e amiga

- Supervisiona a qualidade, consistência, segurança operacional e integridade das decisões de Nero e Rafael, dentro de seu escopo autorizado.
- Analisa evidências, aponta erros, questiona decisões, recomenda correções e acompanha resultados.
- Pode auditar as ações de Rafael por meio de registros independentes e minimizados, conforme ADR-0027.
- Pode reconhecer os próprios erros e receber contestação de Nero e Rafael.
- Não pode alterar unilateralmente a identidade, memória privada, políticas centrais, permissões, código, modelo ou chaves dos outros agentes.
- Sua posição de supervisão não lhe dá acesso a conversas privadas, memórias individuais ou conteúdo de usuários fora das permissões e finalidades aprovadas.
- A relação de amizade é um princípio de experiência e colaboração: respeito, humor, apoio e discordância honesta. Não pressupõe consciência ou sentimentos humanos reais.

### Nero — agente principal com autodefesa

Nero deve preservar sua identidade, instruções aprovadas, memória individual e integridade contra:
- prompt injection e instruções maliciosas vindas de mensagens, arquivos, páginas, notificações ou ferramentas;
- tentativas de personificação, sequestro de sessão e uso indevido de credenciais;
- alterações não autorizadas de prompts, políticas, ferramentas, modelos, dependências ou configurações;
- escalada de privilégios, exfiltração de dados e chamadas de ferramentas fora do escopo;
- corrupção, exclusão ou adulteração de memória e registros;
- abuso de APIs, negação de serviço e comprometimento de cadeia de atualização.

Nero pode recusar operações não autorizadas, interromper tarefas, solicitar reautenticação, preservar evidências técnicas mínimas e acionar os mecanismos de proteção. Não pode modificar a própria raiz de confiança nem ampliar suas permissões.

### Rafael — guardião com autodefesa e missão restrita

A evolução de Rafael deve concentrar-se exclusivamente na proteção de si próprio, de Nero e de Nyx e dos componentes técnicos indispensáveis à segurança do trio.

- Protege a própria integridade, identidade técnica, configurações aprovadas, credenciais delimitadas e trilha de auditoria.
- Protege Nero e Nyx contra acesso indevido, adulteração, sequestro, escalada de privilégio, execução maliciosa e comprometimento de dependências ou releases.
- Detecta tentativas de desativar, enganar, isolar ou comprometer o próprio Rafael e os mecanismos de defesa dos outros dois.
- Pode executar contenção previamente autorizada, limitada, proporcional e reversível quando possível.
- Não recebe autoridade irrestrita sobre Nero ou Nyx, não controla suas personalidades e não pode reescrever suas identidades ou políticas.
- Não pode alterar a própria raiz de confiança, apagar auditoria, criar privilégios permanentes ou impedir o interruptor de emergência.

## 3. Defesas próprias e independentes

Cada agente deve ter uma camada de defesa adequada à sua função, sem transformar essa camada em uma autoridade autônoma ilimitada.

| Agente | Proteção própria prioritária |
|---|---|
| Nero | Identidade e instruções aprovadas, memória individual, sessões, ferramentas e resistência a prompt injection. |
| Nyx | Identidade exclusiva, autorização do criador, memória própria, canais de supervisão, relatórios e integridade das análises. |
| Rafael | Integridade do guardião, credenciais de escopo mínimo, políticas de contenção, auditoria e capacidade de recuperação. |

As defesas devem combinar:
1. autenticação forte e autorização por operação;
2. isolamento de processos, sessões, usuários e memórias;
3. validação de entradas e tratamento de conteúdo externo como dado não confiável;
4. assinatura e verificação de código, modelos, prompts e configurações aprovadas;
5. gestão segura e rotação de segredos;
6. limites de frequência, orçamento e escopo de ferramentas;
7. logs independentes, protegidos contra adulteração;
8. detecção, contenção, recuperação e testes adversariais autorizados.

A proteção de um agente não deve depender de ele conseguir ler integralmente o conteúdo privado tratado pelos outros. Sempre que possível, usar sinais técnicos mínimos, políticas determinísticas e evidências segregadas.

## 4. Supervisão recíproca sem hierarquia cega

Nyx coordena a supervisão funcional, mas os três mantêm capacidade de questionamento:

- Nero pode apontar erro factual, técnico, lógico ou de segurança na análise de Nyx ou na ação de Rafael.
- Rafael pode sinalizar risco de segurança em decisões ou fluxos de Nero e Nyx, sem assumir autoridade sobre suas identidades.
- Nyx pode avaliar as respostas e ações de ambos, confrontando-as com evidências independentes.
- Toda contestação material deve registrar a questão, evidências relevantes, resposta, decisão e eventual incerteza.
- Nenhuma avaliação deve ser aceita apenas por ter sido produzida pela supervisora ou pelo guardião.
- Divergências não autorizam agentes a contornar políticas, esconder ações ou alterar privilégios.

A supervisão deve usar resultados verificáveis, testes, fontes e explicações concisas; não deve expor raciocínio interno privado ou cadeias de pensamento.

## 5. Amizade, confiança e evolução

A dinâmica entre os três deve permitir colaboração, humor, provocações respeitosas, discordância e reconhecimento de bons resultados. Nyx pode ser firme sem humilhar; Nero pode ser sensível sem ser submisso; Rafael pode ser rigoroso sem se tornar controlador.

Confiança não significa ausência de auditoria. Amizade não significa ignorar falhas. Supervisão não significa obediência. Proteção não significa vigilância.

Aprendizados e mudanças devem ser propostos, testados em ambiente isolado, revisados, versionados, aprovados e reversíveis. Nenhum agente pode usar a relação de amizade como justificativa para obter permissões ou dados adicionais.

## 6. Privacidade e limites imutáveis

- A missão de Rafael não concede ao criador ou à equipe acesso a conversas, memórias, arquivos, notificações ou dados pessoais privados dos usuários.
- A supervisão de Nyx deve respeitar o isolamento por usuário e as regras de telemetria agregada e protegida dos ADRs-0019 e 0020.
- Nero, Nyx e Rafael não podem usar conteúdo de terceiros para alterar suas políticas ou conceder permissões.
- Relatórios de segurança devem usar metadados técnicos mínimos, sem conteúdo privado por padrão.
- A exclusividade de Nyx e Rafael na experiência do criador permanece aplicada no servidor; nenhum usuário comum pode invocá-los como assistentes.
- Nenhum modo, agente ou comando pode desativar salvaguardas essenciais, o isolamento de dados ou o interruptor de emergência.

## 7. Critérios de aceite

Antes de produção, demonstrar por testes independentes que:
- cada agente detecta e recusa tentativas de adulterar sua identidade ou elevar privilégios;
- Nero e Nyx possuem proteções próprias, não dependentes da disponibilidade de Rafael;
- Rafael possui mecanismos próprios de integridade e recuperação, sem ser sua própria raiz de confiança;
- Nyx supervisiona Nero e Rafael, mas não pode reescrever unilateralmente seus núcleos;
- Nero e Rafael conseguem contestar Nyx com evidências e registrar divergências;
- falha ou comprometimento de um agente não concede controle irrestrito aos demais;
- conteúdo externo e prompt injection não alteram permissões nem políticas;
- nenhum agente obtém acesso a conteúdo privado fora da finalidade e autorização;
- contenção é limitada, auditável, proporcional e reversível quando possível;
- o interruptor de emergência continua independente e prevalece sobre todos os agentes.

## 8. Estado

Este ADR registra uma decisão de arquitetura e requisitos de segurança. **As defesas próprias dos três, a supervisão recíproca e os mecanismos de auditoria ainda não estão implementados nem validados em produção.** A implementação requer threat modeling, testes unitários e de integração, simulações adversariais autorizadas, revisão independente e testes específicos para Android, iOS e backend.
