const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('All-c-uses Coverage Suite', () => {
  test('should cover all computation uses in calcularFatorial', () => {
    // Uso computacional: resultado * i
    expect(calcularFatorial(3)).toBe(6);
    
    // Uso computacional: resultado > Number.MAX_SAFE_INTEGER
    expect(calcularFatorial(21)).toBe(-1);
    
    // Uso computacional: i <= n
    expect(calcularFatorial(5)).toBe(120);
    
    // Uso computacional: i++
    expect(calcularFatorial(4)).toBe(24);
  });

  test('should cover all computation uses in calcularMediaPonderada', () => {
    // Uso computacional: valores.length !== pesos.length
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null);
    
    // Uso computacional: valores.length === 0
    expect(calcularMediaPonderada([], [])).toBe(0);
    
    // Uso computacional: pesos[i] <= 0
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null);
    
    // Uso computacional: somaPesos += pesos[i]
    expect(calcularMediaPonderada([1, 2], [2, 3])).toBe(1.6);
    
    // Uso computacional: somaPonderada += valores[i] * pesos[i]
    expect(calcularMediaPonderada([2, 3], [1, 2])).toBe(2.67);
    
    // Uso computacional: media = somaPonderada / somaPesos
    expect(calcularMediaPonderada([1, 3], [1, 1])).toBe(2);
    
    // Uso computacional: parteDecimal = media - Math.floor(media)
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
    
    // Uso computacional: parteDecimal > 0.95 && precisao === 2
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2); // BUG
    
    // Uso computacional: Math.floor(media) + 1
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(2);
    
    // Uso computacional: Math.round(media * Math.pow(10, precisao)) / Math.pow(10, precisao)
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
  });

  test('should cover all computation uses in classificarNumero', () => {
    // Uso computacional: numero <= 0
    expect(classificarNumero(0)).toBe('invalido');
    
    // Uso computacional: numero === 1
    expect(classificarNumero(1)).toBe('deficiente');
    
    // Uso computacional: limite = Math.sqrt(numero)
    expect(classificarNumero(4)).toBe('deficiente');
    
    // Uso computacional: i <= limite
    expect(classificarNumero(6)).toBe('perfeito');
    
    // Uso computacional: numero % i === 0
    expect(classificarNumero(8)).toBe('deficiente');
    
    // Uso computacional: somaDivisores += i
    expect(classificarNumero(12)).toBe('abundante'); // BUG
    
    // Uso computacional: divisorComplementar = numero / i
    expect(classificarNumero(16)).toBe('deficiente');
    
    // Uso computacional: divisorComplementar !== i && divisorComplementar !== numero
    expect(classificarNumero(9)).toBe('deficiente');
    
    // Uso computacional: somaDivisores += divisorComplementar
    expect(classificarNumero(10)).toBe('deficiente');
    
    // Uso computacional: somaDivisores === numero
    expect(classificarNumero(6)).toBe('perfeito');
    
    // Uso computacional: somaDivisores >= numero (BUG)
    expect(classificarNumero(12)).toBe('abundante');
  });

  test('should cover all computation uses in converterBase', () => {
    // Uso computacional: baseOrigem < 2 || baseOrigem > 36
    expect(converterBase('10', 1, 10)).toBe(null);
    
    // Uso computacional: baseDestino < 2 || baseDestino > 36
    expect(converterBase('10', 10, 37)).toBe(null);
    
    // Uso computacional: typeof numero === 'string'
    expect(converterBase('10', 10, 2)).toBe('1010');
    
    // Uso computacional: caracteresValidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, baseOrigem)
    expect(converterBase('FF', 16, 10)).toBe('255');
    
    // Uso computacional: numeroUpper = numero.toUpperCase()
    expect(converterBase('ff', 16, 10)).toBe('255');
    
    // Uso computacional: i < numeroUpper.length
    expect(converterBase('ABC', 16, 10)).toBe('2748');
    
    // Uso computacional: !caracteresValidos.includes(numeroUpper[i])
    expect(converterBase('G', 16, 10)).toBe(null);
    
    // Uso computacional: decimal = parseInt(numeroUpper, baseOrigem)
    expect(converterBase('1010', 2, 10)).toBe('10');
    
    // Uso computacional: isNaN(decimal)
    expect(converterBase('invalid', 10, 2)).toBe(null);
    
    // Uso computacional: baseDestino === 10
    expect(converterBase('1010', 2, 10)).toBe('10');
    
    // Uso computacional: decimal.toString(baseDestino).toUpperCase()
    expect(converterBase(10, 10, 16)).toBe('A');
  });

  test('should cover all computation uses in avaliarExpressao', () => {
    // Uso computacional: expressao.replace(/\s/g, '')
    expect(avaliarExpressao('2 + 3')).toBe(5);
    
    // Uso computacional: !expressao || expressao.length === 0
    expect(avaliarExpressao('')).toBe(null);
    
    // Uso computacional: /^[0-9+\-*/().]+$/.test(expressao)
    expect(avaliarExpressao('2+3a')).toBe(null);
    
    // Uso computacional: eval(expressao)
    expect(avaliarExpressao('2*3')).toBe(6);
    
    // Uso computacional: !isFinite(resultado)
    expect(avaliarExpressao('2/0')).toBe(null);
    
    // Uso computacional: Math.abs(resultado) < 1e-10
    expect(avaliarExpressao('1e-11')).toBe(0);
  });
}); 