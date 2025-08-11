const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('MCDC Coverage Suite', () => {
  test('should cover MCDC for calcularFatorial conditions', () => {
    // Condição: n < 0
    expect(calcularFatorial(-1)).toBe(-1);  // n < 0: true
    expect(calcularFatorial(0)).toBe(1);    // n < 0: false
    
    // Condição: n === 0
    expect(calcularFatorial(0)).toBe(1);    // n === 0: true
    expect(calcularFatorial(1)).toBe(1);    // n === 0: false
    
    // Condição: n === 1
    expect(calcularFatorial(1)).toBe(1);    // n === 1: true
    expect(calcularFatorial(2)).toBe(2);    // n === 1: false
    
    // Condição: resultado > Number.MAX_SAFE_INTEGER
    expect(calcularFatorial(17)).toBe(355687428096000); // overflow: false
    expect(calcularFatorial(18)).toBe(-1);              // overflow: true
  });

  test('should cover MCDC for calcularMediaPonderada conditions', () => {
    // Condição: !valores || !pesos || valores.length !== pesos.length
    expect(calcularMediaPonderada(null, [1])).toBe(null);   // !valores: true
    expect(calcularMediaPonderada([1], null)).toBe(null);   // !pesos: true
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null); // length !==: true
    expect(calcularMediaPonderada([1], [1])).toBe(1);       // todas false
    
    // Condição: valores.length === 0
    expect(calcularMediaPonderada([], [])).toBe(0);         // length === 0: true
    expect(calcularMediaPonderada([1], [1])).toBe(1);       // length === 0: false
    
    // Condição: pesos[i] <= 0
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null); // peso <= 0: true
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5);  // peso <= 0: false
    
    // Condição: parteDecimal > 0.95 && precisao === 2
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2); // ambas true (BUG)
    expect(calcularMediaPonderada([1.5, 2], [1, 1])).toBe(1.75); // parteDecimal > 0.95: false
    expect(calcularMediaPonderada([1.95, 2], [1, 1], 3)).toBe(1.975); // precisao === 2: false
  });

  test('should cover MCDC for classificarNumero conditions', () => {
    // Condição: numero <= 0
    expect(classificarNumero(0)).toBe('invalido');   // numero <= 0: true
    expect(classificarNumero(1)).toBe('deficiente'); // numero <= 0: false
    
    // Condição: numero === 1
    expect(classificarNumero(1)).toBe('deficiente'); // numero === 1: true
    expect(classificarNumero(2)).toBe('deficiente'); // numero === 1: false
    
    // Condição: numero % i === 0
    expect(classificarNumero(4)).toBe('deficiente'); // tem divisores
    expect(classificarNumero(3)).toBe('deficiente'); // não tem divisores
    
    // Condição: somaDivisores === numero
    expect(classificarNumero(6)).toBe('perfeito');   // somaDivisores === numero: true
    expect(classificarNumero(8)).toBe('deficiente'); // somaDivisores === numero: false
    
    // Condição: somaDivisores >= numero (BUG)
    expect(classificarNumero(12)).toBe('abundante'); // somaDivisores >= numero: true (BUG)
    expect(classificarNumero(8)).toBe('deficiente'); // somaDivisores >= numero: false
  });

  test('should cover MCDC for converterBase conditions', () => {
    // Condição: baseOrigem < 2 || baseOrigem > 36
    expect(converterBase('10', 1, 10)).toBe(null);   // baseOrigem < 2: true
    expect(converterBase('10', 37, 10)).toBe(null);  // baseOrigem > 36: true
    expect(converterBase('10', 16, 10)).toBe('16');  // ambas false
    
    // Condição: baseDestino < 2 || baseDestino > 36
    expect(converterBase('10', 10, 1)).toBe(null);   // baseDestino < 2: true
    expect(converterBase('10', 10, 37)).toBe(null);  // baseDestino > 36: true
    expect(converterBase('10', 10, 16)).toBe('A');   // ambas false
    
    // Condição: typeof numero === 'string'
    expect(converterBase('10', 10, 2)).toBe('1010'); // string: true
    expect(converterBase(10, 10, 2)).toBe('1010');   // string: false
    
    // Condição: !caracteresValidos.includes(numeroUpper[i])
    expect(converterBase('G', 16, 10)).toBe(null);   // caractere inválido: true
    expect(converterBase('F', 16, 10)).toBe('15');   // caractere válido: false
    
    // Condição: baseDestino === 10
    expect(converterBase('1010', 2, 10)).toBe('10'); // baseDestino === 10: true
    expect(converterBase('10', 10, 2)).toBe('1010'); // baseDestino === 10: false
  });

  test('should cover MCDC for avaliarExpressao conditions', () => {
    // Condição: !expressao || expressao.length === 0
    expect(avaliarExpressao('')).toBe(null);         // expressao vazia: true
    expect(avaliarExpressao('2+3')).toBe(5);         // expressao válida: false
    
    // Condição: !/^[0-9+\-*/().]+$/.test(expressao)
    expect(avaliarExpressao('2+3')).toBe(5);         // regex válida: false
    expect(avaliarExpressao('2+3a')).toBe(null);     // regex inválida: true
    
    // Condição: !isFinite(resultado)
    expect(avaliarExpressao('2/0')).toBe(null);      // infinito: true
    expect(avaliarExpressao('2+3')).toBe(5);         // finito: false
    
    // Condição: Math.abs(resultado) < 1e-10
    expect(avaliarExpressao('1e-11')).toBe(0);       // muito próximo de zero: true
    expect(avaliarExpressao('0.1')).toBe(0.1);       // não próximo de zero: false
  });
});