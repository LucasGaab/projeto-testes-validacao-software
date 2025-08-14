const {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
} = require('../src/index');

describe('MCDC Coverage Suite (Corrigida)', () => {
  test('should cover MCDC for calcularFatorial conditions', () => {
    // Decisões de condição única: MC/DC é igual a Branch Coverage
    expect(calcularFatorial(-1)).toBe(-1);
    expect(calcularFatorial(0)).toBe(1);
    expect(calcularFatorial(1)).toBe(1);
    expect(calcularFatorial(2)).toBe(2);
    expect(calcularFatorial(21)).toBe(-1);
  });

  test('should cover MCDC for calcularMediaPonderada conditions', () => {
    // Decisão: !valores || !pesos || valores.length !== pesos.length
    // Condições: A=!valores, B=!pesos, C=valores.length !== pesos.length
    // Par para A: { (V,F,F)->V }, { (F,F,F)->F }
    expect(calcularMediaPonderada(null, [1])).toBe(null); // A=V
    expect(calcularMediaPonderada([1], [1])).toBe(1);    // A=F, B=F, C=F (par com o de cima)
    // Par para B: { (F,V,F)->V }, { (F,F,F)->F }
    expect(calcularMediaPonderada([1], null)).toBe(null); // B=V
    // Par para C: { (F,F,V)->V }, { (F,F,F)->F }
    expect(calcularMediaPonderada([1], [1, 2])).toBe(null); // C=V

    // Decisão: parteDecimal > 0.95 && precisao === 2
    // Condições: D=parteDecimal > 0.95, E=precisao === 2
    // Par para D: { (V,V)->V }, { (F,V)->F }
    expect(calcularMediaPonderada([1.96, 2], [1, 1])).toBe(1.98);    // D=V, E=V
    expect(calcularMediaPonderada([1.5, 2], [1, 1])).toBe(1.75); // D=F, E=V
    // Par para E: { (V,V)->V }, { (V,F)->F }
    expect(calcularMediaPonderada([1.96, 2], [1, 1], 3)).toBe(1.98); // D=V, E=F
  });

   test('should cover MCDC for classificarNumero conditions', () => {
    // Decisão: divisorComplementar !== i && divisorComplementar !== numero
    // Condições: A = divisorComplementar !== i, B = divisorComplementar !== numero
    // Par para A: { (V,V)->V }, { (F,V)->F }
    expect(classificarNumero(6)).toBe('perfeito'); // A=V, B=V
    expect(classificarNumero(9)).toBe('deficiente'); // A=F, B=V
    // Par para B: { (V,V)->V }, { (V,F)->F }
    expect(classificarNumero(4)).toBe('deficiente'); // A=V, B=F
    // Outras decisões são de condição única
    expect(classificarNumero(0)).toBe('invalido');
    expect(classificarNumero(1)).toBe('deficiente');
    expect(classificarNumero(12)).toBe('abundante');
  });

  test('should cover MCDC for converterBase conditions', () => {
    // Decisão: baseOrigem < 2 || baseOrigem > 36
    // Condições: A=baseOrigem < 2, B=baseOrigem > 36
    // Par para A: { (V,F)->V }, { (F,F)->F }
    expect(converterBase('10', 1, 10)).toBe(null); // A=V
    expect(converterBase('10', 16, 10)).toBe('16'); // A=F, B=F (par com o de cima)
    // Par para B: { (F,V)->V }, { (F,F)->F }
    expect(converterBase('10', 37, 10)).toBe(null); // B=V

    // Decisão: baseDestino < 2 || baseDestino > 36 (mesma lógica)
    expect(converterBase('10', 10, 1)).toBe(null);
    expect(converterBase('10', 10, 37)).toBe(null);
    expect(converterBase('10', 10, 16)).toBe('A');
  });

  test('should cover MCDC for avaliarExpressao conditions', () => {
    // Decisão: !expressao || expressao.length === 0
    // Condições: A=!expressao, B=expressao.length === 0
    // Par para A: { (V)->V }, { (F,F)->F }
    expect(avaliarExpressao(null)).toBe(null); // A=V, B é irrelevante
    expect(avaliarExpressao('2+3')).toBe(5); // A=F, B=F (par com o de cima)
    // Par para B: { (F,V)->V }, { (F,F)->F }
    expect(avaliarExpressao('')).toBe(null); // A=F, B=V
  });
});
