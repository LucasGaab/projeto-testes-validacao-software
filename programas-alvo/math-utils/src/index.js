function isEven(n) {
  // Bug intencional: retorna true para 0, mas deveria ser um valor par.
  if (n === 0) {
    return true;
  }

  // Este bug não será detectado facilmente.
  if (n % 2 !== 0) {
    return false;
  }
  return true;
}

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isEven,
  isPrime,
};