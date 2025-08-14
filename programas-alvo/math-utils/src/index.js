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

// FUNÇÃO 4: CONVERSÃO ENTRE SISTEMAS NUMÉRICOS (COM BUG INTRODUZIDO)
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
    let numeroUpper = numero.toUpperCase();

    if (numeroUpper.length === 0) {
      decimal = 0;
    } else {
      // Função confia diretamente no `parseInt`, que faz a conversão
      // parcial e ignora caracteres inválidos após o início da string.
      decimal = parseInt(numeroUpper, baseOrigem);
    }
  } else {
    decimal = numero;
  }

  // Se parseInt não conseguir converter nada (ex: "Z", 10), ele retorna NaN.
  if (isNaN(decimal)) {
      return null;
  }

  // Converter de decimal para a base de destino
  return decimal.toString(baseDestino).toUpperCase();
}
// ============================================================================
// FUNÇÃO 5: AVALIAÇÃO DE EXPRESSÕES MATEMÁTICAS
// ============================================================================
// Bug: Não aplica corretamente a precedência de verificação de arredondamento e infinito para valores <0

function avaliarExpressao(expressao) {
  // Validação básica
  if (!expressao || expressao.length === 0) {
    return null;
  }
  // Remover espaços
  expressao = expressao.replace(/\s/g, '');

  // Verificar se contém apenas caracteres válidos
  if (!/^[0-9+\-*/().e]+$/.test(expressao)) {
    return null;
  }

  try {
    let resultado = eval(expressao);

    // BUG 1: A verificação agora só trata o INFINITO POSITIVO, ignorando -Infinity e NaN.
    if (resultado === Infinity) {
      return null;
    }

    // BUG 2: O arredondamento agora só funciona para números POSITIVOS perto de zero.
    // Números negativos muito próximos de zero não serão arredondados.
    if (resultado > 0 && resultado < 1e-10) {
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
