// scripts/02_gerar-suites-de-teste.js
const fs = require('fs');
const path = require('path');

const projectPath = path.resolve(__dirname, '../programas-alvo/math-utils/test');

console.log('-------------------------------------------');
console.log('Gerando suítes de teste para cada critério...');
console.log('-------------------------------------------');

// Simulação de geração: copiamos os arquivos de teste para os diretórios
// que representam as suítes geradas.
const suites = ['statement', 'branch', 'mcdc'];

suites.forEach(suite => {
  const sourcePath = path.join(projectPath, `${suite}.test.js`);
  const destinationDir = path.resolve(__dirname, `../suítes-de-teste-geradas/math-utils/${suite}`);

  // Crie o diretório de destino se ele não existir
  fs.mkdirSync(destinationDir, { recursive: true });

  const destinationPath = path.join(destinationDir, `${suite}.test.js`);
  fs.copyFileSync(sourcePath, destinationPath);

  console.log(`Suíte para Cobertura de ${suite} gerada em: ${destinationPath}`);
});

console.log('Todas as suítes de teste foram geradas e salvas.');
console.log('Próximo passo: Executar os testes e medir os resultados.');