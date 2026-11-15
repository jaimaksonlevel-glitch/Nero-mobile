# Nero Mobile

Primeira base do aplicativo móvel do assistente Nero, da Level Engenharia.

## Definições do produto

- Plataformas: Android e iOS (Expo / React Native).
- Ativação planejada: palavra de ativação **“Nero”** (modo Wake).
- Personalidade: **Hybrid** — técnico e objetivo em engenharia; natural e próximo em conversas.
- Idioma inicial: português do Brasil.
- Interface inicial: chat com estrutura visual para entrada por texto e voz.

## Estado desta versão

A versão 0.1.0 cria a estrutura inicial do aplicativo e a primeira interface de conversa.

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
2. Integrar serviço de IA com chave mantida em backend seguro (nunca embutida no aplicativo).
3. Adicionar reconhecimento de fala e resposta falada.
4. Implementar wake word com controles de privacidade, indicador claro de microfone e opção para desligar.
5. Criar o módulo de assistente técnico para engenharia elétrica.
