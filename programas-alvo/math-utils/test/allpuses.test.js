const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('All-p-uses Coverage Suite', () => {
  test('should cover all predicate uses in calcularFatorial', () => {
    // Predicado: n < 0
    expect(calcularFatorial(-1)).toBe(-1);  // true
    expect(calcularFatorial(0)).toBe(1);    // false
    
    // Predicado: n === 0
    expect(calcularFatorial(0)).toBe(1);    // true
    expect(calcularFatorial(1)).toBe(1);    // false
    
    // Predicado: n === 1
    expect(calcularFatorial(1)).toBe(1);    // true
    expect(calcularFatorial(2)).toBe(2);    // false
    
    // Predicado: i <= n
    expect(calcularFatorial(3)).toBe(6);    // true (loop)
    expect(calcularFatorial(0)).toBe(1);    // false (não entra no loop)
    
    // Predicado: resultado > Number.MAX_SAFE_INTEGER
    expect(calcularFatorial(18)).toBe(-1);  // true
    expect(calcularFatorial(17)).toBe(355687428096000); // false
  });

  test('should cover all predicate uses in calcularMediaPonderada', () => {
    // Predicado: !valores || !pesos || valores.length !== pesos.length
    expect(calcularMediaPonderada(null, [1])).toBe(null);   // !valores: true
    expect(calcularMediaPonderada([1], null)).toBe(null);   // !pesos: true
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null); // length !==: true
    expect(calcularMediaPonderada([1], [1])).toBe(1);       // todas false
    
    // Predicado: valores.length === 0
    expect(calcularMediaPonderada([], [])).toBe(0);         // true
    expect(calcularMediaPonderada([1], [1])).toBe(1);       // false
    
    // Predicado: i < pesos.length
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5); // true (loop)
    expect(calcularMediaPonderada([], [])).toBe(0);           // false (não entra no loop)
    
    // Predicado: pesos[i] <= 0
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null); // true
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5);  // false
    
    // Predicado: !todosPesosPositivos || somaPesos === 0
    expect(calcularMediaPonderada([1], [0])).toBe(null);       // !todosPesosPositivos: true
    expect(calcularMediaPonderada([1], [1])).toBe(1);          // ambas false
    
    // Predicado: i < valores.length
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5); // true (loop)
    expect(calcularMediaPonderada([], [])).toBe(0);           // false (não entra no loop)
    
    // Predicado: parteDecimal > 0.95 && precisao === 2
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2); // ambas true (BUG)
    expect(calcularMediaPonderada([1.5, 2], [1, 1])).toBe(1.75); // parteDecimal > 0.95: false
    expect(calcularMediaPonderada([1.95, 2], [1, 1], 3)).toBe(1.975); // precisao === 2: false
  });

  test('should cover all predicate uses in classificarNumero', () => {
    // Predicado: numero <= 0
    expect(classificarNumero(0)).toBe('invalido');   // true
    expect(classificarNumero(1)).toBe('deficiente'); // false
    
    // Predicado: numero === 1
    expect(classificarNumero(1)).toBe('deficiente'); // true
    expect(classificarNumero(2)).toBe('deficiente'); // false
    
    // Predicado: i <= limite
    expect(classificarNumero(4)).toBe('deficiente'); // true (loop)
    expect(classificarNumero(1)).toBe('deficiente'); // false (não entra no loop)
    
    // Predicado: numero % i === 0
    expect(classificarNumero(4)).toBe('deficiente'); // true
    expect(classificarNumero(3)).toBe('deficiente'); // false
    
    // Predicado: divisorComplementar !== i && divisorComplementar !== numero
    expect(classificarNumero(6)).toBe('perfeito');   // ambas true
    expect(classificarNumero(4)).toBe('deficiente'); // divisorComplementar !== numero: false
    expect(classificarNumero(9)).toBe('deficiente'); // divisorComplementar !== i: false
    
    // Predicado: somaDivisores === numero
    expect(classificarNumero(6)).toBe('perfeito');   // true
    expect(classificarNumero(8)).toBe('deficiente'); // false
    
    // Predicado: somaDivisores >= numero (BUG)
    expect(classificarNumero(12)).toBe('abundante'); // true (BUG)
    expect(classificarNumero(8)).toBe('deficiente'); // false
  });

  test('should cover all predicate uses in converterBase', () => {
    // Predicado: baseOrigem < 2 || baseOrigem > 36
    expect(converterBase('10', 1, 10)).toBe(null);   // baseOrigem < 2: true
    expect(converterBase('10', 37, 10)).toBe(null);  // baseOrigem > 36: true
    expect(converterBase('10', 16, 10)).toBe('16');  // ambas false
    
    // Predicado: baseDestino < 2 || baseDestino > 36
    expect(converterBase('10', 10, 1)).toBe(null);   // baseDestino < 2: true
    expect(converterBase('10', 10, 37)).toBe(null);  // baseDestino > 36: true
    expect(converterBase('10', 10, 16)).toBe('A');   // ambas false
    
    // Predicado: typeof numero === 'string'
    expect(converterBase('10', 10, 2)).toBe('1010'); // true
    expect(converterBase(10, 10, 2)).toBe('1010');   // false
    
    // Predicado: i < numeroUpper.length
    expect(converterBase('ABC', 16, 10)).toBe('2748'); // true (loop)
    expect(converterBase('', 16, 10)).toBe('0');       // false (não entra no loop)
    
    // Predicado: !caracteresValidos.includes(numeroUpper[i])
    expect(converterBase('G', 16, 10)).toBe(null);   // true
    expect(converterBase('F', 16, 10)).toBe('15');   // false
    
    // Predicado: isNaN(decimal)
    expect(converterBase('invalid', 10, 2)).toBe(null); // true
    expect(converterBase('10', 10, 2)).toBe('1010');    // false
    
    // Predicado: baseDestino === 10
    expect(converterBase('1010', 2, 10)).toBe('10'); // true
    expect(converterBase('10', 10, 2)).toBe('1010'); // false
  });

  test('should cover all predicate uses in avaliarExpressao', () => {
    // Predicado: !expressao || expressao.length === 0
    expect(avaliarExpressao('')).toBe(null);         // expressao vazia: true
    expect(avaliarExpressao('2+3')).toBe(5);         // ambas false
    
    // Predicado: /^[0-9+\-*/().]+$/.test(expressao)
    expect(avaliarExpressao('2+3a')).toBe(null);     // false
    expect(avaliarExpressao('2+3')).toBe(5);         // true
    
    // Predicado: !isFinite(resultado)
    expect(avaliarExpressao('2/0')).toBe(null);      // true
    expect(avaliarExpressao('2+3')).toBe(5);         // false
    
    // Predicado: Math.abs(resultado) < 1e-10
    expect(avaliarExpressao('1e-11')).toBe(0);       // true
    expect(avaliarExpressao('0.1')).toBe(0.1);       // false
  });
}); 