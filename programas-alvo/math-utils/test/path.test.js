const {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
} = require('../src/index');

describe('Path Coverage Suite (Corrigida)', () => {
  test('should cover all acyclic paths in calcularFatorial', () => {
    // Caminho 1: n < 0
    expect(calcularFatorial(-1)).toBe(-1);
    // Caminho 2: n === 0
    expect(calcularFatorial(0)).toBe(1);
    // Caminho 3: n === 1
    expect(calcularFatorial(1)).toBe(1);
    // Caminho 4: n > 1, loop executa uma vez, sem overflow
    expect(calcularFatorial(2)).toBe(2);
    // Caminho 5: n > 1, loop executa múltiplas vezes, sem overflow
    expect(calcularFatorial(5)).toBe(120);
    // Caminho 6: n > 1, loop executa, com overflow
    expect(calcularFatorial(21)).toBe(-1);
  });

  test('should cover all acyclic paths in calcularMediaPonderada', () => {
    // Caminho 1: !valores
    expect(calcularMediaPonderada(null, [1])).toBe(null);
    // Caminho 2: !pesos
    expect(calcularMediaPonderada([1], null)).toBe(null);
    // Caminho 3: length !==
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null);
    // Caminho 4: length === 0
    expect(calcularMediaPonderada([], [])).toBe(0);
    // Caminho 5: loop entra, peso <= 0
    expect(calcularMediaPonderada([1, 2], [1, 0])).toBe(null);
    // Caminho 6: cálculo normal, arredondamento para cima (BUG)
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98);
    // Caminho 7: cálculo normal, arredondamento padrão
    expect(calcularMediaPonderada([1.5, 2], [1, 1])).toBe(1.75);
    // Caminho 8: cálculo normal, arredondamento com precisão diferente
    expect(calcularMediaPonderada([1.96, 2], [1, 1], 3)).toBe(1.98);
  });

  test('should cover all acyclic paths in classificarNumero', () => {
    // Caminho 1: numero <= 0
    expect(classificarNumero(0)).toBe('invalido');
    // Caminho 2: numero === 1
    expect(classificarNumero(1)).toBe('deficiente');
    // Caminho 3: número primo (loop não encontra divisores)
    expect(classificarNumero(3)).toBe('deficiente');
    // Caminho 4: número perfeito
    expect(classificarNumero(6)).toBe('perfeito');
    // Caminho 5: número abundante (BUG)
    expect(classificarNumero(12)).toBe('abundante');
    // Caminho 6: número deficiente
    expect(classificarNumero(8)).toBe('deficiente');
    // Caminho 7: quadrado perfeito (divisorComplementar === i)
    expect(classificarNumero(9)).toBe('deficiente');
  });

  test('should cover all acyclic paths in converterBase', () => {
    // Caminho 1: baseOrigem < 2
    expect(converterBase('10', 1, 10)).toBe(null);
     // Caminho 2: baseDestino > 36
    expect(converterBase('10', 10, 37)).toBe(null);
    // Caminho 3: tipo é número
    expect(converterBase(10, 10, 2)).toBe('1010');
    // Caminho 4: tipo é string, string vazia
    expect(converterBase('', 10, 2)).toBe('0');
    // Caminho 5: tipo é string, caractere inválido
    expect(converterBase('G', 16, 10)).toBe(null);
    // Caminho 6: tipo é string, conversão ok, baseDestino === 10
    expect(converterBase('A', 16, 10)).toBe('10');
    // Caminho 7: tipo é string, conversão ok, baseDestino !== 10
    expect(converterBase('10', 10, 16)).toBe('A');
    // Caminho 8: tipo é string, conversão falha (isNaN)
    expect(converterBase('invalid', 10, 2)).toBe(null);
  });

 test('should cover all acyclic paths in avaliarExpressao', () => {
    // Caminho 1: !expressao
    expect(avaliarExpressao(null)).toBe(null);
    // Caminho 2: expressao.length === 0
    expect(avaliarExpressao('')).toBe(null);
    // Caminho 3: regex inválida
    expect(avaliarExpressao('2a+3')).toBe(null);
    // Caminho 4: eval() lança erro (try-catch)
    expect(avaliarExpressao('2+')).toBe(null);
    // Caminho 5: resultado é +infinito
    expect(avaliarExpressao('1/0')).toBe(null);
    // Caminho 6: resultado muito próximo de zero (positivo)
    expect(avaliarExpressao('1e-11')).toBe(0);
    // Caminho 7: resultado normal
    expect(avaliarExpressao('2+3')).toBe(5);

    // NOVO: Caminho 8: resultado é -infinito (CAPTURA O BUG 1)
    // O esperado é null, mas a função com bug retornará -Infinity.
    expect(avaliarExpressao('-1/0')).toBe(null);

    // NOVO: Caminho 9: resultado muito próximo de zero (negativo) (CAPTURA O BUG 2)
    // O esperado é 0, mas a função com bug retornará um número pequeno e negativo.
    expect(avaliarExpressao('0.2 - 0.3')).toBe(0);
});
});
