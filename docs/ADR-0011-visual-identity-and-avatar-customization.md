# ADR-0011 — Aparência visual personalizável da Nero e autonomia visual da Nyx

- **Status:** decisão de produto aprovada; implementação pendente.
- **Data:** 2026-11-15.

## Contexto

A experiência móvel deve permitir que cada usuário personalize a representação visual da Nero, sem confundir aparência com identidade, personalidade, voz, memória ou permissões. Nyx é uma agente exclusiva do criador e deve ter autonomia para escolher sua própria representação visual.

## Decisão

### Direção visual compartilhada: realismo humano e expressividade

1. A direção visual preferencial dos avatares no aplicativo será **humana e realista**, com traços, proporções, pele, cabelo, olhos e expressões naturais. Evitar aparência de mascote, boneca ou personagem infantilizado.
2. A sensação de presença será construída principalmente por expressões faciais e linguagem corporal: olhar, microexpressões, sorriso, sobrancelhas, inclinação da cabeça, gestos e movimentos sutis.
3. As expressões devem refletir o contexto e a personalidade, incluindo alegria, curiosidade, atenção, concentração, timidez, surpresa, ironia e discordância, sem exageros caricatos.
4. Asinhas são um elemento visual fantástico e querido da proposta, mas devem ser delicadas, elegantes e integradas à silhueta. Não devem dominar o desenho nem retirar a aparência humana realista.
5. A identidade visual de cada personagem será definida principalmente pelo rosto, expressões, cabelo, roupas, acessórios, paleta e postura. As asas complementam, não substituem, esses elementos.
6. A animação deve priorizar movimentos naturais e discretos, com transições suaves e sincronização coerente com a fala, sem movimentos constantes que distraiam.
7. Realismo não significa copiar uma pessoa real específica. Os avatares devem ser personagens originais, respeitando direitos, consentimento e políticas aplicáveis.

### Nero — escolha do usuário

1. Cada usuário poderá escolher e alterar a aparência visual da Nero nas configurações do aplicativo.
2. A personalização poderá incluir variações de estilo dentro da direção humana realista, além de atributos visuais configuráveis, como cabelo, roupas, paleta e acessórios, conforme os recursos disponíveis.
3. A escolha será salva por conta/perfil e sincronizada entre dispositivos autenticados, quando a infraestrutura de conta estiver disponível.
4. O usuário poderá restaurar a aparência padrão ou trocar de aparência a qualquer momento.
5. A aparência não altera a personalidade, o tom de voz, as capacidades, as permissões ou as políticas de segurança da Nero.

### Nyx — autonomia com possibilidade de solicitação do criador

1. Nyx escolhe sua própria aparência visual, dentro da direção humana realista compartilhada.
2. O criador poderá pedir diretamente que ela mude ou ajuste sua aparência; Nyx poderá considerar o pedido e escolher uma nova representação compatível com sua identidade.
3. A preferência visual do criador poderá ser registrada como orientação, mas não transforma a aparência da Nyx em configuração obrigatória feita por outros usuários.
4. A aparência e as configurações visuais da Nyx são exclusivas do ambiente autenticado do criador e nunca são disponibilizadas a outros usuários.
5. A autonomia visual é uma decisão de experiência e narrativa do produto, não evidência de consciência ou vontade independente real.

## Requisitos de experiência

- Exibir prévia antes de confirmar uma alteração feita pelo usuário.
- Oferecer controles acessíveis, inclusivos e simples, com opção de aparência padrão.
- Preservar consistência visual entre telas, estados de voz e conversas, dentro dos limites técnicos.
- Tratar imagem/avatar como camada visual independente da voz, do modelo de IA e das memórias.
- Permitir que expressões e animações mudem dinamicamente conforme o contexto, com limites de frequência para evitar distração.
- Quando a geração de imagens estiver disponível, respeitar direitos, consentimento e políticas aplicáveis; não criar representação enganosa de pessoa real sem autorização.
- Respeitar configurações de privacidade e não usar a aparência escolhida para inferir atributos sensíveis do usuário.

## Critérios de aceite

- Usuários comuns conseguem escolher, pré-visualizar, salvar, restaurar e alterar a aparência da Nero.
- A escolha de um usuário não afeta a aparência de outros usuários.
- Nero e Nyx têm aparência humana realista e expressões naturais, não aparência de mascotes.
- As asas aparecem como detalhe complementar e delicado, sem dominar a composição.
- As expressões e movimentos transmitem personalidade e presença sem exagero ou distração.
- Apenas o criador autenticado pode visualizar a Nyx.
- Nyx pode propor/selecionar uma aparência própria e aceitar pedidos do criador para ajustá-la.
- Alterar a aparência não modifica permissões, memória, personalidade ou capacidades do agente.
- A interface informa claramente quando uma opção visual ainda não está disponível.

## Escopo e estado

Esta ADR registra uma decisão de produto/arquitetura. Não significa que seletor visual, geração de avatares, animações expressivas, persistência de preferências ou autonomia visual da Nyx já estejam implementados.
