let historicoDeConversao = [];  // Armazena os resultados anteriores
// Inicializa com valor vazio
document.getElementById("valor").value = ''; // Caso precise inicializar com vazio

// Busca a taxa de câmbio na API
async function fetchExchangeRate(moedaInicial, moedaFinal) {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${moedaInicial}`);
    const data = await response.json();
    if (!data.rates[moedaFinal]) {
      throw new Error("Moeda de destino inválida.");
    }
    return data.rates[moedaFinal]; // Retorna a taxa de câmbio
  } catch (error) {
    console.error("Erro ao buscar taxa de câmbio:", error);
    alert("Erro ao buscar a taxa de câmbio. Por favor, tente novamente.");
    throw error;
  }
}

// Faz o cálculo da conversão
function convertCurrency(valor, taxaDeCambio) {
  return parseFloat(valor) * taxaDeCambio;
}

// Função principal que integra tudo
async function converterMoeda() {
  const valor = document.getElementById("valor").value;
  const moedaInicial = document.getElementById("moedaInicial").value;
  const moedaFinal = document.getElementById("moedaFinal").value;
  const resultadoDiv = document.getElementById("resultado");
  const historicoDiv = document.getElementById("historico");

  if (!valor || isNaN(valor)) {
    alert("Por favor, insira um valor numérico válido.");
    return;
  }

  try {
    const taxaDeCambio = await fetchExchangeRate(moedaInicial, moedaFinal);
    const resultadoConvertido = convertCurrency(valor, taxaDeCambio);
    resultadoDiv.textContent = `Resultado: ${resultadoConvertido.toFixed(2)} ${moedaFinal}`;

    // Adiciona o resultado ao histórico
    const conversao = `${valor} ${moedaInicial} = ${resultadoConvertido.toFixed(2)} ${moedaFinal}`;
    historicoDeConversao.push(conversao);
    
    // Exibe o histórico atualizado
    atualizarHistorico(historicoDeConversao, historicoDiv);
  } catch (error) {
    console.error("Erro na conversão:", error);
  }
}

function atualizarHistorico(historico, historicoDiv) {
  historicoDiv.innerHTML = '';  // Limpa o histórico antes de adicionar novos itens
  historico.forEach(item => {
    const divItem = document.createElement("div");
    divItem.textContent = item;
    historicoDiv.appendChild(divItem);
  });
}
