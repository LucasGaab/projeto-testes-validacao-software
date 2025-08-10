const { isEven, isPrime } = require('../src/index');

describe('MCDC Coverage Suite', () => {
  test('should cover conditions of isEven function', () => {
    expect(isEven(0)).toBe(true); // Cobre a condição n === 0
    expect(isEven(2)).toBe(true); // Cobre a condição n % 2 !== 0 sendo false
    expect(isEven(3)).toBe(false); // Cobre a condição n % 2 !== 0 sendo true
  });

  test('should cover conditions of isPrime function', () => {
    // Para a decisão 'if (num <= 1) || (num % i === 0)'
    // Precisamos de casos que tornem a primeira e a segunda parte verdadeira e falsa
    expect(isPrime(1)).toBe(false); // num <= 1 é verdadeiro
    expect(isPrime(2)).toBe(true);  // num <= 1 é falso, o loop não executa
    expect(isPrime(4)).toBe(false); // num <= 1 é falso, mas num % i === 0 é verdadeiro (para i=2)
    expect(isPrime(5)).toBe(true);  // num <= 1 é falso, e num % i === 0 é sempre falso no loop
  });
});