# Experimento Empírico: Comparação de Critérios de Cobertura Estrutural

## 1. Introdução

Este projeto contém um experimento empírico comparativo para avaliar a eficácia e o custo de diferentes **critérios de cobertura estrutural de testes** em um conjunto ampliado de funções matemáticas. O objetivo é analisar como diferentes critérios de cobertura se comportam na detecção de bugs em cenários mais complexos.

O experimento foi expandido para incluir cinco funções matemáticas com diferentes tipos de bugs:
1. Cálculo de fatorial (tratamento de overflow)
2. Média ponderada (arredondamento)
3. Classificação de números (perfeitos/abundantes/deficientes)
4. Conversão entre sistemas numéricos (validação de entrada)
5. Resultado de expressões matemáticas (outputs especiais)

## 2. Hipóteses de Pesquisa Ampliadas

O experimento busca testar as seguintes hipóteses:

* **H1 (Rigor vs. Eficácia):** Critérios mais rigorosos (MC/DC, Path Coverage) detectarão mais tipos de bugs complexos do que critérios básicos.
* **H2 (Custo vs. Complexidade):** O custo para atingir a cobertura aumentará significativamente com a complexidade das funções.
* **H3 (Adequação por Tipo de Bug):** Diferentes tipos de bugs serão melhor detectados por diferentes critérios de cobertura.
* **H4 (Data Flow Effectiveness):** Critérios de fluxo de dados serão mais eficazes para bugs relacionados a valores incorretos.

## 3. Metodologia do Experimento

O experimento foi atualizado com as seguintes etapas:

1. **Programa-Alvo Ampliado:** O módulo `math-utils` agora contém cinco funções com bugs intencionais de diferentes categorias.
2. **Critérios Adicionais:** Foram incluídos critérios de Data Flow (All-uses, All-defs) e Path Coverage.
3. **Métricas Expandidas:**
   - Cobertura alcançada para cada função
   - Tempo de execução dos testes
   - Complexidade ciclomática de cada função
   - Taxa de detecção por tipo de bug

## 4. Como Executar o Experimento

Para replicar o experimento ampliado:

1. **Clone o repositório:**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute o experimento completo:**
   ```bash
   npm run test
   npm run test-coverage
   ```

## 6. Resultados Esperados

O experimento ampliado permitirá analisar:

1. **Eficácia por Tipo de Bug:**
   - Overflow numérico (Fatorial)
   - Problemas de arredondamento (Média)
   - Lógica condicional (Classificação)
   - Validação de entradas especiais (Conversão)
   - Resultados especiais de operações (Expressões)

2. **Custo por Critério:**
   - Número de casos de teste necessários
   - Complexidade dos casos de teste
   - Tempo de execução das suítes
   - Cobertura de código

## 7. Análise Preliminar

Com base nas funções adicionadas, esperamos que:

1. **MC/DC** seja mais eficaz para a função de classificação de números
2. **Data Flow** seja crucial para detectar bugs na conversão de bases
3. **Path Coverage** seja necessário para a avaliação de expressões
4. **Branch Coverage** seja suficiente para a média ponderada
5. **Statement Coverage** falhe em detectar vários dos bugs implementados

O relatório completo será gerado após a execução do script de análise.
