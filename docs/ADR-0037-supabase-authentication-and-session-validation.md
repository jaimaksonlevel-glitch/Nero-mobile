# ADR-0037 — Supabase Auth e validação individual de sessões

- **Status:** aprovado para implementação inicial; configuração externa e validação em aparelho pendentes.
- **Data:** 2026-11-15.

## Contexto

O Nero Mobile precisa identificar cada pessoa antes de permitir acesso ao chat e à transcrição. A chave da OpenAI deve permanecer exclusivamente no backend, e cada chamada precisa carregar uma credencial individual, curta e verificável. A arquitetura deve permitir trocar o provedor de identidade sem reescrever a API.

## Decisão

1. **Provedor inicial:** Supabase Auth, com cadastro e entrada por e-mail/senha. O backend mantém contrato OIDC/JWT genérico.
2. **Identidade:** o backend valida assinatura, emissor, audiência, expiração e `sub` do JWT. Para Supabase, o emissor é `https://<project-ref>.supabase.co/auth/v1`, a audiência é `authenticated`, e o JWKS é `https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json`.
3. **Assinatura:** aceitar somente chaves assimétricas ES256 ou RS256. O segredo legado HS256 não é aceito pelo verificador remoto JWKS.
4. **Cliente móvel:** usar a Project URL e a Publishable key públicas. Nunca incluir Secret key, service_role, senha do banco ou chave da OpenAI no aplicativo.
5. **Sessão nativa:** persistir a sessão com SecureStore do sistema operacional; dividir o conteúdo em itens pequenos para evitar limites de tamanho do armazenamento. No navegador, manter sessão apenas em memória até existir uma estratégia web própria.
6. **API:** enviar o access token individual como Bearer em `/chat` e `/transcribe`. Ausência ou falha de validação nega acesso.
7. **Criador:** identificar somente pelo UUID exato do claim `sub`, configurado no servidor por `CREATOR_SUBJECT`; nunca por e-mail, nome, variável pública ou estado de interface.

## Configuração externa necessária

- Criar projeto Supabase e habilitar autenticação por e-mail/senha.
- Configurar chave assimétrica ES256 ou RS256 em Authentication → Signing Keys.
- Definir variáveis públicas `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no ambiente de build.
- Definir `AUTH_ISSUER`, `AUTH_AUDIENCE`, `AUTH_JWKS_URL` e, após confirmar a conta do criador, `CREATOR_SUBJECT` no ambiente privado do backend.
- Implantar backend HTTPS e definir `EXPO_PUBLIC_NERO_API_URL`.

## Segurança, privacidade e limites

- Tokens são individuais; não há token mestre compartilhado no APK.
- O app não recebe nem armazena credenciais de serviço.
- O backend falha fechado quando a configuração de autenticação está ausente ou inválida.
- Sessões e dados precisam permanecer isolados por usuário; a autenticação, sozinha, não implementa ainda o modelo completo de memória/tenant.
- Revogação, expiração, recuperação de conta, MFA, política de retenção, exclusão e convites do Alpha precisam de validação adicional.
- O cadastro inicial não abre automaticamente o Alpha de dez participantes.
- A chave assimétrica precisa estar ativa no projeto Supabase; projetos usando apenas segredo legado HS256 não funcionarão com este verificador.

## Critérios de aceitação

- Cadastro e entrada funcionam em build nativo Android/iOS.
- Sessão persiste após reiniciar o aplicativo e é removida ao sair.
- API rejeita token ausente, expirado, adulterado, com emissor/audiência incorretos ou assinatura não permitida.
- Um usuário não consegue invocar funções exclusivas do criador alterando a interface ou a requisição.
- Chat e transcrição enviam token individual; chaves privadas permanecem no servidor.
- Testes automatizados e testes manuais em aparelho confirmam os fluxos e falhas.

## Estado real

A base de cliente, tela de autenticação, armazenamento nativo, envio Bearer e validação JWT no backend foram adicionados à branch de desenvolvimento. **O projeto Supabase ainda não foi criado/vinculado, as variáveis reais não foram configuradas, o backend não foi implantado e não houve teste em aparelho.** Portanto, a autenticação está parcialmente implementada, não pronta para uso real nem para abertura do Alpha.
