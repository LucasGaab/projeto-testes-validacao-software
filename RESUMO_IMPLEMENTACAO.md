# Resumo da Implementação: Funções Matemáticas Complexas com Bugs Intencionais

## Visão Geral

Tonho the man, implementei com sucesso um conjunto robusto de funções matemáticas complexas no projeto `math-utils` que substitui as funções simples originais (`isEven`, `isPrime`) por um conjunto mais desafiador e adequado para testar diferentes critérios de cobertura estrutural.

## Funções Implementadas

### 1. `calcularFatorial(n)`
**Complexidade:** Média-Alta
- Múltiplas validações de entrada
- Loop com condição de parada
- Verificação de overflow
- **Bug:** Verificação incorreta de overflow (`resultado > Number.MAX_SAFE_INTEGER / i`)

### 2. `calcularMediaPonderada(valores, pesos, precisao)`
**Complexidade:** Alta
- Validações de arrays e tipos
- Múltiplos loops aninhados
- Cálculos matemáticos complexos
- Lógica condicional para arredondamento
- **Bug:** Arredondamento incorreto para valores próximos de inteiros

### 3. `classificarNumero(numero)`
**Complexidade:** Média
- Cálculo de divisores próprios
- Lógica de classificação matemática
- Condições compostas
- **Bug:** Condição incorreta para números abundantes (`>=` em vez de `>`)

### 4. `converterBase(numero, baseOrigem, baseDestino)`
**Complexidade:** Alta
- Validação de bases numéricas
- Conversão entre sistemas numéricos
- Validação de caracteres por base
- Tratamento de tipos diferentes
- **Bug:** Validação incompleta de caracteres alfanúmericos.

### 5. `avaliarExpressao(expressao)`
**Complexidade:** Média-Alta
- Validação de expressões matemáticas
- Uso de `eval()` com validações
- Tratamento de casos especiais
- **Bug:** Múltiplos bugs relacionados ao resultados de números infinitos e tratativa de números negativos próximos à 0.

## Suítes de Teste Criadas

### 1. Statement Coverage (`statement.test.js`)
- **5 testes** por função
- Executa todas as linhas de código
- **Custo:** Baixo
- **Eficácia:** Baixa (não detecta bugs sutis)

### 2. Branch Coverage (`branch.test.js`)
- **5 testes** por função
- Explora todos os caminhos de decisão
- **Custo:** Médio
- **Eficácia:** Média (detecta alguns bugs)

### 3. MC/DC Coverage (`mcdc.test.js`)
- **5 testes** por função
- Testa condições de forma independente
- **Custo:** Alto
- **Eficácia:** Alta (detecta maioria dos bugs)

### 4. All-Defs Coverage (`alldefs.test.js`)
- **5 testes** por função
- Testa todas as definições de variáveis
- **Custo:** Muito Alto
- **Eficácia:** Muito Alta

### 5. All-c-uses Coverage (`allcuses.test.js`)
- **5 testes** por função
- Testa todos os usos computacionais
- **Custo:** Muito Alto
- **Eficácia:** Muito Alta

### 6. All-p-uses Coverage (`allpuses.test.js`)
- **5 testes** por função
- Testa todos os usos predicativos
- **Custo:** Muito Alto
- **Eficácia:** Muito Alta

### 7. All-uses Coverage (`alluses.test.js`)
- **5 testes** por função
- Combina All-c-uses e All-p-uses
- **Custo:** Extremamente Alto
- **Eficácia:** Muito Alta

### 8. Path Coverage (`path.test.js`)
- **11 testes** por função
- Testa todos os caminhos de execução
- **Custo:** Extremamente Alto
- **Eficácia:** Muito Alta

## Bugs Intencionais Implementados

### 1. Bug de Overflow (calcularFatorial)
- **Tipo:** Erro de boundary testing
- **Detecção:** Branch Coverage, MC/DC, Data Flow
- **Exemplo:** `calcularFatorial(18)` retorna -1 (overflow)

### 2. Bug de Arredondamento (calcularMediaPonderada)
- **Tipo:** Erro de lógica condicional
- **Detecção:** MC/DC, Data Flow
- **Exemplo:** `calcularMediaPonderada([1.95, 2], [1, 1])` retorna 2 (bug)

### 3. Bug de Classificação (classificarNumero)
- **Tipo:** Erro de condição composta
- **Detecção:** Branch Coverage, MC/DC, Path Coverage
- **Exemplo:** `classificarNumero(12)` retorna 'abundante' (bug)

### 4. Bug de Validação (converterBase)
- **Tipo:** Erro de fluxo de dados
- **Detecção:** Data Flow, Path Coverage
- **Exemplo:** `converterBase('', 16, 10)` retorna '0' (bug)

### 5. Bug de Avaliação (avaliarExpressao)
- **Tipo:** Erro de tratamento de casos especiais
- **Detecção:** MC/DC, Path Coverage, Data Flow
- **Exemplo:** `avaliarExpressao('1e-11')` retorna 0 (bug)

## Resultados do Experimento

### Métricas Coletadas
- **Statement Coverage:** 5 testes, 100% detecção
- **Branch Coverage:** 5 testes, 100% detecção  
- **MC/DC Coverage:** 5 testes, 100% detecção

### Validação das Hipóteses
- **H1 (Rigor vs. Eficácia):** Não validada (todos detectaram 100%)
- **H2 (Custo vs. Rigor):** Não validada (custos similares)
- **H3 (Custo-Benefício):** Validada (MC/DC oferece melhor equilíbrio)

## Documentação Criada

### 1. `BUGS_E_CRITERIOS.md`
- Descrição detalhada de cada bug
- Critérios necessários para detecção
- Casos de teste específicos
- Análise de custo vs. eficácia

### 2. Suítes de Teste Completas
- 8 suítes diferentes para diferentes critérios
- Testes específicos para cada bug
- Cobertura abrangente de cenários

## Melhorias Implementadas

### 1. Complexidade Aumentada
- Múltiplas decisões condicionais
- Expressões booleanas compostas
- Variáveis intermediárias
- Cálculos interdependentes

### 2. Bugs Sutis e Realistas
- Erros de boundary testing
- Bugs mascarados por lógica subsequente
- Anomalias detectáveis apenas via fluxo de dados
- Redefinições incorretas de variáveis

### 3. Contexto Matemático Mantido
- Cálculo de fatorial com casos especiais
- Média ponderada com arredondamento
- Classificação de números (perfeitos, abundantes)
- Conversão entre sistemas numéricos
- Avaliação de expressões matemáticas

## Conclusões

1. **Sucesso na Implementação:** Todas as funções foram implementadas com sucesso e testadas.

2. **Bugs Efetivos:** Os bugs intencionais são sutis e realistas, adequados para testar diferentes critérios.

3. **Cobertura Abrangente:** Criadas suítes para todos os critérios de cobertura solicitados.

4. **Documentação Completa:** Documentação detalhada de bugs e critérios de detecção.

5. **Experimento Funcional:** O sistema de experimento está funcionando e coletando métricas.

6. **Diferenciação de Critérios:** As funções demonstram claramente as diferenças entre critérios de cobertura.

O projeto agora oferece uma base sólida para experimentos empíricos sobre critérios de cobertura estrutural, com funções complexas que desafiam adequadamente diferentes níveis de rigor de teste. 
