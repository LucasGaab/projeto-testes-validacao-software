const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('Branch Coverage Suite', () => {
  test('should cover all branches in calcularFatorial', () => {
    expect(calcularFatorial(-1)).toBe(-1);  // n < 0: true
    expect(calcularFatorial(0)).toBe(1);    // n === 0: true
    expect(calcularFatorial(1)).toBe(1);    // n === 1: true
    expect(calcularFatorial(5)).toBe(120);  // n > 1: true, loop execution
    expect(calcularFatorial(21)).toBe(-1);  // overflow condition: true
  });

  test('should cover all branches in calcularMediaPonderada', () => {
    expect(calcularMediaPonderada(null, null)).toBe(null);           // validação: true
    expect(calcularMediaPonderada([], [])).toBe(0);                  // array vazio: true
    expect(calcularMediaPonderada([1], [0])).toBe(null);             // peso <= 0: true
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5);        // cálculo normal
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2);       // arredondamento bug
  });

  test('should cover all branches in classificarNumero', () => {
    expect(classificarNumero(0)).toBe('invalido');     // numero <= 0: true
    expect(classificarNumero(1)).toBe('deficiente');   // numero === 1: true
    expect(classificarNumero(6)).toBe('perfeito');     // somaDivisores === numero: true
    expect(classificarNumero(12)).toBe('abundante');   // somaDivisores >= numero: true (BUG)
    expect(classificarNumero(8)).toBe('deficiente');   // somaDivisores < numero: true
  });

  test('should cover all branches in converterBase', () => {
    expect(converterBase('10', 1, 10)).toBe(null);     // baseOrigem < 2: true
    expect(converterBase('10', 2, 10)).toBe('2');      // conversão válida
    expect(converterBase('G', 16, 10)).toBe(null);     // caractere inválido: true
    expect(converterBase(10, 10, 2)).toBe('1010');     // conversão número
  });

  test('should cover all branches in avaliarExpressao', () => {
    expect(avaliarExpressao('')).toBe(null);           // expressão vazia: true
    expect(avaliarExpressao('2+3')).toBe(5);           // expressão válida
    expect(avaliarExpressao('2+3*4')).toBe(14);        // precedência
    expect(avaliarExpressao('2/0')).toBe(null);        // resultado infinito: true
  });
});