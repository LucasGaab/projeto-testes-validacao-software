const { isEven, isPrime } = require('../src/index');

describe('Branch Coverage Suite', () => {
  test('should cover true and false branches for isEven', () => {
    expect(isEven(2)).toBe(true);  // branch 'if' é false
    expect(isEven(3)).toBe(false); // branch 'if' é true
    expect(isEven(0)).toBe(true);  // branch 'if (n === 0)'
  });

  test('should cover true and false branches for isPrime', () => {
    expect(isPrime(7)).toBe(true);  // branch 'for' é false, branch 'if (num <= 1)' é false
    expect(isPrime(1)).toBe(false); // branch 'if (num <= 1)' é true
    expect(isPrime(4)).toBe(false); // branch 'if (num % i === 0)' é true
  });
});