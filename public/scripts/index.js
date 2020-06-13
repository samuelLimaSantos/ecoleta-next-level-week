const button = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const sair = document.querySelector(".header a");



button.addEventListener("click", () => {
    modal.classList.toggle("hide");
})

sair.addEventListener("click", () => {
    modal.classList.toggle("hide");
})



/**Código responsável por colocar um evento de click no button de pesquisa e no X de quit.
 * A função dentro do evento modifica a class com o toggle (classList.toggle()) 
 * ==> toggle age como uma espécie de interruptor
 */