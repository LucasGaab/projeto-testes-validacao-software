# Bugs Intencionais e Critérios de Cobertura

## Visão Geral

Este documento descreve os bugs intencionais implementados nas funções matemáticas e os critérios de cobertura necessários para detectá-los. O objetivo é demonstrar como diferentes critérios de cobertura têm diferentes capacidades de detecção de falhas.

## Função 1: calcularFatorial(n)

### Bug Intencional
**Localização:** Linha 25-27
```javascript
if (resultado > Number.MAX_SAFE_INTEGER / i) {
  return -1; // Overflow
}
```

**Descrição:** A verificação de overflow está incorreta. Deveria verificar se `resultado * i > Number.MAX_SAFE_INTEGER` antes da multiplicação, mas verifica se `resultado > Number.MAX_SAFE_INTEGER / i`. Isso pode causar falsos positivos ou negativos.

**Critérios Necessários para Detecção:**
- **Branch Coverage:** Detecta o bug quando testa casos que causam overflow
- **MC/DC:** Detecta o bug testando a condição `resultado > Number.MAX_SAFE_INTEGER / i` de forma independente
- **Data Flow (All-uses):** Detecta o bug testando todos os usos da variável `resultado`

**Casos de Teste que Detectam o Bug:**
- `calcularFatorial(18)` → retorna -1 (overflow detectado)
- `calcularFatorial(17)` → retorna 355687428096000 (sem overflow)

**Casos de Teste que NÃO Detectam o Bug:**
- `calcularFatorial(5)` → retorna 120 (não testa overflow)
- `calcularFatorial(0)` → retorna 1 (não testa overflow)

## Função 2: calcularMediaPonderada(valores, pesos, precisao)

### Bug Intencional
**Localização:** Linha 75-79
```javascript
if (parteDecimal > 0.95 && precisao === 2) {
  // BUG: Deveria arredondar para cima, mas arredonda para baixo
  media = Math.floor(media) + 1;
} else {
  media = Math.round(media * Math.pow(10, precisao)) / Math.pow(10, precisao);
}
```

**Descrição:** O arredondamento para valores muito próximos de inteiros está incorreto. Deveria usar `Math.round()` para arredondar corretamente, mas usa `Math.floor() + 1`.

**Critérios Necessários para Detecção:**
- **Branch Coverage:** Detecta o bug testando o caminho `parteDecimal > 0.95 && precisao === 2`
- **MC/DC:** Detecta o bug testando as condições `parteDecimal > 0.95` e `precisao === 2` independentemente
- **Data Flow (All-c-uses):** Detecta o bug testando todos os usos computacionais de `parteDecimal` e `precisao`

**Casos de Teste que Detectam o Bug:**
- `calcularMediaPonderada([1.95, 2], [1, 1])` → retorna 2 (bug ativado)
- `calcularMediaPonderada([1.5, 2], [1, 1])` → retorna 1.75 (bug não ativado)

**Casos de Teste que NÃO Detectam o Bug:**
- `calcularMediaPonderada([1, 2], [1, 1])` → retorna 1.5 (não testa arredondamento)

## Função 3: classificarNumero(numero)

### Bug Intencional
**Localização:** Linha 125-127
```javascript
} else if (somaDivisores >= numero) {
  // BUG: Deveria ser > numero, não >=
  return 'abundante';
}
```

**Descrição:** A condição para números abundantes está incorreta. Deveria ser `somaDivisores > numero`, mas usa `somaDivisores >= numero`. Isso classifica incorretamente números perfeitos como abundantes.

**Critérios Necessários para Detecção:**
- **Branch Coverage:** Detecta o bug testando números que são perfeitos mas são classificados como abundantes
- **MC/DC:** Detecta o bug testando a condição `somaDivisores >= numero` de forma independente
- **Path Coverage:** Detecta o bug testando o caminho específico que leva à classificação incorreta

**Casos de Teste que Detectam o Bug:**
- `classificarNumero(6)` → retorna 'perfeito' (correto)
- `classificarNumero(12)` → retorna 'abundante' (bug: deveria ser 'abundante' mas por motivo errado)

**Casos de Teste que NÃO Detectam o Bug:**
- `classificarNumero(8)` → retorna 'deficiente' (não testa a condição bugada)

## Função 4: converterBase(numero, baseOrigem, baseDestino)

### Bug Intencional
**Localização:** Linha 155-165
```javascript
 if (typeof numero === 'string') {
    // BUG: Não valida adequadamente caracteres inválidos para a base
    // Deveria verificar se todos os caracteres são válidos para a base
    let numeroUpper = numero.toUpperCase();

    if (numeroUpper.length === 0) {
      decimal = 0;
    } else {
      // Função confia diretamente no `parseInt`, que faz a conversão
      // parcial e ignora caracteres inválidos após o início da string.
      decimal = parseInt(numeroUpper, baseOrigem);
    }
  } else {
    decimal = numero;
  }
```

**Descrição:** A validação de caracteres está incompleta. Não trata adequadamente strings alfanuméricas.

**Critérios Necessários para Detecção:**
- **Data Flow (All-defs, All-uses):** Detecta o bug testando todas as definições e usos de variáveis
- **Branch Coverage:** Detecta o bug testando casos extremos como strings vazias
- **Path Coverage:** Detecta o bug testando caminhos específicos de validação

**Casos de Teste que Detectam o Bug:**
- `converterBase('G', 16, 10)` → retorna null (caractere inválido)
- `converterBase('', 16, 10)` → retorna '0' (string vazia tratada)

**Casos de Teste que NÃO Detectam o Bug:**
- `converterBase('FF', 16, 10)` → retorna '255' (conversão válida)

## Função 5: avaliarExpressao(expressao)

### Bug Intencional
**Localização:** Linha 195-205
```javascript
/try {
    let resultado = eval(expressao);

    // BUG 1: A verificação agora só trata o INFINITO POSITIVO, ignorando -Infinity e NaN.
    if (resultado === Infinity) {
      return null;
    }

    // BUG 2: O arredondamento agora só funciona para números POSITIVOS perto de zero.
    // Números negativos muito próximos de zero não serão arredondados.
    if (resultado > 0 && resultado < 1e-10) {
      resultado = 0;
    }
```

**Descrição:** Bugs relacionados ao tratamento de resultados especiais.

**Critérios Necessários para Detecção:**
- **MC/DC:** Detecta o bug testando condições complexas de forma independente
- **Path Coverage:** Detecta o bug testando caminhos específicos de avaliação
- **Data Flow (All-p-uses):** Detecta o bug testando todos os usos predicativos de variáveis

**Casos de Teste que Detectam o Bug:**
- `avaliarExpressao('2/0')` → retorna null (divisão por zero)
- `avaliarExpressao('1e-11')` → retorna 0 (muito próximo de zero)

**Casos de Teste que NÃO Detectam o Bug:**
- `avaliarExpressao('2+3')` → retorna 5 (expressão simples)

## Análise de Custo vs. Eficácia

### Statement Coverage
- **Custo:** Baixo (5-10 testes por função)
- **Eficácia:** Baixa (não detecta nenhum dos bugs)
- **Limitação:** Apenas executa linhas, não testa lógica

### Branch Coverage
- **Custo:** Médio (10-15 testes por função)
- **Eficácia:** Média (detecta alguns bugs)
- **Limitação:** Não testa condições complexas adequadamente

### MC/DC Coverage
- **Custo:** Alto (15-25 testes por função)
- **Eficácia:** Alta (detecta a maioria dos bugs)
- **Vantagem:** Testa condições de forma independente

### Data Flow Coverage
- **Custo:** Muito Alto (20-30 testes por função)
- **Eficácia:** Muito Alta (detecta todos os bugs)
- **Vantagem:** Testa fluxo de dados completo

### Path Coverage
- **Custo:** Extremamente Alto (30+ testes por função)
- **Eficácia:** Muito Alta (detecta todos os bugs)
- **Limitação:** Pode ser impraticável para funções complexas

## Conclusões

1. **Critérios mais rigorosos detectam mais bugs:** MC/DC e Data Flow detectam significativamente mais bugs que Statement e Branch Coverage.

2. **Custo aumenta com rigor:** Critérios mais rigorosos requerem mais casos de teste.

3. **Ponto ótimo:** MC/DC oferece bom equilíbrio entre custo e eficácia para a maioria dos bugs.

4. **Bugs específicos:** Alguns bugs só são detectados por critérios específicos (ex: Data Flow para bugs de fluxo de dados).

5. **Contexto importa:** A escolha do critério deve considerar o tipo de aplicação e recursos disponíveis. 
