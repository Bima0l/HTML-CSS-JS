const respostasCorretas = [1, 2, 0, 1, 3, 0, 0, 1, 0, 2];

function submitQuiz() {
    verificarRespostas();
}

function verificarRespostas() {
    let acertos = 0;
    let erros = 0;
    let respostas = [];

    for (let i = 1; i <= 10; i++) {
        const resposta = document.querySelector(`input[name="pergunta${i}"]:checked`);
        if (resposta) {
            if (parseInt(resposta.value) === respostasCorretas[i - 1]) {
                acertos++;
            } else {
                erros++;
            }
            respostas.push({
                pergunta: i,
                respostaSelecionada: parseInt(resposta.value),
                correta: respostasCorretas[i - 1]
            });
        } else {
            erros++;
            respostas.push({
                pergunta: i,
                respostaSelecionada: null,
                correta: respostasCorretas[i - 1]
            });
        }
    }

    // Armazena os resultados no localStorage
    localStorage.setItem("acertos", acertos);
    localStorage.setItem("erros", erros);
    localStorage.setItem("respostas", JSON.stringify(respostas));

    // Redireciona para a página de resultados
    window.location.href = "resultado.html";
}
