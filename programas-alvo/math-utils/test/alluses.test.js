const {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
} = require('../src/index');

describe('All-Uses Coverage Suite (Corrigida)', () => {
  test('should cover all def-use pairs in calcularFatorial', () => {
    // Cobre def de 'n' -> usos nos ifs e no 'i <= n'
    expect(calcularFatorial(-1)).toBe(-1);
    expect(calcularFatorial(0)).toBe(1);
    expect(calcularFatorial(5)).toBe(120);
    // Cobre def de 'resultado=1' -> uso em 'resultado * i' e no 'if(overflow)'
    // Cobre def de 'i=2' -> usos em 'i <= n' e 'i++'
    // Cobre def de 'resultado' no loop -> uso na próxima iteração e no 'if(overflow)'
    // Cobre def de 'i' no loop -> uso na próxima iteração
    expect(calcularFatorial(21)).toBe(-1); // Cobre def -> uso no if(overflow)
  });

  test('should cover all def-use pairs in calcularMediaPonderada', () => {
    // Pares de 'valores' e 'pesos'
    expect(calcularMediaPonderada(null, [1])).toBe(null);
    expect(calcularMediaPonderada([1], null)).toBe(null);
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null);
    expect(calcularMediaPonderada([], [])).toBe(0);
    // Cobre def inicial de 'todosPesosPositivos' -> uso no if
    // Cobre def de 'somaPesos' no loop -> uso no if e no cálculo da média
    expect(calcularMediaPonderada([1,2], [1,1])).toBe(1.5);
    // Cobre def de 'todosPesosPositivos' para false -> uso no if
    expect(calcularMediaPonderada([1,2], [1,0])).toBe(null);
    // Cobre def de 'somaPonderada' no loop -> uso no cálculo da média
    expect(calcularMediaPonderada([2,3], [2,3])).toBe(2.6);
    // Cobre def de 'media' -> uso no cálculo de 'parteDecimal' e no arredondamento
    // Cobre def de 'parteDecimal' -> uso no if de arredondamento
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98);
    expect(calcularMediaPonderada([1.96, 2], [1, 1], 3)).toBe(1.98);
  });

  test('should cover all def-use pairs in classificarNumero', () => {
    // Pares de 'numero'
    expect(classificarNumero(0)).toBe('invalido');
    expect(classificarNumero(1)).toBe('deficiente');
    // Cobre def de 'somaDivisores=1' -> uso no loop e nos ifs finais
    expect(classificarNumero(3)).toBe('deficiente'); // primo
    // Cobre def de 'somaDivisores' no loop (somaDivisores+=i) -> uso nos ifs finais
    // Cobre def de 'divisorComplementar' -> uso nos ifs e na soma
    expect(classificarNumero(12)).toBe('abundante'); // com divisores complementares
    expect(classificarNumero(9)).toBe('deficiente'); // quadrado perfeito
    expect(classificarNumero(6)).toBe('perfeito');
  });

  test('should cover all def-use pairs in converterBase', () => {
    // Cobre defs de parâmetros -> usos nas validações
    expect(converterBase('10', 1, 10)).toBe(null);
    expect(converterBase('10', 10, 37)).toBe(null);
    // Cobre def de 'decimal' vindo de 'numero' (não string) -> uso no 'toString'
    expect(converterBase(10, 10, 16)).toBe('A');
    // Cobre def de 'caracteresValidos' -> uso no 'includes'
    // Cobre def de 'numeroUpper' -> uso no loop e no 'parseInt'
    // Cobre def de 'decimal' vindo de 'parseInt' -> uso no 'isNaN' e no 'toString'
    expect(converterBase('G', 16, 10)).toBe(null);
    expect(converterBase('A', 16, 10)).toBe('10');
    expect(converterBase('invalid', 10, 2)).toBe(null);
  });

  test('should cover all def-use pairs in avaliarExpressao', () => {
    // Cobre def de 'expressao' (parâmetro) -> uso no replace, length, regex e eval
    expect(avaliarExpressao(' 2 + 3 ')).toBe(5);
    expect(avaliarExpressao('')).toBe(null);
    expect(avaliarExpressao('2a+3')).toBe(null);
    expect(avaliarExpressao('2+')).toBe(null); // eval lança erro

    // Cobre def de 'resultado' vindo de 'eval' -> uso no 'if' e no 'return'
    // Uso em if (resultado === Infinity)
    expect(avaliarExpressao('1/0')).toBe(null);
    // Uso em if (resultado > 0 && ...)
    expect(avaliarExpressao('1e-11')).toBe(0);
    // Uso no return (caminho normal)
    expect(avaliarExpressao('0.1')).toBe(0.1);

    // NOVO: Teste para o def-use com resultado = -Infinity (CAPTURA O BUG 1)
    // Testa o fluxo de eval -> if(resultado === Infinity)
    // O esperado é null, mas a função com bug retornará -Infinity.
    expect(avaliarExpressao('-1/0')).toBe(null);

    // NOVO: Teste para o def-use com resultado negativo pequeno (CAPTURA O BUG 2)
    // Testa o fluxo de eval -> if(resultado > 0 && ...)
    // O esperado é 0, mas a função com bug retornará um número pequeno e negativo.
    expect(avaliarExpressao('0.2 - 0.3')).toBe(0);
});
