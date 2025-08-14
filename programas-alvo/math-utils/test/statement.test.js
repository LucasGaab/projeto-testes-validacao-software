const {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
} = require('../src/index');

describe('Statement Coverage Suite (Corrigida)', () => {
  test('should execute all statements in calcularFatorial', () => {
    // Caminho principal com loop
    expect(calcularFatorial(5)).toBe(120);
    // Caminho para n < 0
    expect(calcularFatorial(-1)).toBe(-1);
    // Caminho para n === 0
    expect(calcularFatorial(0)).toBe(1);
     // Caminho que aciona a verificação de overflow
    expect(calcularFatorial(21)).toBe(-1);
  });

  test('should execute all statements in calcularMediaPonderada', () => {
    // Caminho de erro inicial
    expect(calcularMediaPonderada(null, [1])).toBe(null);
    // Caminho de array vazio
    expect(calcularMediaPonderada([], [])).toBe(0);
    // Caminho com peso inválido
    expect(calcularMediaPonderada([1], [0])).toBe(null);
    // Caminho normal com arredondamento padrão
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
    // Caminho que aciona o BUG do arredondamento para cima
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98);
  });

  test('should execute all statements in classificarNumero', () => {
    // Caminho inválido
    expect(classificarNumero(0)).toBe('invalido');
    // Caminho para numero === 1
    expect(classificarNumero(1)).toBe('deficiente');
    // Caminho para número perfeito (executa todo o loop e a lógica de divisores)
    expect(classificarNumero(6)).toBe('perfeito');
     // Caminho para número abundante (executa o else if)
    expect(classificarNumero(12)).toBe('abundante');
    // Caminho para número deficiente (executa o else final)
    expect(classificarNumero(8)).toBe('deficiente');
  });

  test('should execute all statements in converterBase', () => {
    // Caminho com base inválida
    expect(converterBase('10', 1, 10)).toBe(null);
    // Caminho com número string, caractere inválido
    expect(converterBase('G', 16, 10)).toBe(null);
    // Caminho com string vazia
    expect(converterBase('', 10, 2)).toBe('0');
    // Caminho com conversão de número para base 10
    expect(converterBase('A', 16, 10)).toBe('10');
    // Caminho com conversão de número para outra base
    expect(converterBase(10, 10, 2)).toBe('1010');
    // Caminho com NaN
    expect(converterBase('invalid', 10, 2)).toBe(null);
  });

  test('should execute all statements in avaliarExpressao', () => {
    // Caminho com expressão inválida (regex)
    expect(avaliarExpressao('2a+3')).toBe(null);
     // Caminho que gera erro no eval (try-catch)
    expect(avaliarExpressao('2+')).toBe(null);
    // Caminho com resultado infinito
    expect(avaliarExpressao('2/0')).toBe(null);
    // Caminho com arredondamento para zero
    expect(avaliarExpressao('1e-11')).toBe(0);
    // Caminho de execução normal
    expect(avaliarExpressao('2 + 3')).toBe(5);
  });
});
