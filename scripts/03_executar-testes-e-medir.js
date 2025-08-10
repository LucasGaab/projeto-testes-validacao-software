// scripts/03_executar-testes-e-medir.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve(__dirname, '../programas-alvo/math-utils');
const suitesDir = path.resolve(__dirname, '../suítes-de-teste-geradas/math-utils');
const resultsFile = path.resolve(__dirname, '../resultados/resultados-math-utils.json');

const suites = ['statement', 'branch', 'mcdc'];
const results = [];

async function runTestsAndMeasure() {
  console.log('-------------------------------------------');
  console.log('Executando testes e medindo métricas...');
  console.log('-------------------------------------------');

  for (const suite of suites) {
    console.log(`\nExecutando suíte de Cobertura de ${suite}...`);

    const testFilePath = path.join(suitesDir, suite, `${suite}.test.js`);

    // 1. Contar o custo (número de testes)
    const testContent = fs.readFileSync(testFilePath, 'utf8');
    const testCount = (testContent.match(/test\('/g) || []).length;
    console.log(`-> Custo (número de testes): ${testCount}`);

    // 2. Executar o Jest e medir a eficácia
    const command = `npm test -- --testPathPattern=${testFilePath}`;

    try {
      // Use 'exec' com uma Promise para aguardar a conclusão
      await new Promise((resolve, reject) => {
        exec(command, { cwd: projectDir }, (error, stdout, stderr) => {
          if (error) {
            // Se houver um erro, o Jest falhou, o que significa que o bug foi encontrado
            console.log('-> Eficácia: BUG DETECTADO!');
            results.push({
              criterion: suite,
              cost: testCount,
              bugDetected: true,
              details: stdout // Inclui a saída para referência
            });
            return resolve();
          }

          // Se não houver erro, todos os testes passaram, o bug NÃO foi encontrado
          console.log('-> Eficácia: Bug não detectado.');
          results.push({
            criterion: suite,
            cost: testCount,
            bugDetected: false
          });
          resolve();
        });
      });
    } catch (err) {
      console.error(`Erro ao executar o comando para a suíte ${suite}:`, err);
    }
  }

  // 3. Salvar os resultados
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log('\n-------------------------------------------');
  console.log(`Resultados salvos em ${resultsFile}`);
  console.log('Próximo passo: Análise dos resultados.');
}

runTestsAndMeasure();