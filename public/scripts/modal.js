function promissesUfandCities(url, caixa) {
    //A função recebe como parâmetro a url e o elemento para ser posicionado a informação
    fetch(url) // O fetch() faz a requisição da promisse. Passa como parâmetro a url
        .then((res) => {
            // .then mostra o que fazer quando a requisição é um sucesso
            // Passa uma função anônima. Sintaxe (parametro) => {}
            return res.json(); // Retorna o Json da Api.
        })
        .then((datas) => {
            // Esse .then recebe como parâmetro o Json da primeira requisição
            for (data of datas) {
                // Percorre o Json da lista de cidades ou municípios
                caixa.innerHTML += `<option value = ${data.id}>${data.nome}</option>`;
                /** Linha responsável por criar as options dentro do select com value e nome*/
            }
        })
}

function populateUFs() {
    const ufSelect = document.querySelector("select[name = uf]"); // seleciona o select com name uf
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"; //url da API do IBGE para pegar a UF dos estados

    promissesUfandCities(url, ufSelect); // Chama a função para gerar a lista das cidades (passa como parâmetro o select e a url)
}



function atributeValue(event) {
    const stateInput = document.querySelector("input[name = state]");
    const indexOfSelectedState = event.target.selectedIndex; // Retorna o indíce do option dentro do select selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text; // Atribui no value do input escondido o texto presente no option selecionado
}

document.querySelector("select[name=uf]")
    .addEventListener("change", atributeValue)


populateUFs();