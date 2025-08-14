# Resumo da Implementação: Funções Matemáticas Complexas com Bugs Intencionais

## Funções Implementadas

### 1. `calcularFatorial(n)`
**Complexidade:** Média-Alta
- Múltiplas validações de entrada
- Loop com condição de parada
- Verificação de overflow
- **Bug:** Verificação de overflow que não previne a multiplicação que causa o estouro do limite do número seguro.

### 2. `calcularMediaPonderada(valores, pesos, precisao)`
**Complexidade:** Alta
- Validações de arrays e tipos
- Múltiplos loops
- Lógica condicional para arredondamento
- **Bug:** A lógica de arredondamento para cima é acionada por uma condição que não trata corretamente todos os casos próximos a um inteiro.

### 3. `classificarNumero(numero)`
**Complexidade:** Média
- Cálculo de divisores próprios
- Lógica de classificação matemática
- **Bug:** Condição incorreta para números abundantes (`>=` em vez de `>`), o que faz com que números perfeitos sejam classificados incorretamente como abundantes.

### 4. `converterBase(numero, baseOrigem, baseDestino)`
**Complexidade:** Alta
- Validação de bases numéricas
- Conversão entre sistemas numéricos
- **Bug:** A função confia no `parseInt`, que ignora caracteres inválidos após o início de uma string, em vez de invalidar a entrada inteira.

### 5. `avaliarExpressao(expressao)`
**Complexidade:** Média-Alta
- Validação de expressões matemáticas via regex
- Uso de `eval()` com tratamento de erro
- **Bugs:** Dois bugs relacionados ao tratamento de casos especiais:
    1. A verificação de infinito trata apenas `Infinity` positivo, ignorando `-Infinity`.
    2. O arredondamento para zero funciona apenas para números positivos, ignorando resultados negativos muito próximos de zero.

## Suítes de Teste Criadas e Avaliadas

| Suíte de Teste | Custo Total (Nº de Testes) | Eficácia (Bugs Detectados) | Análise de Eficácia |
| :--- | :--- | :--- | :--- |
| **Statement Coverage** | 25 | 1 de 6 | **Baixa.** Detectou apenas o bug de overflow em `calcularFatorial`. Falhou em todos os outros, demonstrando ser um critério superficial. |
| **Branch Coverage** | 33 | 4 de 6 | **Média-Alta.** Um salto significativo. Detectou o overflow em `fatorial`, os dois bugs em `avaliarExpressao`, e o bug de arredondamento em `mediaPonderada`. Falhou em `classificarNumero` e `converterBase`. |
| **Path Coverage** | 38 | **6 de 6** | **Muito Alta.** Detectou todos os bugs. A necessidade de cobrir mais caminhos forçou a criação de testes que revelaram as falhas em `classificarNumero` e `converterBase`. |
| **MC/DC Coverage** | 31 | **6 de 6** | **Muito Alta.** Detectou todos os bugs. A análise rigorosa das condições booleanas forçou testes específicos que revelaram todas as falhas, com um custo ligeiramente menor que o Path Coverage. |
| **All-Uses Coverage** | 33 | **6 de 6** | **Muito Alta.** Detectou todos os bugs. Rastrear o ciclo de vida das variáveis (definição-uso) expôs todas as anomalias, incluindo a falha de validação em `converterBase`. |

## Bugs Intencionais e Detecção

### 1. Bug de Overflow (calcularFatorial)
- **Tipo:** Erro de limite (boundary).
- **Detecção:** **Statement Coverage** e todos os critérios superiores.
- **Exemplo que Detecta:** `expect(calcularFatorial(21)).toBe(-1)`.

### 2. Bug de Arredondamento (calcularMediaPonderada)
- **Tipo:** Erro de lógica condicional.
- **Detecção:** **Branch Coverage** e todos os critérios superiores.
- **Exemplo que Detecta:** `expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98)`.

### 3. Bug de Classificação (classificarNumero)
- **Tipo:** Erro de operador relacional.
- **Detecção:** **Path Coverage**, **MC/DC** e **All-Uses**.
- **Exemplo que Detecta:** `expect(classificarNumero(6)).toBe('perfeito')`. A função com bug retorna 'abundante', causando a falha do teste.

### 4. Bug de Validação (converterBase)
- **Tipo:** Erro de fluxo de dados/validação de entrada.
- **Detecção:** **Branch Coverage** e todos os critérios superiores.
- **Exemplo que Detecta:** `expect(converterBase('G', 16, 10)).toBe(null)`.

### 5. Bugs de Avaliação (avaliarExpressao)
- **Tipo:** Erro de tratamento de casos especiais.
- **Detecção:** **Branch Coverage** e todos os critérios superiores.
- **Exemplos que Detectam:**
    - Bug 1 (-Infinity): `expect(avaliarExpressao('-1/0')).toBe(null)`.
    - Bug 2 (Negativo ~0): `expect(avaliarExpressao('0.2 - 0.3')).toBe(0)`.

## Resultados do Experimento

### Métricas Coletadas
- **Statement Coverage:** Atingiu 100% de cobertura de instrução com 25 testes, mas detectou apenas 1 dos 6 bugs.
- **Branch Coverage:** Atingiu 100% de cobertura de desvio com 33 testes, detectando 4 dos 6 bugs.
- **MC/DC e All-Uses:** Com 31 e 33 testes respectivamente, detectaram todos os 6 bugs, mostrando alta eficácia.
- **Path Coverage:** Foi o mais custoso (38 testes), mas também detectou todos os 6 bugs.

### Validação das Hipóteses
- **H1 (Rigor vs. Eficácia):** **Validada.** Houve uma clara correlação positiva. Critérios mais rigorosos como MC/DC e All-Uses foram significativamente mais eficazes (100% de detecção) do que o Statement Coverage (16.7% de detecção).
- **H2 (Custo vs. Rigor):** **Validada.** O custo, medido pelo número de testes necessários para atingir 100% de cobertura, aumentou com o rigor do critério (de 25 testes para Statement até 38 para Path).
- **H3 (Custo-Benefício):** **Validada.** O critério de Branch Coverage apresentou um grande salto de eficácia com um aumento moderado de custo. Os critérios MC/DC e All-Uses mostraram o melhor equilíbrio, alcançando eficácia máxima com um custo menor que o Path Coverage.

## Conclusões
1.  **Sucesso na Implementação:** Todas as funções foram implementadas com sucesso e testadas.
2.  **Bugs Efetivos:** Os bugs intencionais são sutis e realistas, adequados para testar diferentes critérios.
3.  **Diferenciação Clara de Critérios:** O experimento demonstra com dados que a escolha do critério de cobertura impacta diretamente a qualidade da suíte de testes e sua capacidade de encontrar falhas.
