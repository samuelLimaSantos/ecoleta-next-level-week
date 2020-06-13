function formatarCampo(campoTexto) {
    campoTexto.value = mascaraCnpj(campoTexto.value);

}
function retirarFormatacao(campoTexto) {
campoTexto.value = campoTexto.value.replace(/(\.|\/|\-)/g,"");
}

function mascaraCnpj(valor) {
return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}


function validacao() {
const cnpj = document.querySelector("input[name = cnpj]").value;
const inputHiden = document.querySelector("input[name =cnpjValor]");

let cnpj2 = cnpj.replace(".","");
let cnpj3 = cnpj2.replace(".","");
let cnpj4 = cnpj3.replace("-", "");

const cnpjNumero = cnpj4.replace("/", "");
inputHiden.value = cnpjNumero;



if (!isNumber(cnpjNumero)) {
    alert("O campo CNPJ deve ter apenas números!");
} else if (cnpj.length < 14) {
    alert("O cnpj deve ter 14 números!");
} else {
    document.querySelector("#form").submit();
}

}

function isNumber(n) {
return !isNaN(parseFloat(n)) && isFinite(n);
}