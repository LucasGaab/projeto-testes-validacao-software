const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('All-Defs Coverage Suite', () => {
  test('should cover all definitions in calcularFatorial', () => {
    // Definição: resultado = 1
    expect(calcularFatorial(2)).toBe(2);
    
    // Definição: i = 2
    expect(calcularFatorial(3)).toBe(6);
    
    // Definição: resultado = resultado * i (no loop)
    expect(calcularFatorial(4)).toBe(24);
    
    // Definição: i++ (incremento)
    expect(calcularFatorial(5)).toBe(120);
    
    // Definição: resultado > Number.MAX_SAFE_INTEGER (overflow)
    expect(calcularFatorial(21)).toBe(-1);
  });

  test('should cover all definitions in calcularMediaPonderada', () => {
    // Definição: todosPesosPositivos = true
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5);
    
    // Definição: todosPesosPositivos = false
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null);
    
    // Definição: somaPesos = 0
    expect(calcularMediaPonderada([], [])).toBe(0);
    
    // Definição: somaPesos += pesos[i]
    expect(calcularMediaPonderada([1, 2], [2, 3])).toBe(1.6);
    
    // Definição: somaPonderada = 0
    expect(calcularMediaPonderada([1], [1])).toBe(1);
    
    // Definição: somaPonderada += valores[i] * pesos[i]
    expect(calcularMediaPonderada([2, 3], [1, 2])).toBe(2.67);
    
    // Definição: media = somaPonderada / somaPesos
    expect(calcularMediaPonderada([1, 3], [1, 1])).toBe(2);
    
    // Definição: parteDecimal = media - Math.floor(media)
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
    
    // Definição: media = Math.floor(media) + 1 (BUG)
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(1.97);
    
    // Definição: media = Math.round(media * Math.pow(10, precisao)) / Math.pow(10, precisao)
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2);
  });

  test('should cover all definitions in classificarNumero', () => {
    // Definição: somaDivisores = 1
    expect(classificarNumero(2)).toBe('deficiente');
    
    // Definição: limite = Math.sqrt(numero)
    expect(classificarNumero(4)).toBe('deficiente');
    
    // Definição: somaDivisores += i
    expect(classificarNumero(6)).toBe('perfeito');
    
    // Definição: divisorComplementar = numero / i
    expect(classificarNumero(12)).toBe('abundante'); // BUG
    
    // Definição: somaDivisores += divisorComplementar
    expect(classificarNumero(8)).toBe('deficiente');
  });

  test('should cover all definitions in converterBase', () => {
    // Definição: decimal (string case)
    expect(converterBase('10', 2, 10)).toBe('2');
    
    // Definição: decimal (number case)
    expect(converterBase(10, 10, 2)).toBe('1010');
    
    // Definição: caracteresValidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, baseOrigem)
    expect(converterBase('FF', 16, 10)).toBe('255');
    
    // Definição: numeroUpper = numero.toUpperCase()
    expect(converterBase('ff', 16, 10)).toBe('255');
    
    // Definição: decimal = parseInt(numeroUpper, baseOrigem)
    expect(converterBase('1010', 2, 10)).toBe('10');
  });

  test('should cover all definitions in avaliarExpressao', () => {
    // Definição: expressao = expressao.replace(/\s/g, '')
    expect(avaliarExpressao('2 + 3')).toBe(5);
    
    // Definição: resultado = eval(expressao)
    expect(avaliarExpressao('2*3')).toBe(6);
    
    // Definição: resultado = 0 (quando muito próximo de zero)
    expect(avaliarExpressao('1e-11')).toBe(0);
  });
}); 
