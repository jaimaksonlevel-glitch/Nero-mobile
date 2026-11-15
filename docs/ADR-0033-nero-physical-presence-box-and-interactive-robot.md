# ADR-0033 — Nero Física: caixa inteligente e robô interativo

- **Status:** Proposta aprovada para prototipagem por etapas; implementação pendente.
- **Data:** 2026-11-15
- **Branch:** `feature/ai-foundation`

## Contexto

O criador definiu que a Nero terá uma presença física além do aplicativo móvel. A direção escolhida é desenvolver primeiro uma caixa inteligente de voz (**Nero Box**) e evoluir depois para um robô de mesa expressivo e interativo (**Nero Robot**). A experiência desejada é interativa: voz, respostas sonoras, rosto digital, expressões e movimentos, com expansão gradual para interação ambiental autorizada.

O objetivo não é criar uma inteligência independente por dispositivo. Os dispositivos são interfaces físicas diferentes para o mesmo serviço Nero Core, mantendo identidade, memória individual e permissões consistentes.

## Decisão

### 1. Linha de produto em duas etapas

**Fase 1 — Nero Box (primeiro protótipo)**

Uma caixa de som inteligente de mesa, compacta e modular, capaz de:

- conversar por voz com o Nero Core;
- reproduzir respostas em áudio com voz configurável;
- captar comandos por microfones com cancelamento de eco e redução de ruído adequados;
- indicar visualmente estados como inicialização, escuta autorizada, processamento, fala, mudo, erro e desconexão;
- conectar-se por Wi-Fi e, quando útil, Bluetooth;
- executar funções locais limitadas e informar claramente quando estiver offline;
- aceitar botão físico de ação e botão físico de silenciar microfones, com indicação inequívoca do estado de mudo;
- receber atualizações autenticadas e assinadas, com recuperação para versão aprovada.

**Fase 2 — Nero Robot**

Evolução modular da Nero Box, acrescentando:

- tela ou painel facial para olhos, boca e expressões;
- cabeça móvel com movimentos suaves e limitados;
- servomotores com limites físicos, proteção contra travamento e desligamento seguro;
- sensores ambientais somente quando houver finalidade, permissão e indicação explícitas;
- futuras peças móveis, como braços, apenas após análise mecânica e testes de segurança.

A Nero Box deve ser projetada com interfaces e alimentação que permitam a evolução sem refazer o núcleo de áudio e conectividade.

### 2. Arquitetura lógica

- **Nero Core:** mantém a inteligência conversacional e serviços remotos, com autenticação, autorização e isolamento de usuários.
- **Dispositivo local:** controla áudio, indicadores, botões, conectividade e periféricos; mantém somente dados locais estritamente necessários.
- **Camada de dispositivo:** cada unidade tem identidade criptográfica própria, credenciais revogáveis e atualização autenticada.
- **Canal de comunicação:** tráfego criptografado, autorização por dispositivo/usuário, proteção contra repetição e limites de requisição.
- **Modo offline:** comandos locais previamente definidos e estados de indisponibilidade; o dispositivo não deve fingir que acessou a nuvem ou executou uma ação remota.
- **Sincronização:** memória pessoal permanece vinculada à conta e às regras de privacidade existentes; não se cria memória compartilhada entre usuários ou dispositivos sem autorização.

### 3. Plataforma de prototipagem

A plataforma inicial recomendada para a prova de conceito é um **Raspberry Pi** ou computador de placa única equivalente, por oferecer mais flexibilidade para áudio, rede, interface e evolução robótica do que um microcontrolador isolado.

Configuração de referência a validar:

- Raspberry Pi 5 (4 GB ou superior conforme carga) como computador principal;
- armazenamento microSD de boa qualidade para protótipo; avaliar SSD para uso contínuo;
- microfone USB ou matriz de microfones compatível com Linux;
- alto-falante de faixa completa com amplificador adequado;
- botão físico de ação e chave/botão de mute de hardware;
- anel LED ou pequeno conjunto de LEDs para estados;
- fonte estável e dimensionada para picos de consumo;
- gabinete de mesa com ventilação e proteção mecânica;
- conexão Wi-Fi; Ethernet para bancada e diagnóstico.

Um ESP32 pode ser avaliado posteriormente como controlador auxiliar de LEDs, botões e sensores simples, mas não deve ser tratado como substituto automático do computador principal para reconhecimento de fala e integração avançada.

A seleção definitiva de placas, microfones, amplificadores, fontes e motores depende de disponibilidade, custo, compatibilidade, consumo e testes de áudio/mecânica. Nenhum componente foi comprado ou validado por esta decisão.

### 4. Voz, escuta e privacidade

- O microfone deve ter estado visível e controlável; um botão físico deve silenciá-lo eletricamente ou por mecanismo confiável, e não apenas por software.
- Não haverá gravação contínua oculta nem transmissão contínua de áudio ambiente para a nuvem.
- Palavra de ativação, se adotada, deve ser detectada localmente sempre que tecnicamente possível; somente o trecho necessário após ativação explícita poderá seguir o fluxo de processamento autorizado.
- Áudio enviado para transcrição ou processamento remoto deve ter finalidade, retenção e controles documentados.
- O dispositivo deve indicar quando está escutando, processando, transmitindo ou com microfone silenciado.
- O usuário pode pausar, desconectar, revogar o dispositivo e apagar dados locais por um procedimento documentado.
- O dispositivo não deve inferir consentimento para gravar outras pessoas presentes no ambiente.

### 5. Expressões e movimento

- A primeira versão usa indicadores luminosos e respostas sonoras; a segunda acrescenta rosto digital.
- Expressões devem comunicar estados operacionais reais e estados conversacionais sem fingir percepção que o dispositivo não possui.
- Movimento deve ser suave, silencioso dentro do possível e limitado por software e hardware.
- Motores devem ter limites de curso, proteção contra sobrecorrente, prevenção de esmagamento/pontos de pinçamento e parada física.
- Sensores de câmera, presença ou ambiente não são requisito da primeira versão; qualquer inclusão futura exige finalidade, autorização, indicação e avaliação de privacidade.
- A presença física não altera identidade, memória, personalidade, permissões ou salvaguardas da Nero.

### 6. Relação com Nyx e Rafael

- Nero Box e Nero Robot expõem somente as personalidades e funções autorizadas para a conta autenticada.
- Nyx e Rafael não se tornam acessíveis a outros usuários por existirem no hardware; a exclusividade de Nyx e Rafael para o criador continua server-side.
- A personalidade ou modo conversacional não aumenta permissões de microfone, câmera, rede, sensores, arquivos ou ações externas.
- O Rafael pode receber eventos técnicos minimizados de integridade do dispositivo, sem acesso irrestrito ao áudio ou às conversas privadas.
- O desligamento de emergência e a revogação de dispositivo definidos nos ADRs anteriores prevalecem sobre modos, automações e atualizações.

### 7. Segurança física e operacional

- Fonte, bateria (se houver), temperatura, ventilação, cabos e gabinete precisam de dimensionamento e ensaios adequados.
- Não usar motores ou mecanismos móveis no primeiro protótipo de áudio.
- Atualizações devem ser autenticadas, assinadas e reversíveis para uma versão aprovada.
- Não armazenar chaves de provedor de IA no dispositivo ou no aplicativo; usar credenciais de dispositivo limitadas e revogáveis.
- A caixa deve ter botão físico para silenciar microfones e desconexão/energia acessível.
- Nenhuma ação sobre fechaduras, portões, alarmes, eletrodomésticos ou outros sistemas físicos será habilitada sem integração oficial, autorização específica, confirmação apropriada e avaliação de risco.

## Plano de prototipagem

1. **POC de bancada:** inicializar o computador, conectar Wi-Fi, testar microfone, alto-falante, botão de mute e LEDs.
2. **Ciclo de voz:** implementar captura por ação/wake local aprovado, detecção de voz, envio seguro ao backend, resposta e TTS; medir latência e qualidade em ruído.
3. **Integração Nero Core:** autenticação do dispositivo, autorização, sessões, tratamento de falhas, revogação e modo offline limitado.
4. **Nero Box alfa:** gabinete sem mecanismos móveis, indicadores claros, botão físico de mute e testes prolongados de estabilidade/temperatura.
5. **Rosto digital:** protótipo de tela e expressões após estabilizar o áudio.
6. **Nero Robot:** adicionar cabeça móvel e, depois, outros mecanismos somente após análise de risco, limites físicos e testes de segurança.

## Critérios de aceite

- Botão físico de mute impede captação de áudio de forma verificável e indica claramente o estado.
- Nenhum áudio ambiente é transmitido antes da ativação autorizada.
- Usuário consegue identificar escuta, processamento, fala, mute, offline e erro.
- Dispositivo autentica-se individualmente e pode ser revogado sem afetar outros dispositivos/contas.
- Falhas de rede não são apresentadas como ações concluídas; respostas e operações remotas informam seu estado real.
- Nenhum segredo de provedor fica embutido no firmware, app ou repositório.
- Atualizações são autenticadas e possuem caminho de recuperação.
- Testes avaliam ruído, eco, latência, estabilidade, temperatura, consumo e comportamento de falha.
- Funções de câmera, sensores e motores permanecem desativadas até avaliação e autorização específicas.
- Privacidade e isolamento por usuário são validados antes de qualquer piloto com terceiros.

## Fora do escopo desta decisão

- Produto comercial certificado ou pronto para venda.
- Escuta ambiente contínua e oculta.
- Reconhecimento biométrico de pessoas ou identificação de vozes por padrão.
- Câmera, vigilância de ambiente e monitoramento de terceiros.
- Controle autônomo de fechaduras, portões, veículos ou equipamentos perigosos.
- Robô móvel autônomo.
- Garantia de funcionamento offline equivalente ao Nero Core.

## Estado de implementação

Este ADR define a direção e o plano de prototipagem. Nenhum hardware foi comprado, montado, compilado ou testado; não existe Nero Box ou Nero Robot funcional neste momento. A compatibilidade dos componentes e a arquitetura de áudio ainda precisam de prova de conceito.

## Relação com outros ADRs

- ADR-0001 a ADR-0007: wake word, captura de áudio e avaliação de runtime.
- ADR-0009 e ADR-0010: agentes, permissões e integrações móveis.
- ADR-0011 a ADR-0014: identidade visual, expressões e interação.
- ADR-0017 a ADR-0029: emergência, segurança, privacidade e governança.
- ADR-0032: proteção sem vigilância e autonomia do usuário.
