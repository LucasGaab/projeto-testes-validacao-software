const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('Path Coverage Suite', () => {
  test('should cover all paths in calcularFatorial', () => {
    // Caminho 1: n < 0 → return -1
    expect(calcularFatorial(-1)).toBe(-1);
    
    // Caminho 2: n === 0 → return 1
    expect(calcularFatorial(0)).toBe(1);
    
    // Caminho 3: n === 1 → return 1
    expect(calcularFatorial(1)).toBe(1);
    
    // Caminho 4: n > 1, loop executa, sem overflow → return resultado
    expect(calcularFatorial(5)).toBe(120);
    
    // Caminho 5: n > 1, loop executa, com overflow → return -1
    expect(calcularFatorial(21)).toBe(-1);
    
    // Caminho 6: n > 1, loop executa múltiplas vezes → return resultado
    expect(calcularFatorial(10)).toBe(3628800);
  });

  test('should cover all paths in calcularMediaPonderada', () => {
    // Caminho 1: !valores → return null
    expect(calcularMediaPonderada(null, [1])).toBe(null);
    
    // Caminho 2: !pesos → return null
    expect(calcularMediaPonderada([1], null)).toBe(null);
    
    // Caminho 3: valores.length !== pesos.length → return null
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null);
    
    // Caminho 4: valores.length === 0 → return 0
    expect(calcularMediaPonderada([], [])).toBe(0);
    
    // Caminho 5: pesos[i] <= 0 → return null
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null);
    
    // Caminho 6: somaPesos === 0 → return null
    expect(calcularMediaPonderada([1], [0])).toBe(null);
    
    // Caminho 7: cálculo normal, parteDecimal <= 0.95 → arredondamento normal
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
    
    // Caminho 8: cálculo normal, parteDecimal > 0.95, precisao === 2 → BUG
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2);
    
    // Caminho 9: cálculo normal, parteDecimal > 0.95, precisao !== 2 → arredondamento normal
    expect(calcularMediaPonderada([1.95, 2], [1, 1], 3)).toBe(1.975);
    
    // Caminho 10: múltiplos valores e pesos → cálculo complexo
    expect(calcularMediaPonderada([1, 2, 3], [1, 2, 3])).toBe(2.33);
  });

  test('should cover all paths in classificarNumero', () => {
    // Caminho 1: numero <= 0 → return 'invalido'
    expect(classificarNumero(0)).toBe('invalido');
    
    // Caminho 2: numero === 1 → return 'deficiente'
    expect(classificarNumero(1)).toBe('deficiente');
    
    // Caminho 3: numero > 1, sem divisores → return 'deficiente'
    expect(classificarNumero(3)).toBe('deficiente');
    
    // Caminho 4: numero > 1, com divisores, somaDivisores === numero → return 'perfeito'
    expect(classificarNumero(6)).toBe('perfeito');
    
    // Caminho 5: numero > 1, com divisores, somaDivisores >= numero → return 'abundante' (BUG)
    expect(classificarNumero(12)).toBe('abundante');
    
    // Caminho 6: numero > 1, com divisores, somaDivisores < numero → return 'deficiente'
    expect(classificarNumero(8)).toBe('deficiente');
    
    // Caminho 7: número com múltiplos divisores → cálculo complexo
    expect(classificarNumero(16)).toBe('deficiente');
    
    // Caminho 8: número quadrado perfeito → divisorComplementar === i
    expect(classificarNumero(9)).toBe('deficiente');
  });

  test('should cover all paths in converterBase', () => {
    // Caminho 1: baseOrigem < 2 → return null
    expect(converterBase('10', 1, 10)).toBe(null);
    
    // Caminho 2: baseOrigem > 36 → return null
    expect(converterBase('10', 37, 10)).toBe(null);
    
    // Caminho 3: baseDestino < 2 → return null
    expect(converterBase('10', 10, 1)).toBe(null);
    
    // Caminho 4: baseDestino > 36 → return null
    expect(converterBase('10', 10, 37)).toBe(null);
    
    // Caminho 5: typeof numero !== 'string' → conversão direta
    expect(converterBase(10, 10, 2)).toBe('1010');
    
    // Caminho 6: typeof numero === 'string', caractere inválido → return null
    expect(converterBase('G', 16, 10)).toBe(null);
    
    // Caminho 7: typeof numero === 'string', isNaN(decimal) → return null
    expect(converterBase('invalid', 10, 2)).toBe(null);
    
    // Caminho 8: typeof numero === 'string', baseDestino === 10 → return decimal.toString()
    expect(converterBase('1010', 2, 10)).toBe('10');
    
    // Caminho 9: typeof numero === 'string', baseDestino !== 10 → return decimal.toString(baseDestino)
    expect(converterBase('10', 10, 16)).toBe('A');
    
    // Caminho 10: string vazia → conversão válida
    expect(converterBase('', 16, 10)).toBe('0');
    
    // Caminho 11: string com múltiplos caracteres → conversão complexa
    expect(converterBase('ABC', 16, 10)).toBe('2748');
  });

  test('should cover all paths in avaliarExpressao', () => {
    // Caminho 1: !expressao → return null
    expect(avaliarExpressao('')).toBe(null);
    
    // Caminho 2: expressao.length === 0 → return null
    expect(avaliarExpressao('')).toBe(null);
    
    // Caminho 3: regex inválida → return null
    expect(avaliarExpressao('2+3a')).toBe(null);
    
    // Caminho 4: eval() gera erro → return null
    expect(avaliarExpressao('2+')).toBe(null);
    
    // Caminho 5: !isFinite(resultado) → return null
    expect(avaliarExpressao('2/0')).toBe(null);
    
    // Caminho 6: Math.abs(resultado) < 1e-10 → return 0
    expect(avaliarExpressao('1e-11')).toBe(0);
    
    // Caminho 7: expressão válida simples → return resultado
    expect(avaliarExpressao('2+3')).toBe(5);
    
    // Caminho 8: expressão com espaços → return resultado
    expect(avaliarExpressao('2 + 3')).toBe(5);
    
    // Caminho 9: expressão complexa → return resultado
    expect(avaliarExpressao('2+3*4')).toBe(14);
    
    // Caminho 10: expressão com parênteses → return resultado
    expect(avaliarExpressao('(2+3)*4')).toBe(20);
    
    // Caminho 11: resultado próximo de zero mas não suficiente → return resultado
    expect(avaliarExpressao('1e-9')).toBe(1e-9);
  });
}); 