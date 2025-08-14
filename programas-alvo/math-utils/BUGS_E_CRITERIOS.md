# Bugs Intencionais e Critérios de Cobertura

## Visão Geral

Este documento descreve os bugs intencionais implementados nas funções matemáticas e os critérios de cobertura estrutural necessários para detectá-los. O objetivo é demonstrar como diferentes critérios têm distintas capacidades na detecção de falhas.

## Função 1: `calcularFatorial(n)`

### Bug Intencional
**Localização:** `index (4).js`
**Descrição:** A verificação de overflow não previne a multiplicação que causa o estouro do limite do número seguro (`Number.MAX_SAFE_INTEGER`). O bug é que o `resultado` já pode ter se tornado `Infinity` na operação `resultado = resultado * i`, antes mesmo do `if` de verificação ser alcançado.

**Critérios Necessários para Detecção:**
- **Statement Coverage** e todos os critérios superiores.

**Caso de Teste que Detecta o Bug:**
- `expect(calcularFatorial(21)).toBe(-1)`: Este teste falha porque a função, ao tentar multiplicar um número já imenso, retorna `Infinity`, que satisfaz a condição de overflow e leva ao retorno de `-1`, conforme esperado pelo oráculo do teste.

**Casos de Teste que NÃO Detectam o Bug:**
- `expect(calcularFatorial(5)).toBe(120)`: Não atinge o limite de overflow.

## Função 2: `calcularMediaPonderada(valores, pesos, precisao)`

### Bug Intencional
**Localização:** `index (4).js`
**Descrição:** A lógica de arredondamento para cima é acionada por uma condição (`parteDecimal > 0.95 && precisao === 2`) que não trata corretamente todos os casos próximos a um inteiro, levando a arredondamentos incorretos.

**Critérios Necessários para Detecção:**
- **Branch Coverage** e todos os critérios superiores.

**Caso de Teste que Detecta o Bug:**
- `expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98)`: Este teste, presente a partir da suíte de Branch Coverage, expõe a falha na lógica de arredondamento.

**Caso de Teste que NÃO Detecta o Bug:**
- `expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5)`: Não aciona a lógica de arredondamento condicional.

## Função 3: `classificarNumero(numero)`

### Bug Intencional
**Localização:** `index (4).js`
**Descrição:** A condição para números abundantes usa o operador incorreto (`>=` em vez de `>`). Isso faz com que números perfeitos (onde `somaDivisores === numero`) sejam incorretamente classificados como abundantes.

**Critérios Necessários para Detecção:**
- **Path Coverage**, **MC/DC**, e **All-Uses**.

**Caso de Teste que Detecta o Bug:**
- `expect(classificarNumero(6)).toBe('perfeito')`: Este teste falha porque a função com bug retorna `'abundante'`. Apenas critérios que forçam este cenário específico detectam a falha.

**Caso de Teste que NÃO Detecta o Bug:**
- `expect(classificarNumero(12)).toBe('abundante')`: Este teste passa em todas as suítes, pois 12 é de fato abundante. Ele não expõe a falha lógica da função.

## Função 4: `converterBase(numero, baseOrigem, baseDestino)`

### Bug Intencional
**Localização:** `index (4).js`
**Descrição:** A função confia diretamente no `parseInt`, que faz a conversão parcial de uma string e ignora caracteres inválidos após o início, em vez de invalidar a entrada inteira como deveria.

**Critérios Necessários para Detecção:**
- **Branch Coverage** e todos os critérios superiores.

**Caso de Teste que Detecta o Bug:**
- `expect(converterBase('G', 16, 10)).toBe(null)`: Este teste para um caractere inválido na base 16 expõe a falha.

**Caso de Teste que NÃO Detecta o Bug:**
- `expect(converterBase('FF', 16, 10)).toBe('255')`: A conversão é válida e o bug não é acionado.

## Função 5: `avaliarExpressao(expressao)`

### Bugs Intencionais
**Localização:** `index (4).js`
**Descrição:** Existem dois bugs relacionados ao tratamento de casos especiais:
1.  A verificação de infinito trata apenas o `Infinity` positivo, ignorando `-Infinity`.
2.  O arredondamento para zero funciona apenas para números positivos, ignorando resultados negativos muito próximos de zero.

**Critérios Necessários para Detecção:**
- **Branch Coverage** e todos os critérios superiores.

**Casos de Teste que Detectam os Bugs:**
- **Bug 1:** `expect(avaliarExpressao('-1/0')).toBe(null)`. A função com bug retorna `-Infinity`, causando a falha do teste.
- **Bug 2:** `expect(avaliarExpressao('0.2 - 0.3')).toBe(0)`. A função com bug retorna `-0.1`, causando a falha do teste.

**Caso de Teste que NÃO Detecta o Bug:**
- `expect(avaliarExpressao('2+3')).toBe(5)`: Expressão simples que não aciona nenhuma das lógicas defeituosas.

## Análise de Custo vs. Eficácia

| Critério | Custo (Nº de Testes) | Eficácia (Bugs Detectados) | Análise |
| :--- | :--- | :--- | :--- |
| **Statement** | 25 | 1 de 6 | **Baixa.** Apenas executa linhas, não testa a lógica de controle de forma eficaz. |
| **Branch** | 33 | 4 de 6 | **Média-Alta.** Forçar a exploração de ramos `true`/`false` revela significativamente mais bugs. |
| **MC/DC** | 31 | **6 de 6** | **Muito Alta.** Testa o impacto independente de cada condição, sendo muito eficaz para bugs lógicos. |
| **All-Uses** | 33 | **6 de 6** | **Muito Alta.** Rastrear o fluxo de dados completo é poderoso para detectar anomalias de dados e lógicas. |
| **Path** | 38 | **6 de 6** | **Muito Alta.** O mais rigoroso no fluxo de controle, mas também o mais custoso em número de testes. |
