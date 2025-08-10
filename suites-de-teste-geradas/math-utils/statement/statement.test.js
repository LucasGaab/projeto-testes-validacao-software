const { isEven, isPrime } = require('../src/index');

describe('Statement Coverage Suite', () => {
  test('should call isEven with a number', () => {
    isEven(2);
    isEven(3);
  });

  test('should call isPrime with a number', () => {
    isPrime(5);
  });
});