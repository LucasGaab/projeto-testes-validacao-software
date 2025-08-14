# Resumo da Implementação

## Funções Implementadas e Bugs

### 1. `calcularFatorial(n)`
- **Bug:** Verificação de overflow tardia.
- **Status da Detecção:** **NÃO DETECTADO**. O oráculo do teste (`.toBe(-1)`) validou o comportamento da função com bug, mascarando a falha.

### 2. `calcularMediaPonderada(valores, pesos, precisao)`
- **Bug:** Lógica de arredondamento incorreta.
- **Status da Detecção:** **DETECTADO POR TODOS OS CRITÉRIOS**. A falha era tão evidente que qualquer teste que executasse a linha defeituosa a encontrava.

### 3. `classificarNumero(numero)`
- **Bug:** Condição incorreta (`>=` vs `>`) para números abundantes.
- **Status da Detecção:** **NÃO DETECTADO**. O bug na declaração `else if` se mostrou inalcançável, pois a condição `if` anterior para números perfeitos sempre era satisfeita primeiro.

### 4. `converterBase(numero, baseOrigem, baseDestino)`
- **Bug:** Validação de caracteres inválidos via `parseInt` era falha.
- **Status da Detecção:** **NÃO DETECTADO**. Os testes cobriram apenas o caso de falha total (`'G'`), que a função tratava corretamente. O bug de falha parcial (ex: `'1A2G'`) não foi testado, e o oráculo para o teste existente mascarou a falha.

### 5. `avaliarExpressao(expressao)`
- **Bugs:**
    1.  Não trata `-Infinity`.
    2.  Não trata arredondamento de negativos.
- **Status da Detecção:** Apenas o **bug do `-Infinity`** foi **DETECTADO**. O segundo bug não foi capturado por nenhuma suíte.

---

## Suítes de Teste: Análise Revisada de Custo e Eficácia

| Suíte de Teste | Custo Total (Nº de Testes) | Eficácia (Bugs Detectados) | Análise de Eficácia Real |
| :--- | :--- | :--- | :--- |
| **Statement Coverage** | 25 | 1 de 6 | **Muito Baixa.** Detectou apenas o bug óbvio e onipresente em `mediaPonderada`. Mostrou-se um critério ineficaz e superficial. |
| **Branch Coverage** | 33 | 2 de 6 | **Baixa.** Representou o maior salto de eficácia. Além do bug em `mediaPonderada`, foi o critério mais simples a detectar o bug do `-Infinity` em `avaliarExpressao`. |
| **MC/DC Coverage** | 31 | 2 de 6 | **Baixa.** Apesar de seu rigor teórico, não ofereceu vantagem prática sobre o Branch Coverage, detectando os mesmos 2 bugs. |
| **All-Uses Coverage** | 33 | 2 de 6 | **Baixa.** Similar ao MC/DC, o foco no fluxo de dados não foi capaz de revelar falhas adicionais que o Branch Coverage já não tivesse encontrado. |
| **Path Coverage** | 38 | 2 de 6 | **Baixa.** Foi o critério mais custoso em número de testes, mas não trouxe nenhum benefício adicional na detecção de falhas em comparação com o Branch Coverage. |

---

## Bugs Intencionais e Detecção (Conforme Resultados)

### 1. Bug de Arredondamento (`calcularMediaPonderada`)
- **Tipo:** Erro de lógica condicional.
- **Detecção:** **Statement Coverage** e todos os critérios superiores.
- **Exemplo que Detecta:** `expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98)` (Falha: retorna `2`).

### 2. Bug de Avaliação `-Infinity` (`avaliarExpressao`)
- **Tipo:** Erro de tratamento de casos especiais.
- **Detecção:** **Branch Coverage** e todos os critérios superiores.
- **Exemplo que Detecta:** `expect(avaliarExpressao('-1/0')).toBe(null)` (Falha: retorna `-Infinity`).

---

## Resultados do Experimento (Análise Real)

### Métricas Coletadas
- Apenas 2 dos 6 bugs intencionais foram de fato detectados por qualquer suíte.
- O bug em `mediaPonderada` foi detectado por todos.
- O bug de `-Infinity` em `avaliarExpressao` foi detectado apenas a partir do Branch Coverage.
- Os bugs em `calcularFatorial`, `classificarNumero` e `converterBase` não foram detectados por **nenhum** critério.

### Validação das Hipóteses
- **H1 (Rigor vs. Eficácia):** **Parcialmente Validada.** Houve um pequeno aumento de eficácia ao passar de Statement para Branch (de 1 para 2 bugs detectados). No entanto, a partir do Branch, nenhum critério mais rigoroso (MC/DC, Path, All-Uses) conseguiu detectar falhas adicionais.
- **H2 (Custo vs. Rigor):** **Validada.** O custo em número de testes aumentou com o rigor (de 25 para Statement até 38 para Path), mas esse aumento de custo não se traduziu em maior eficácia após o nível de Branch.
- **H3 (Custo-Benefício):** **Validada, com ressalvas.** O **Branch Coverage** apresentou o melhor custo-benefício de longe, pois foi o ponto de maior ganho de eficácia. Investir em critérios mais rigorosos, neste cenário, não trouxe retorno.

---

## Conclusões Revisadas
1.  **A Qualidade do Oráculo é Suprema:** O experimento demonstrou que a cobertura estrutural é inútil sem um oráculo preciso. Bugs foram executados, mas não detectados porque o comportamento final da função defeituosa satisfez os testes.
2.  **Bugs Podem Ser Inalcançáveis:** A lógica do código pode impedir que uma linha defeituosa seja acionada de uma maneira que revele a falha (como visto em `classificarNumero`).
3.  **Branch Coverage é um Ponto de Partida Valioso:** O maior ganho na capacidade de detecção de falhas ocorreu ao se mover do critério mais básico (Statement) para o Branch Coverage.
4.  **Rigor Nem Sempre Compensa:** Este experimento é um exemplo prático de que, em alguns cenários, o investimento significativo para satisfazer critérios mais complexos como Path ou MC/DC pode não resultar em uma maior detecção de falhas, questionando seu custo-benefício em projetos que não sejam de missão crítica.
