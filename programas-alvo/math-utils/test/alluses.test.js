const { 
  calcularFatorial, 
  calcularMediaPonderada, 
  classificarNumero, 
  converterBase, 
  avaliarExpressao 
} = require('../src/index');

describe('All-uses Coverage Suite', () => {
  test('should cover all uses in calcularFatorial', () => {
    // Todos os usos de 'n'
    expect(calcularFatorial(-1)).toBe(-1);  // predicativo: n < 0
    expect(calcularFatorial(0)).toBe(1);    // predicativo: n === 0
    expect(calcularFatorial(1)).toBe(1);    // predicativo: n === 1
    expect(calcularFatorial(3)).toBe(6);    // computacional: i <= n
    
    // Todos os usos de 'resultado'
    expect(calcularFatorial(2)).toBe(2);    // computacional: resultado * i
    expect(calcularFatorial(21)).toBe(-1);  // predicativo: resultado > Number.MAX_SAFE_INTEGER
    
    // Todos os usos de 'i'
    expect(calcularFatorial(4)).toBe(24);   // predicativo: i <= n, computacional: i++
  });

  test('should cover all uses in calcularMediaPonderada', () => {
    // Todos os usos de 'valores'
    expect(calcularMediaPonderada(null, [1])).toBe(null);   // predicativo: !valores
    expect(calcularMediaPonderada([], [])).toBe(0);         // predicativo: valores.length === 0
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null); // predicativo: valores.length !== pesos.length
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5); // computacional: valores[i]
    
    // Todos os usos de 'pesos'
    expect(calcularMediaPonderada([1], null)).toBe(null);   // predicativo: !pesos
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null); // predicativo: pesos[i] <= 0
    expect(calcularMediaPonderada([1, 2], [2, 3])).toBe(1.6); // computacional: pesos[i]
    
    // Todos os usos de 'todosPesosPositivos'
    expect(calcularMediaPonderada([1, 2], [1, 1])).toBe(1.5); // computacional: todosPesosPositivos = true
    expect(calcularMediaPonderada([1, 2], [0, 1])).toBe(null); // computacional: todosPesosPositivos = false, predicativo: !todosPesosPositivos
    
    // Todos os usos de 'somaPesos'
    expect(calcularMediaPonderada([1, 2], [2, 3])).toBe(1.6); // computacional: somaPesos += pesos[i]
    expect(calcularMediaPonderada([1], [0])).toBe(null);      // predicativo: somaPesos === 0
    
    // Todos os usos de 'somaPonderada'
    expect(calcularMediaPonderada([2, 3], [1, 2])).toBe(2.67); // computacional: somaPonderada += valores[i] * pesos[i]
    
    // Todos os usos de 'media'
    expect(calcularMediaPonderada([1, 3], [1, 1])).toBe(2);   // computacional: media = somaPonderada / somaPesos
    
    // Todos os usos de 'parteDecimal'
    expect(calcularMediaPonderada([1.5, 2.5], [1, 1])).toBe(2); // computacional: parteDecimal = media - Math.floor(media)
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2);  // predicativo: parteDecimal > 0.95 (BUG)
    
    // Todos os usos de 'precisao'
    expect(calcularMediaPonderada([1.95, 2], [1, 1])).toBe(2);   // predicativo: precisao === 2
    expect(calcularMediaPonderada([1.95, 2], [1, 1], 3)).toBe(1.975); // predicativo: precisao === 2 (false)
  });

  test('should cover all uses in classificarNumero', () => {
    // Todos os usos de 'numero'
    expect(classificarNumero(0)).toBe('invalido');   // predicativo: numero <= 0
    expect(classificarNumero(1)).toBe('deficiente'); // predicativo: numero === 1
    expect(classificarNumero(4)).toBe('deficiente'); // computacional: numero % i, numero / i
    
    // Todos os usos de 'somaDivisores'
    expect(classificarNumero(6)).toBe('perfeito');   // predicativo: somaDivisores === numero
    expect(classificarNumero(12)).toBe('abundante'); // predicativo: somaDivisores >= numero (BUG)
    expect(classificarNumero(8)).toBe('deficiente'); // predicativo: somaDivisores < numero
    
    // Todos os usos de 'limite'
    expect(classificarNumero(4)).toBe('deficiente'); // predicativo: i <= limite
    
    // Todos os usos de 'i'
    expect(classificarNumero(6)).toBe('perfeito');   // predicativo: i <= limite, computacional: somaDivisores += i
    
    // Todos os usos de 'divisorComplementar'
    expect(classificarNumero(6)).toBe('perfeito');   // computacional: divisorComplementar = numero / i
    expect(classificarNumero(4)).toBe('deficiente'); // predicativo: divisorComplementar !== numero
    expect(classificarNumero(9)).toBe('deficiente'); // predicativo: divisorComplementar !== i
    expect(classificarNumero(10)).toBe('deficiente'); // computacional: somaDivisores += divisorComplementar
  });

  test('should cover all uses in converterBase', () => {
    // Todos os usos de 'baseOrigem'
    expect(converterBase('10', 1, 10)).toBe(null);   // predicativo: baseOrigem < 2
    expect(converterBase('10', 37, 10)).toBe(null);  // predicativo: baseOrigem > 36
    expect(converterBase('FF', 16, 10)).toBe('255'); // computacional: caracteresValidos.substring(0, baseOrigem)
    
    // Todos os usos de 'baseDestino'
    expect(converterBase('10', 10, 1)).toBe(null);   // predicativo: baseDestino < 2
    expect(converterBase('10', 10, 37)).toBe(null);  // predicativo: baseDestino > 36
    expect(converterBase('1010', 2, 10)).toBe('10'); // predicativo: baseDestino === 10
    expect(converterBase(10, 10, 16)).toBe('A');     // computacional: decimal.toString(baseDestino)
    
    // Todos os usos de 'numero'
    expect(converterBase('10', 10, 2)).toBe('1010'); // predicativo: typeof numero === 'string'
    expect(converterBase(10, 10, 2)).toBe('1010');   // predicativo: typeof numero === 'string' (false)
    
    // Todos os usos de 'caracteresValidos'
    expect(converterBase('FF', 16, 10)).toBe('255'); // computacional: caracteresValidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, baseOrigem)
    expect(converterBase('G', 16, 10)).toBe(null);   // predicativo: !caracteresValidos.includes(numeroUpper[i])
    
    // Todos os usos de 'numeroUpper'
    expect(converterBase('ff', 16, 10)).toBe('255'); // computacional: numeroUpper = numero.toUpperCase()
    expect(converterBase('ABC', 16, 10)).toBe('2748'); // predicativo: i < numeroUpper.length
    
    // Todos os usos de 'decimal'
    expect(converterBase('1010', 2, 10)).toBe('10'); // computacional: decimal = parseInt(numeroUpper, baseOrigem)
    expect(converterBase('invalid', 10, 2)).toBe(null); // predicativo: isNaN(decimal)
    expect(converterBase(10, 10, 2)).toBe('1010');   // computacional: decimal = numero
  });

  test('should cover all uses in avaliarExpressao', () => {
    // Todos os usos de 'expressao'
    expect(avaliarExpressao('')).toBe(null);         // predicativo: !expressao
    expect(avaliarExpressao('2 + 3')).toBe(5);       // computacional: expressao.replace(/\s/g, '')
    expect(avaliarExpressao('2+3a')).toBe(null);     // predicativo: !/^[0-9+\-*/().]+$/.test(expressao)
    
    // Todos os usos de 'resultado'
    expect(avaliarExpressao('2*3')).toBe(6);         // computacional: resultado = eval(expressao)
    expect(avaliarExpressao('2/0')).toBe(null);      // predicativo: !isFinite(resultado)
    expect(avaliarExpressao('1e-11')).toBe(0);       // predicativo: Math.abs(resultado) < 1e-10, computacional: resultado = 0
  });
}); 