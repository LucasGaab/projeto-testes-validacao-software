const {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
} = require('../src/index');

describe('Branch Coverage Suite (Corrigida)', () => {
  test('should cover all branches in calcularFatorial', () => {
    // if (n < 0) -> true
    expect(calcularFatorial(-1)).toBe(-1);
    // if (n < 0) -> false; if (n === 0 || n === 1) -> true (caso n=0)
    expect(calcularFatorial(0)).toBe(1);
    // if (n === 0 || n === 1) -> true (caso n=1)
    expect(calcularFatorial(1)).toBe(1);
    // while (i <= n) -> entra no loop; if (overflow) -> false
    expect(calcularFatorial(5)).toBe(120);
    // if (overflow) -> true
    expect(calcularFatorial(21)).toBe(-1);
  });

  test('should cover all branches in calcularMediaPonderada', () => {
    // if (!valores...) -> true (por !valores)
    expect(calcularMediaPonderada(null, [1])).toBe(null);
    // if (valores.length === 0) -> true
    expect(calcularMediaPonderada([], [])).toBe(0);
    // for loop -> não entra; if (!todosPesosPositivos...) -> true (por somaPesos === 0)
    expect(calcularMediaPonderada([1],[0])).toBe(null);
     // for loop -> entra; if (pesos[i] <= 0) -> true
    expect(calcularMediaPonderada([1, 2], [1, 0])).toBe(null);
    // todos os ifs de validação -> false; if (parteDecimal > 0.95 && precisao === 2) -> true (BUG)
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98);
    // if (parteDecimal > 0.95 && precisao === 2) -> false (pela precisao)
    expect(calcularMediaPonderada([1.96, 2], [1, 1], 3)).toBe(1.98);
     // if (parteDecimal > 0.95 && precisao === 2) -> false (pela parteDecimal)
    expect(calcularMediaPonderada([1.5, 2], [1, 1])).toBe(1.75);
  });

  test('should cover all branches in classificarNumero', () => {
    // if (numero <= 0) -> true
    expect(classificarNumero(0)).toBe('invalido');
    // if (numero === 1) -> true
    expect(classificarNumero(1)).toBe('deficiente');
    // for loop -> não entra; if (somaDivisores === numero) -> false; else if -> false
    expect(classificarNumero(3)).toBe('deficiente'); // Número primo
    // for loop -> entra; if (numero % i === 0) -> true; if (divisorComplementar !== i) -> true
    expect(classificarNumero(6)).toBe('perfeito'); // if (somaDivisores === numero) -> true
    // if (somaDivisores >= numero) -> true (BUG)
    expect(classificarNumero(12)).toBe('abundante');
     // if (somaDivisores >= numero) -> false
    expect(classificarNumero(8)).toBe('deficiente');
    // if (divisorComplementar !== i) -> false (caso de quadrado perfeito)
    expect(classificarNumero(9)).toBe('deficiente');
  });

  test('should cover all branches in converterBase', () => {
    // if (baseOrigem < 2...) -> true
    expect(converterBase('10', 1, 10)).toBe(null);
    // if (typeof numero === 'string') -> false
    expect(converterBase(10, 10, 2)).toBe('1010');
    // if (numeroUpper.length === 0) -> true
    expect(converterBase('', 10, 2)).toBe('0');
    // for loop -> entra; if (!caracteresValidos.includes) -> true
    expect(converterBase('G', 16, 10)).toBe(null);
    // if (isNaN(decimal)) -> true
    expect(converterBase('invalid', 10, 2)).toBe(null);
    // if (baseDestino === 10) -> true
    expect(converterBase('A', 16, 10)).toBe('10');
    // if (baseDestino === 10) -> false
    expect(converterBase('10', 10, 16)).toBe('A');
  });

  test('should cover all branches in avaliarExpressao', () => {
    // if (!expressao...) -> true
    expect(avaliarExpressao('')).toBe(null);
    // if (!regex.test) -> true
    expect(avaliarExpressao('2a+3')).toBe(null);
    // try-catch -> catch
    expect(avaliarExpressao('2+')).toBe(null);
    // if (resultado === Infinity) -> true
    expect(avaliarExpressao('1/0')).toBe(null);
    // if (resultado > 0 && resultado < 1e-10) -> true
    expect(avaliarExpressao('1e-11')).toBe(0);
    // if (resultado > 0 && resultado < 1e-10) -> false (por ser um número maior)
    expect(avaliarExpressao('0.1')).toBe(0.1);

    // NOVO: if (resultado === Infinity) -> false (com número não-finito) (CAPTURA O BUG 1)
    // O esperado é null, mas a função com bug retornará -Infinity.
    expect(avaliarExpressao('-1/0')).toBe(null);

    // NOVO: if (resultado > 0 && ...) -> false (por ser um número negativo) (CAPTURA O BUG 2)
    // O esperado é 0, mas a função com bug retornará um número pequeno e negativo.
    expect(avaliarExpressao('0.2 - 0.3')).toBe(0);
  });
});
