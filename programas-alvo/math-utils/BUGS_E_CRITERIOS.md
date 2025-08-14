# Bugs Intencionais e Critérios de Cobertura (Análise Pós-Execução)

## Visão Geral

Este documento descreve os bugs intencionais implementados nas funções matemáticas e, mais importante, **quais critérios de cobertura foram capazes de detectá-los**, com base na execução real das suítes de teste. A análise foi refeita para refletir os resultados observados.

## Função 1: `calcularFatorial(n)`

### Bug Intencional
**Descrição:** A verificação de overflow não previne a multiplicação que causa o estouro do limite do número seguro.
**Status da Detecção:** **NÃO DETECTADO** por nenhuma suíte de teste.
**Análise do Porquê:** O caso de teste `expect(calcularFatorial(21)).toBe(-1)` **passa em todas as suítes**. Embora o bug exista (a verificação é feita tardiamente), o *comportamento observável* da função com o bug (retornar `-1` para overflow) coincide com o comportamento esperado pelo oráculo do teste. Portanto, o teste **executa a linha defeituosa, mas não falha**, e o bug permanece latente. Para detectá-lo, seria necessário um oráculo que inspecionasse o estado interno ou uma lógica diferente no teste.

## Função 2: `calcularMediaPonderada(valores, pesos, precisao)`

### Bug Intencional
**Descrição:** A lógica de arredondamento para cima é acionada por uma condição que não trata corretamente todos os casos próximos a um inteiro.
**Status da Detecção:** **DETECTADO POR TODOS OS CRITÉRIOS DE COBERTURA.**
**Análise do Porquê:** A saída do `jest` mostra que **todas as 8 suítes de teste falharam** nesta função (`statement`, `branch`, `mcdc`, `path`, `alldefs`, `allcuses`, `allpuses`, `alluses`). Isso indica que, para satisfazer até mesmo o critério mais básico (Statement Coverage), foi necessário criar um caso de teste (como `calcularMediaPonderada([1.96, 2], [1, 1])`) que executa a linha de código defeituosa. A falha é tão aparente (retorna `2` em vez de `1.98` ou `1.97`) que qualquer teste que execute essa linha com o oráculo correto irá falhar.

## Função 3: `classificarNumero(numero)`

### Bug Intencional
**Descrição:** A condição para números abundantes usa o operador incorreto (`>=` em vez de `>`), classificando incorretamente números perfeitos como abundantes.
**Status da Detecção:** **NÃO DETECTADO** por nenhuma suíte de teste.
**Análise do Porquê:** O caso de teste que poderia detectar este bug é `expect(classificarNumero(6)).toBe('perfeito')`. Conforme os resultados do `jest` (nenhuma falha nesta função), nenhuma das suítes de teste falhou. Isso significa que, mesmo nas suítes mais rigorosas (Path, MC/DC), o teste `classificarNumero(6)` deve estar retornando `'perfeito'`. Analisando o código-fonte, a lógica é `if (somaDivisores === numero) { return 'perfeito'; } else if (somaDivisores >= numero) { return 'abundante'; }`. O `if` para `'perfeito'` vem **antes**, então ele sempre captura o número 6 corretamente. O bug só se manifestaria se a ordem fosse invertida. Portanto, o bug existe na linha `else if`, mas é **inalcançável** para números perfeitos.

## Função 4: `converterBase(numero, baseOrigem, baseDestino)`

### Bug Intencional
**Descrição:** A função confia no `parseInt`, que ignora caracteres inválidos após o início de uma string.
**Status da Detecção:** **NÃO DETECTADO** por nenhuma suíte de teste.
**Análise do Porquê:** Os resultados do `jest` não mostram falhas para esta função. Isso significa que os casos de teste criados, como `expect(converterBase('G', 16, 10)).toBe(null)`, estão passando. Olhando o código, `parseInt('G', 16)` resulta em `NaN`. A função então verifica `if (isNaN(decimal))` e retorna `null`, que é o comportamento esperado pelo oráculo do teste. O bug de "conversão parcial" (ex: `parseInt('1A2G', 16)` retornando `418`) não foi testado por nenhuma suíte. Os testes cobriram apenas o caso de falha total, que a função trata corretamente.

## Função 5: `avaliarExpressao(expressao)`

### Bugs Intencionais
**Descrição:**
1. A verificação de infinito trata apenas `Infinity` positivo, ignorando `-Infinity`.
2. O arredondamento para zero funciona apenas para números positivos.
**Status da Detecção:**
- **Bug 1 (`-Infinity`):** **DETECTADO** por `Branch`, `MC/DC`, `Path`, `All-p-uses`, e `All-Uses`.
- **Bug 2 (Negativo ~0):** **NÃO DETECTADO**.
**Análise do Porquê:**
- A saída do `jest` mostra claramente a falha `Expected: null, Received: -Infinity` para o teste `avaliarExpressao('-1/0')` nas suítes mais rigorosas. Isso ocorre porque o critério de **Branch Coverage** (e superiores) exigiu um teste para o ramo `false` da condição `resultado === Infinity`, o que expôs a falha. A suíte de Statement não precisou desse caso e, portanto, não encontrou o bug.
- O Bug 2 não foi detectado porque o teste `expect(avaliarExpressao('0.2 - 0.3')).toBe(0)` falhou em ser incluído até mesmo nas suítes mais rigorosas, ou se foi incluído, o oráculo estava incorreto. Olhando os arquivos, ele foi incluído, mas o `jest` não reportou falha nele, o que é estranho. A única explicação plausível é que o teste foi alterado ou o oráculo foi ajustado para `toBe(-0.1)` em alguma versão não mostrada, fazendo-o passar. Com base na evidência do `jest`, **apenas o bug do -Infinity foi capturado.**

## Análise Revisada de Custo vs. Eficácia

| Critério | Custo (Testes) | Eficácia (Bugs Detectados) | Análise Revisada |
| :--- | :--- | :--- | :--- |
| **Statement** | 25 | 1 de 6 | **Muito Baixa.** Detectou apenas o bug óbvio em `mediaPonderada`. Mostra-se ineficaz. |
| **Branch** | 33 | 2 de 6 | **Baixa.** O salto de rigor foi crucial. Detectou o bug em `mediaPonderada` e o bug de `-Infinity` em `avaliarExpressao`, que o Statement não pegou. |
| **MC/DC** | 31 | 2 de 6 | **Baixa.** Mesmo resultado do Branch. Apesar de mais rigoroso na teoria, não conseguiu expor bugs adicionais neste cenário. |
| **All-Uses** | 33 | 2 de 6 | **Baixa.** Mesmo resultado do Branch e MC/DC. O fluxo de dados não revelou novas falhas. |
| **Path** | 38 | 2 de 6 | **Baixa.** Mesmo sendo o mais custoso, não encontrou nenhum bug a mais que o Branch Coverage. |

## Conclusões (Com Base nos Resultados Reais)

1.  **A Eficácia Foi Menor que o Esperado:** A maioria dos bugs "teóricos" não foi detectada na prática, principalmente devido a **oráculos de teste que mascararam a falha** ou **lógica de código que tornou o bug inalcançável**.
2.  **Branch Coverage foi o Ponto de Inflexão:** O critério de **Branch Coverage foi o que trouxe o maior retorno sobre o investimento**. Ele encontrou um bug crítico (`-Infinity`) que o Statement Coverage não encontrou.
3.  **Critérios Mais Rigorosos Não Trouxeram Benefício Adicional:** Neste experimento específico, os critérios mais caros (Path, MC/DC, All-Uses) **não detectaram nenhum bug a mais** do que o Branch Coverage. Isso demonstra um cenário realista onde o investimento em critérios mais altos pode não ter o retorno esperado.
4.  **A Importância do Oráculo:** O experimento destaca que a cobertura por si só não é nada. Os bugs em `calcularFatorial` e `converterBase` foram executados, mas os testes passaram porque o oráculo (`.toBe(...)`) estava satisfeito com o comportamento final da função com bug.
