const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('Statement Coverage Suite', () => {
  test('should execute all statements in calcularFatorial', () => {
    calcularFatorial(-1); // Executa linha de validação
    calcularFatorial(0);  // Executa linha de caso especial
    calcularFatorial(1);  // Executa linha de caso especial
    calcularFatorial(5);  // Executa loop e retorno
  });

  test('should execute all statements in calcularMediaPonderada', () => {
    calcularMediaPonderada(null, null); // Executa validação de entrada
    calcularMediaPonderada([], []);      // Executa validação de array vazio
    calcularMediaPonderada([1, 2], [0, 1]); // Executa validação de pesos
    calcularMediaPonderada([1, 2], [1, 1]); // Executa cálculo completo
  });

  test('should execute all statements in classificarNumero', () => {
    classificarNumero(0);   // Executa validação de entrada
    classificarNumero(1);   // Executa caso especial
    classificarNumero(6);   // Executa cálculo de divisores
  });

  test('should execute all statements in converterBase', () => {
    converterBase('10', 2, 10);   // Executa conversão de string
    converterBase(10, 10, 2);     // Executa conversão de número
    converterBase('FF', 16, 10);  // Executa conversão hexadecimal
  });

  test('should execute all statements in avaliarExpressao', () => {
    avaliarExpressao('');         // Executa validação de entrada vazia
    avaliarExpressao('2+3');      // Executa avaliação válida
    avaliarExpressao('2+3*4');    // Executa expressão com precedência
  });
});