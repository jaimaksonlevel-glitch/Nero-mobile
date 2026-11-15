# Nero API — fundação inicial

Este serviço é o backend inicial do Nero Mobile. Ele mantém a chave da OpenAI no servidor e fornece os endpoints de conversa, pesquisa web e transcrição.

## Requisitos

- Node.js 20 ou superior.
- Um provedor de identidade compatível com OIDC/JWT, com endpoint JWKS.
- Uma chave de API da OpenAI guardada somente no ambiente do servidor.

## Configuração

Copie `.env.example` para um arquivo de ambiente privado e preencha:

- `OPENAI_API_KEY`: segredo exclusivo do servidor.
- `OPENAI_MODEL`: modelo Responses API autorizado para o projeto.
- `AUTH_ISSUER`: emissor exato dos tokens.
- `AUTH_AUDIENCE`: audiência esperada pela API.
- `AUTH_JWKS_URL`: URL HTTPS das chaves públicas do provedor.
- `CREATOR_SUBJECT`: opcional, valor exato e estável da claim `sub` da conta do criador.

A API rejeita requisições de chat/transcrição sem JWT válido. Tokens são verificados por assinatura, emissor, audiência, expiração e algoritmo permitido. O papel de criador é derivado exclusivamente do `sub` configurado no servidor; não é aceito do aplicativo.

## Execução local

```bash
npm install
npm start
```

O endpoint `GET /health` é apenas uma verificação de processo. Não significa que autenticação, chave externa ou dependências estejam prontas.

## Endpoints

- `GET /health`: liveness sem dados sensíveis.
- `POST /chat`: exige JWT Bearer e JSON com histórico de mensagens.
- `POST /transcribe`: exige JWT Bearer e `multipart/form-data` com campo `audio`.

Limites iniciais por usuário e rota: 20 mensagens/minuto e 6 transcrições/minuto. Corpos, tipos de áudio e tamanho das mensagens são validados. Logs registram identificador técnico da requisição, tipo de evento e status externo; não registram texto de conversa, transcrição, token ou áudio.

## Testes

```bash
npm install
npm run check
npm test
```

## Limites conhecidos — não publicar como produção ainda

- O provedor de identidade ainda precisa ser escolhido e configurado; sem ele, endpoints privados falham fechados com HTTP 503.
- O aplicativo móvel ainda não possui fluxo de login nem envio de access token.
- Rate limiting está em memória e serve apenas para uma única instância Alpha; produção multi-instância exige armazenamento compartilhado (por exemplo, Redis) e controles no gateway.
- Ainda faltam persistência segura de conta/sessão, gestão de convites Alpha, exclusão/exportação de dados, monitoramento operacional, política de privacidade publicada, revisão de retenção e testes de segurança independentes.
- Não há implantação, domínio, TLS gerenciado ou segredo real configurado por este commit.
- Nenhum conteúdo privado é disponibilizado à Nyx ou ao criador por estas rotas.

Não coloque chaves, tokens reais ou arquivos `.env` no repositório. Use o gerenciador de segredos do ambiente de hospedagem.
