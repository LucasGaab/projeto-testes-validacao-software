# Experimento Empírico: Comparação de Critérios de Cobertura Estrutural

## 1\. Introdução

Este projeto contém um experimento empírico comparativo para avaliar a eficácia e o custo de diferentes *critérios de cobertura estrutural de testes*. O objetivo é ir além da revisão da literatura, gerando dados empíricos em um ambiente controlado para validar ou refutar hipóteses comuns sobre a relação entre o rigor da cobertura, o esforço de teste e a capacidade de detecção de falhas.

O experimento foi conduzido em um projeto Node.js simples, math-utils, que contém um bug intencional, permitindo uma medição precisa de desempenho de cada critério.

## 2\. Hipóteses de Pesquisa

O experimento busca testar as seguintes hipóteses:

  * *H1 (Rigor vs. Eficácia):* Critérios de cobertura mais rigorosos (ex: Cobertura de Desvio, MC/DC) detectarão uma porcentagem significativamente maior de falhas do que critérios menos rigorosos (ex: Cobertura de Instrução).
  * *H2 (Custo vs. Rigor):* O custo para atingir a cobertura, medido pelo número de casos de teste, será significativamente maior para critérios mais rigorosos.
  * *H3 (Custo-Benefício):* Existirá um "ponto ótimo" de critério que oferece o melhor equilíbrio entre a capacidade de detecção de falhas e o custo de geração/manutenção dos testes.

## 3\. Metodologia do Experimento

O experimento foi dividido nas seguintes etapas:

1.  *Seleção do Programa-Alvo:* Um módulo Node.js, math-utils, foi criado com duas funções (isEven e isPrime), sendo que a primeira contém um bug intencional para ser detectado.
2.  *Geração das Suítes de Teste:* Três suítes de teste foram criadas manualmente, cada uma focada em um critério específico:
      * *Cobertura de Instrução (Statement Coverage):* A suíte mais simples, que apenas executa todas as linhas de código.
      * *Cobertura de Desvio (Branch Coverage):* A suíte que explora os caminhos de decisão (verdadeiro e falso) do código.
      * *Cobertura MC/DC (Modified Condition/Decision Coverage):* A suíte que testa as condições de forma independente para influenciar o resultado da decisão.
3.  *Execução e Medição:* Cada suíte de teste foi executada contra a versão defeituosa do math-utils. As seguintes métricas foram coletadas:
      * *Custo:* O número de casos de teste em cada suíte.
      * *Eficácia:* Se a suíte conseguiu detectar o bug (se algum teste falhou).
4.  *Análise dos Resultados:* Os dados coletados foram analisados para comparar o custo-benefício de cada critério e validar as hipóteses de pesquisa.

## 4\. Estrutura do Projeto


/criterios-cobertura-experimento
├── /programas-alvo
│   └── /math-utils       // Nosso projeto com o bug
├── /suítes-de-teste-geradas
│   └── /math-utils       // Suítes criadas para cada critério
├── /resultados
│   └── resultados-math-utils.json // Dados coletados
├── /scripts
│   ├── 01_preparar-projetos.js
│   ├── 02_gerar-suites-de-teste.js
│   ├── 03_executar-testes-e-medir.js
│   ├── 04_analisar-dados.js
└── README.md


## 5\. Como Executar o Experimento

Para replicar o experimento, siga os passos abaixo:

1.  *Clone o repositório:* (Se estiver em um)
    bash
    git clone [URL_DO_REPOSITORIO]
    cd criterios-cobertura-experimento
    
2.  *Instale as dependências:*
    bash
    cd programas-alvo/math-utils
    npm install jest nyc
    
3.  *Execute os scripts em sequência:*
    bash
    # Volte para o diretório raiz
    cd ../..

    # 1. Prepara o projeto-alvo (apenas um log)
    node scripts/01_preparar-projetos.js

    # 2. Gera as suítes de teste (copia arquivos)
    node scripts/02_gerar-suites-de-teste.js

    # 3. Executa os testes e mede custo e eficácia
    node scripts/03_executar-testes-e-medir.js

    # 4. Analisa os resultados e valida as hipóteses
    node scripts/04_analisar-dados.js
    

## 6\. Resultados e Análise

Após a execução do script 04_analisar-dados.js, os resultados da validação das hipóteses serão exibidos no terminal, confirmando empiricamente a relação entre rigor, custo e eficácia dos critérios de cobertura estrutural.

  * A *Cobertura de Instrução* falhou em detectar o bug com um custo baixo.
  * A *Cobertura de Desvio* e *MC/DC* conseguiram detectar o bug, mas com um custo de teste maior, validando as hipóteses *H1* e *H2*.
  * A análise de custo-benefício mostra que critérios mais rigorosos oferecem um melhor retorno sobre o investimento em termos de qualidade, mesmo com um custo incremental, validando a hipótese *H3*.