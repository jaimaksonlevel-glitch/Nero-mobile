# Nero Mobile

Primeira base do aplicativo móvel do assistente Nero, da Level Engenharia.

## Definições do produto

- Plataformas: Android e iOS (Expo / React Native).
- Ativação planejada: palavra de ativação **“Nero”** (modo Wake).
- Personalidade: **Hybrid** — técnico e objetivo em engenharia; natural e próximo em conversas.
- Idioma inicial: português do Brasil.
- Interface inicial: chat com estrutura visual para entrada por texto e voz.

## Backend Supabase

O aplicativo usa variáveis públicas de ambiente do Expo para localizar o projeto Supabase. A chave publishable pode estar no cliente; **nunca** coloque sb_secret, service_role ou chaves privadas no aplicativo.

Crie um arquivo .env na raiz com:

```env
EXPO_PUBLIC_SUPABASE_URL=https://wvlnasrqwrtzbpiefieu.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_COLOQUE_SUA_CHAVE_AQUI
```

O arquivo .env é ignorado pelo Git. Use .env.example como modelo. A configuração do cliente fica em src/config/supabase.ts.

Antes de habilitar dados de usuários, configure autenticação, políticas RLS em todas as tabelas expostas e funções de backend para operações privilegiadas. A chave publicável não substitui essas proteções.

## Estado desta versão

A versão 0.1.0 cria a estrutura inicial do aplicativo e a primeira interface de conversa. A conexão cliente Supabase está preparada, mas tabelas, autenticação e Edge Functions ainda precisam ser implementadas e testadas no projeto.

**Ainda não estão implementados:** conexão com um modelo de IA, reconhecimento de fala, detecção contínua da palavra “Nero”, síntese de voz e execução em segundo plano. O botão de voz informa essa limitação; ele não simula reconhecimento ativo.

A ativação por palavra-chave exige integração nativa de áudio, permissões explícitas, tratamento de privacidade e testes em aparelhos reais. Essa integração será feita em uma etapa própria, sem deixar o microfone ativo silenciosamente.

## Requisitos

- Node.js LTS
- npm
- Expo Go para testes iniciais ou development build quando forem adicionados módulos nativos.

## Executar

```bash
npm install
npx expo start
```

## Próximas etapas

1. Validar a interface em Android.
2. Configurar autenticação e persistência de sessão segura no dispositivo.
3. Criar schema inicial, políticas RLS e Edge Functions no Supabase.
4. Integrar o serviço de IA exclusivamente pelo backend, mantendo segredos fora do aplicativo.
5. Adicionar reconhecimento de fala e resposta falada.
6. Implementar wake word com controles de privacidade, indicador claro de microfone e opção para desligar.
7. Criar o módulo de assistente técnico para engenharia elétrica.
