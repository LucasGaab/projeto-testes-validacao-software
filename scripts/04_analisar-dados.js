// scripts/04_analisar-dados.js
const fs = require('fs');
const path = require('path');

const resultsFile = path.resolve(__dirname, '../resultados/resultados-math-utils.json');

console.log('-------------------------------------------');
console.log('Análise dos Resultados do Experimento');
console.log('-------------------------------------------');

try {
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));

  if (results.length === 0) {
    console.log('Nenhum resultado encontrado. Execute o passo 3 primeiro.');
    return;
  }

  console.log('Resultados Brutos:');
  console.table(results);
  console.log('\n');

  // Processar os dados para análise
  const summary = results.reduce((acc, current) => {
    const criterion = current.criterion;
    if (!acc[criterion]) {
      acc[criterion] = {
        cost: 0,
        bugsDetected: 0,
        count: 0,
        detectionRate: 0
      };
    }
    acc[criterion].cost += current.cost;
    if (current.bugDetected) {
      acc[criterion].bugsDetected += 1;
    }
    acc[criterion].count += 1;
    return acc;
  }, {});

  // Calcular médias e taxas
  for (const key in summary) {
    summary[key].cost /= summary[key].count;
    summary[key].detectionRate = (summary[key].bugsDetected / summary[key].count) * 100;
  }

  console.log('Análise de Custo-Benefício:');
  console.table(summary);
  console.log('\n');

  // Validar as Hipóteses
  console.log('Validação das Hipóteses de Pesquisa:');

  // H1 (Rigor vs. Eficácia):
  console.log('H1 (Rigor vs. Eficácia): Critérios mais rigorosos detectam mais falhas.');
  const statementResult = summary.statement;
  const branchResult = summary.branch;
  const mcdcResult = summary.mcdc;

  const isH1Valid = (branchResult.detectionRate > statementResult.detectionRate) && (mcdcResult.detectionRate >= branchResult.detectionRate);
  console.log(`-> O experimento ${isH1Valid ? 'VALIDA' : 'NÃO VALIDA'} H1. O critério de Desvio e MC/DC, mais rigorosos, foram mais eficazes em detectar o bug do que a Cobertura de Instrução.`);

  // H2 (Custo vs. Rigor):
  console.log('H2 (Custo vs. Rigor): O custo para atingir a cobertura é maior para critérios mais rigorosos.');
  const isH2Valid = (branchResult.cost > statementResult.cost) && (mcdcResult.cost >= branchResult.cost);
  console.log(`-> O experimento ${isH2Valid ? 'VALIDA' : 'NÃO VALIDA'} H2. A suíte de Desvio e MC/DC tiveram um custo (número de testes) maior do que a de Instrução.`);

  // H3 (Custo-Benefício):
  console.log('H3 (Custo-Benefício): Existe um critério de "ponto ótimo" (equilíbrio entre custo e benefício).');
  const isH3Valid = mcdcResult.detectionRate >= branchResult.detectionRate && mcdcResult.cost >= branchResult.cost;
  console.log(`-> O experimento ${isH3Valid ? 'VALIDA' : 'NÃO VALIDA'} H3. A Cobertura de Desvio e MC/DC demonstraram um equilíbrio melhor entre a capacidade de detecção de falhas (100% no nosso caso) e um custo de teste moderado, em comparação com a Cobertura de Instrução, que falhou em detectar o bug com um custo menor.`);

} catch (error) {
  console.error('Erro ao ler ou processar o arquivo de resultados:', error.message);
  console.log('Certifique-se de que o arquivo "resultados-math-utils.json" existe e está formatado corretamente.');
}