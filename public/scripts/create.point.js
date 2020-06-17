function promissesUfandCities(url, caixa) {
    //A função recebe como parâmetro a url e o elemento para ser posicionado a informação
    return fetch(url) // O fetch() faz a requisição da promisse. Passa como parâmetro a url
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


function valueCidade(options) {
 // Função para substituir o value númerico pelo nome da cidade nas options da cidade
    for (option of options) {
        option.value = option.text;
    }
}


async function populateUFs() {
    const ufSelect = document.querySelector("select[name = uf]"); // seleciona o select com name uf
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"; //url da API do IBGE para pegar a UF dos estados

    await promissesUfandCities(url, ufSelect); // Chama a função para gerar a lista das cidades (passa como parâmetro o select e a url)
}


populateUFs(); // Chama a função para selecionar o select do UF


async function getCities(event) {
    const city = document.querySelector("select[name = city]"); // Seleciona o select das cidades
    city.disabled = false; // Disbilita a opção que bloqueia o segundo select (Tava bloqueado pelo HTML)
    city.innerHTML = "<option value></option>"; // Limpa a caixa das cidades antes de preencher

    const ufValue = event.target.value; // Pega o valor do atributo value da option que foi disparada quando teve o change
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // Cria a url com a formatação do estado selecionado
    
    const stateInput = document.querySelector("input[name = state]"); // Pega o input hidden 
    const indexOfSelectedState = event.target.selectedIndex; // Retorna o indíce do option dentro do select selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text; // Atribui no value do input escondido o texto presente no option selecionado

    await promissesUfandCities(url, city); // chama a função da requisição passando como parâmetro a url e o select das cidades
    valueCidade(city);
    //setTimeout(valueCidade, 1000, city); // Chama a função para substituir o value após 1 segundo
    // Para passar um função com parâmetros no setTime out vc tem que passá-los após o tempo.

    
}


document.querySelector("select[name=uf]")
    .addEventListener("change", getCities) // A função é apenas citada sem os (), isso ocorre para que ela só seja chamada quando o evento acontecer
    // O evento change é disparado quando alguma option do select é mudada.



// Itens de coleta 


// Pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li"); // Pega o array com todos os List Items 

const collectedItems = document.querySelector("input[name = items]"); // Seleciona o input hidden que servirá para armazenar e enviar os values dos items de coleta
let selectedItems = []; // Array vazio


for (item of itemsToCollect) {
    // For responsável por percorrer toda lista de List Items

    item.addEventListener("click", (event) => { 
        //Evento de click

        const itemLi = event.target; // Armazena o li na qual foi clicado

        // Adiconar ou remover uma classe com JS
        itemLi.classList.toggle("selected"); // O classList serve para alterar a propriedade de class da tag. Enquanto o toggle serve para adicionar o remover a class caso ela já exista ou não


        const ItemId = itemLi.dataset.id; // Pega o dataset-id da LI

        const alreadySelected = selectedItems.findIndex((item) => {
            // O findIndex serve para quando retorna -1 é pq não encontrou, caso não, retorna o número do índice

            const itemFound = item == ItemId;
            return itemFound;
        })
        

        if (alreadySelected >= 0) {
            const filtedItems = selectedItems.filter( (item) => {
                const itemIsDifferent = item != ItemId;
                return itemIsDifferent;
            })
            selectedItems = filtedItems;
        } else {
            selectedItems.push(ItemId);
        }

        collectedItems.value = selectedItems; //Uma tag pode ter como value mais de um valor
        
    });
}


