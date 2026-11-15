# ADR-0007 — Plano de treinamento e validação do modelo Wake “Nero”

- **Status:** plano de pesquisa aprovado; treinamento e seleção do modelo pendentes.
- **Data:** 2026-11-15
- **Contexto:** Nero Mobile usa Expo SDK 54 / React Native 0.81.5. A palavra de ativação desejada é “Nero”, em português brasileiro. O detector deve operar localmente, sem transmitir áudio ambiente à nuvem.

## Decisão

Usar o pipeline oficial openWakeWord como primeira rota de pesquisa para gerar um classificador próprio em ONNX, condicionado à confirmação da licença de cada componente e de cada conjunto de dados. Não incorporar modelo comunitário com licença não comercial a um produto que possa ter uso comercial.

A documentação e o código upstream indicam que o pipeline de treinamento pode exportar o classificador para ONNX e TFLite. O port Kotlin avaliado espera um classificador ONNX com entrada `[1, 16, 96]` e saída `[1, 1]`, alimentado pelos mesmos modelos de pré-processamento/embedding. Portanto, o artefato exportado só será aceito após teste de compatibilidade com o runtime Android escolhido.

## Plano de dados e treinamento

1. **Definir a frase:** testar “Nero” isoladamente e, se houver colisões fonéticas, avaliar uma frase curta alternativa sem mudar a preferência do usuário sem aprovação.
2. **Dados positivos:** começar com geração sintética em português brasileiro usando vozes TTS cujas licenças permitam treinamento e distribuição do modelo derivado. O exemplo oficial recomenda pelo menos 20 mil amostras positivas e frequentemente 100 mil ou mais; esses números são referência de treinamento, não garantia de qualidade.
3. **Diversidade:** variar vozes, velocidade, entonação, distância simulada, reverberação e ruído. Não depender de uma única voz ou sotaque.
4. **Dados negativos:** usar fala comum em português, palavras foneticamente próximas, TV, rádio, música, ventiladores, ferramentas e ruído de ambientes de trabalho. Respeitar licenças e direitos dos conjuntos de áudio.
5. **Privacidade:** não coletar nem usar gravações do usuário, clientes ou terceiros sem consentimento explícito, finalidade definida e política de retenção. O primeiro protótipo deve preferir dados sintéticos licenciados e corpora autorizados.
6. **Treino/exportação:** produzir ONNX pelo pipeline openWakeWord e registrar versões, parâmetros, fontes, licenças, hashes e comandos reprodutíveis.
7. **Compatibilidade:** verificar dimensões, tipo de tensor, normalização, ordem das features, janela temporal e compatibilidade com os modelos de mel/embedding usados pelo port Android. Um ONNX válido, por si só, não garante compatibilidade funcional.
8. **Avaliação:** manter conjuntos de validação separados por voz/locutor e por ambiente; medir recall, falsos acionamentos por hora, latência, CPU, memória e consumo de bateria. Não usar apenas dados sintéticos na avaliação final.
9. **Teste real:** testar em aparelho Android de referência, com diferentes distâncias, sotaques brasileiros e ruídos de galpão, inversor, ventilador, conversa, TV e rádio.

## Critérios mínimos antes da integração

- Licença comercialmente compatível documentada para código, pesos, vozes TTS, dados positivos e negativos.
- Artefato ONNX reproduzível, com metadados e hash versionados.
- Inferência compatível com o runtime e pré-processadores do Android.
- Testes de falso acionamento e não detecção em áudio real, com limites de aceitação definidos antes da medição.
- Captura apenas em primeiro plano, permissão explícita, indicador visual claro e parada ao ir para segundo plano ou bloquear a tela.
- Nenhum áudio ambiente enviado à nuvem durante a detecção.

## Riscos e limites

- A frase curta “Nero” pode colidir com fala comum; a taxa real de falso acionamento precisa ser medida.
- O pipeline upstream usa dependências e conjuntos de dados externos; suas licenças devem ser verificadas individualmente, não presumidas a partir da licença do código.
- Treinamento pode exigir ambiente Linux, espaço em disco e GPU; não é uma etapa que deva ser simulada como concluída dentro do repositório do aplicativo.
- Resultados sintéticos ou benchmarks de terceiros não substituem testes no aparelho e nos ambientes de uso.
- Nenhum modelo está treinado, selecionado ou integrado nesta etapa.

## Referências

- openWakeWord — treinamento e exportação: https://github.com/dscripka/openWakeWord
- Exemplo de configuração de modelo customizado: https://github.com/dscripka/openWakeWord/blob/main/examples/custom_model.yml
- Código de exportação ONNX: https://github.com/dscripka/openWakeWord/blob/main/openwakeword/train.py
- Port Kotlin Android avaliado: https://github.com/msnilsen/openwakeword-android
- ADR-0005 — contrato proposto do módulo Expo: `docs/ADR-0005-expo-wake-module-contract.md`
- ADR-0006 — avaliação do runtime Android: `docs/ADR-0006-openwakeword-android-evaluation.md`
