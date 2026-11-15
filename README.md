# Nero Mobile

Aplicativo móvel do assistente Nero, da Level Engenharia.

## Identidade e experiência

- Android e iOS com Expo / React Native.
- Ativação planejada: palavra de ativação **“Nero”** (Wake).
- Personalidade **Hybrid**: técnico e objetivo em engenharia; natural e próximo em conversas.
- Idioma: português do Brasil.
- Interface de chat com estados de envio, resposta e erro.

## Estado do projeto

A versão 0.3.0 mantém a síntese de fala local opcional (VOZ ON/OFF) e adiciona entrada de voz por gravação manual: o usuário toca no microfone para iniciar, toca novamente para parar e recebe a transcrição no campo de mensagem para revisar antes de enviar. O microfone só é solicitado após o toque do usuário; não há gravação em segundo plano nem escuta contínua. A etapa de integração web adiciona pesquisa opcional na internet pela ferramenta `web_search` da Responses API, com links das fontes exibidos na conversa. O aplicativo recebe a resposta e as citações do backend e permite abrir cada fonte. A pesquisa é escolhida pelo modelo quando a pergunta exige informação atual ou fontes.

**Ainda não significa que o Nero esteja conectado ou implantado.** Para obter respostas reais, é necessário configurar e implantar o backend e definir `EXPO_PUBLIC_NERO_API_URL` no ambiente de build do Expo.

Ainda não estão implementados: palavra de ativação contínua, execução em segundo plano, memória persistente, análise de arquivos/imagens e módulos de engenharia. A entrada de voz envia a gravação ao backend para transcrição e depende de chave válida e serviço implantado. A pesquisa web depende de chave válida, modelo compatível, acesso à API e implantação do backend. A síntese de fala local está implementada, mas ainda precisa ser testada em aparelho Android e iOS.

## Estrutura

- `App.tsx`: interface e fluxo de conversa.
- `src/config/persona.ts`: identidade e princípios do Nero.
- `src/services/neroApi.ts`: cliente HTTP do aplicativo.
- `server/index.mjs`: backend Node.js que mantém a chave do provedor fora do aplicativo.

## Backend (ambiente privado de desenvolvimento)

Requisitos: Node.js 20 ou superior.

1. Entre na pasta `server`.
2. Defina a variável de ambiente `OPENAI_API_KEY` no ambiente do servidor.
3. Opcionalmente defina `OPENAI_MODEL` (padrão: `gpt-6-astra`) e `PORT` (padrão: `8787`).
4. Execute `npm start`.

O backend usa a API Responses com a ferramenta hospedada `web_search` e o endpoint `/transcribe` com o modelo `gpt-transcribe`; nunca exige que a chave do provedor seja colocada no aplicativo. Quando a pesquisa é usada, as citações retornadas pela API são apresentadas como links na conversa. A ferramenta pode realizar acesso à internet em tempo real e pode gerar custos adicionais de API. O endpoint inclui limite básico de tamanho e frequência. **Não publique este endpoint na internet antes de adicionar autenticação por usuário, proteção contra abuso, observabilidade e política de privacidade.** O limite em memória é apenas uma proteção inicial, não substitui controles de produção.

Configure `EXPO_PUBLIC_NERO_API_URL` com a URL HTTPS do backend no ambiente de build do aplicativo. Não coloque segredos em variáveis `EXPO_PUBLIC_*`.

## Segurança e privacidade

- Nunca inserir chaves de API no código do aplicativo ou no repositório.
- A gravação só começa após toque explícito e permissão do sistema; não há microfone em segundo plano nem wake word nesta versão.\n- O áudio gravado é enviado ao backend para transcrição; não usar gravações de clientes sem consentimento e política de retenção definida.
- Antes de uso real com dados de clientes, implementar autenticação, retenção mínima, exclusão de dados e controles de acesso.
- Respostas técnicas devem apresentar premissas e alertar quando exigirem validação profissional, normas aplicáveis e ART.

## Próximas etapas

1. Validar build e execução em Android.
2. Implantar backend privado com autenticação e configuração de segredos.
3. Implementar fala para texto e resposta falada.
4. Avaliar wake word on-device com permissões, indicador e desligamento fácil.
5. Implementar upload seguro e análise de imagens/PDFs.
6. Construir módulos de engenharia: cálculos, dimensionamento, projetos, diagnósticos e orçamentos.
7. Adicionar memória configurável e sincronização entre dispositivos.
