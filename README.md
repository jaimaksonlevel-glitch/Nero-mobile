# Nero Mobile — Alpha 0.2.0

Aplicativo Android/iOS da Nero Continuum, assistente universal da Level Engenharia.

## O que está conectado nesta versão

- Tela de autenticação por e-mail e senha (Supabase Auth).
- Criação de conta alpha, respeitando a configuração de confirmação de e-mail do projeto.
- Sessão persistida no dispositivo com Expo SecureStore.
- Chat conectado à Edge Function autenticada `continuum-core`.
- Conversas e mensagens enviadas ao backend, que controla a chamada Groq/Gemini e a persistência.
- A conversa atual mantém o identificador retornado pelo backend enquanto o aplicativo permanece aberto.

## Configuração local

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://wvlnasrqwrtzbpiefieu.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_COLOQUE_SUA_CHAVE_AQUI
```

Use a chave publishable do projeto. **Nunca** coloque `sb_secret`, `service_role`, chaves Groq ou Gemini no aplicativo ou no GitHub. O arquivo `.env` é ignorado pelo Git.

## Executar

Requer Node.js LTS e npm:

```bash
npm install
npx expo install --check
npx expo start
```

Para o primeiro teste no Android, use uma versão do Expo Go compatível com o SDK 54 do projeto. Se o aplicativo exigir módulos nativos adicionais no futuro, será necessário gerar um development build.

## Segurança e privacidade

- A autenticação do Supabase é obrigatória para conversar com a Edge Function.
- A sessão móvel usa armazenamento seguro do sistema operacional.
- O aplicativo contém somente a chave publicável; segredos de provedores e chave administrativa permanecem no backend.
- A autorização por usuário e as políticas RLS permanecem no Supabase.
- Memória privada ainda não é gravada automaticamente. Qualquer funcionalidade de memória deverá exigir consentimento explícito, controles de consulta e exclusão.
- O microfone não fica ativo em segundo plano. Reconhecimento de fala, wake word, síntese de voz e sincronização entre dispositivos ainda não estão implementados.

## Limitações conhecidas da Alpha

- O aplicativo ainda precisa ser instalado e testado em aparelho Android real.
- É necessário configurar as variáveis de ambiente no ambiente de build.
- A autenticação e a chamada real à IA ainda precisam ser validadas com a conta alpha.
- A tela ainda não apresenta uma lista para reabrir conversas antigas, embora o backend persista as mensagens.
- A interface de voz e a memória com consentimento ainda não foram integradas ao aplicativo.

## Backend

Projeto Supabase: `wvlnasrqwrtzbpiefieu`

Edge Function: `continuum-core` (JWT obrigatório). Estratégia de IA: Groq primário com fallback Gemini, conforme secrets configurados no backend.

O schema inicial está em `supabase/migrations/202611150001_initial_private_schema.sql`. O banco atualmente possui as tabelas e políticas RLS descritas no histórico do projeto; não execute a migração novamente sem revisar o estado atual.
