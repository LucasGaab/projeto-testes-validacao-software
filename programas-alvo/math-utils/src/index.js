// ============================================================================
// FUNÇÃO 1: CÁLCULO DE FATORIAL COM TRATAMENTO DE CASOS ESPECIAIS
// ============================================================================
// Bug: Não trata corretamente o caso de overflow para números grandes
// Critérios necessários: Branch Coverage (Indiretamente), MC/DC, Data Flow (All-uses)

function calcularFatorial(n) {
  // Validação de entrada
  if (n < 0) {
    return -1; // Erro: número negativo
  }
  
  // Casos especiais
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // BUG: Deveria verificar overflow antes do cálculo
  // Mas só verifica se o resultado é maior que Number.MAX_SAFE_INTEGER
  let resultado = 1;
  let i = 2;
  
  while (i <= n) {
    resultado = resultado * i;
    
      // BUG: Esta verificação não previne overflow adequadamente
  // Deveria verificar se resultado * i > Number.MAX_SAFE_INTEGER antes da multiplicação
  if (resultado > Number.MAX_SAFE_INTEGER / i) {
    return -1; // Overflow
  }
    i++;
  }
  
  return resultado;
}

// ============================================================================
// FUNÇÃO 2: MÉDIA PONDERADA COM ARREDONDAMENTO CONDICIONAL
// ============================================================================
// Bug: Arredondamento incorreto para valores próximos de inteiros
// Critérios necessários: Branch Coverage, MC/DC, Data Flow (All-c-uses)

function calcularMediaPonderada(valores, pesos, precisao = 2) {
  // Validações
  if (!valores || !pesos || valores.length !== pesos.length) {
    return null;
  }
  
  if (valores.length === 0) {
    return 0;
  }
  
  // Verificar se todos os pesos são positivos
  let todosPesosPositivos = true;
  let somaPesos = 0;
  
  for (let i = 0; i < pesos.length; i++) {
    if (pesos[i] <= 0) {
      todosPesosPositivos = false;
      break;
    }
    somaPesos += pesos[i];
  }
  
  if (!todosPesosPositivos || somaPesos === 0) {
    return null;
  }
  
  // Calcular média ponderada
  let somaPonderada = 0;
  for (let i = 0; i < valores.length; i++) {
    somaPonderada += valores[i] * pesos[i];
  }
  
  let media = somaPonderada / somaPesos;
  
  // BUG: Arredondamento incorreto para valores próximos de inteiros
  // Deveria usar Math.round() para valores muito próximos de inteiros
  let parteDecimal = media - Math.floor(media);
  
  if (parteDecimal > 0.95 && precisao === 2) {
    // BUG: Deveria arredondar para cima, mas arredonda para baixo
    media = Math.floor(media) + 1;
  } else {
    media = Math.round(media * Math.pow(10, precisao)) / Math.pow(10, precisao);
  }
  
  return media;
}

// ============================================================================
// FUNÇÃO 3: VERIFICAÇÃO DE NÚMEROS PERFEITOS E ABUNDANTES
// ============================================================================
// Bug: Não detecta corretamente números abundantes em casos específicos
// Critérios necessários: Branch Coverage, MC/DC, Path Coverage

function classificarNumero(numero) {
  if (numero <= 0) {
    return 'invalido';
  }
  
  if (numero === 1) {
    return 'deficiente';
  }
  
  // Calcular soma dos divisores próprios
  let somaDivisores = 1; // 1 é sempre divisor
  let limite = Math.sqrt(numero);
  
  for (let i = 2; i <= limite; i++) {
    if (numero % i === 0) {
      somaDivisores += i;
      
      // Adicionar o divisor complementar (exceto se for o próprio número)
      let divisorComplementar = numero / i;
      if (divisorComplementar !== i && divisorComplementar !== numero) {
        somaDivisores += divisorComplementar;
      }
    }
  }
  
  // BUG: Lógica incorreta para números abundantes
  // Deveria ser somaDivisores > numero, mas usa >=
  if (somaDivisores === numero) {
    return 'perfeito';
  } else if (somaDivisores >= numero) {
    // BUG: Deveria ser > numero, não >=
    return 'abundante';
  } else {
    return 'deficiente';
  }
}

// ============================================================================
// FUNÇÃO 4: CONVERSÃO ENTRE SISTEMAS NUMÉRICOS
// ============================================================================
// Bug: Não valida corretamente entradas hexadecimais com caracteres inválidos
// Critérios necessários: Data Flow (All-defs, All-uses), Branch Coverage

function converterBase(numero, baseOrigem, baseDestino) {
  // Validações básicas
  if (baseOrigem < 2 || baseOrigem > 36 || baseDestino < 2 || baseDestino > 36) {
    return null;
  }
  
  // Converter para decimal primeiro
  let decimal;
  
  if (typeof numero === 'string') {
    // BUG: Não valida adequadamente caracteres inválidos para a base
    // Deveria verificar se todos os caracteres são válidos para a base
    let caracteresValidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, baseOrigem);
    let numeroUpper = numero.toUpperCase();
    
    // Tratar string vazia
    if (numeroUpper.length === 0) {
      decimal = 0;
    } else {
      for (let i = 0; i < numeroUpper.length; i++) {
        if (!caracteresValidos.includes(numeroUpper[i])) {
          return null; // Caractere inválido
        }
      }
      
      decimal = parseInt(numeroUpper, baseOrigem);
    }
  } else {
    decimal = numero;
  }
  
  // BUG: Não verifica se a conversão foi bem-sucedida
  if (isNaN(decimal)) {
    return null;
  }
  
  // Converter para a base de destino
  if (baseDestino === 10) {
    return decimal.toString();
  } else {
    return decimal.toString(baseDestino).toUpperCase();
  }
}

// ============================================================================
// FUNÇÃO 5: AVALIAÇÃO DE EXPRESSÕES MATEMÁTICAS
// ============================================================================
// Bug: Não aplica corretamente a precedência de operadores em casos específicos
// Critérios necessarios: MC/DC, Path Coverage, Data Flow (All-p-uses)

function avaliarExpressao(expressao) {
  // Remover espaços
  expressao = expressao.replace(/\s/g, '');
  
  // Validação básica
  if (!expressao || expressao.length === 0) {
    return null;
  }
  
  // Verificar se contém apenas caracteres válidos
  if (!/^[0-9+\-*/().e]+$/.test(expressao)) {
    return null;
  }
  
  try {
    // BUG: Usa eval() que pode ter problemas de precedência em casos específicos
    // Deveria implementar um parser próprio para garantir precedência correta
    let resultado = eval(expressao);
    
    // BUG: Não verifica se o resultado é um número finito
    if (!isFinite(resultado)) {
      return null;
    }
    
    // BUG: Arredondamento incorreto para resultados muito próximos de zero
    if (Math.abs(resultado) < 1e-10) {
      resultado = 0;
    }
    
    return resultado;
  } catch (error) {
    return null;
  }
}

module.exports = {
  calcularFatorial,
  calcularMediaPonderada,
  classificarNumero,
  converterBase,
  avaliarExpressao
};
