const form = document.getElementById ('form-atividade'); // pegando o formulário do HTML para manipular os dados que o usuário irá inserir
const imgAprovado = '<img src="./aprovado.png" alt="Emoji celebrando aprovação"/>';
const imgReprovado = '<img src="./reprovado.png" alt="Emoji triste de reprovação"/>';
const atividades = []; // array para armazenar as atividades e suas notas
const notas = []; // array para armazenar as notas das atividades
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // span para estilizar o resultado de aprovação
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'; // span para estilizar o resultado de reprovação
const notaMinima = parseFloat(prompt("Digite a nota mínima para aprovação: ")); // prompt para o usuário definir a nota mínima para aprovação

let linhas = ''; // variável para armazenar as linhas da tabela

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizarTabela();
    atualizaMediaFinal()
});

function adicionaLinha() {    
    
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) { // verificando se a atividade já foi adicionada, usando o método includes para verificar se o nome da atividade já existe no array atividades
        alert(`A atividade "${inputNomeAtividade.value}" já foi adicionada!`);

    }
    else { 
    atividades.push(inputNomeAtividade.value); // adicionando o nome da atividade ao array atividades
    notas.push(parseFloat(inputNotaAtividade.value)); // adicionando a nota da atividade ao array notas, convertendo para número com parseFloat

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // operador ternário para verificar se a nota é maior ou igual a 7, se for, exibe o emoji de aprovação, caso contrário, exibe o emoji de reprovação
    linha += '</tr>';

    linhas += linha; // adicionando a nova linha à variável linhas

    inputNomeAtividade.value = ''; // limpando o campo de nome da atividade
    inputNotaAtividade.value = ''; // limpando o campo de nota da atividade
    }
}
function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody'); // pegando o corpo da tabela para inserir as linhas
    corpoTabela.innerHTML = linhas; // inserindo as linhas no corpo da tabela
}

function atualizaMediaFinal() {
    const mediaFinal = calcularMedia(); // calculando a média final chamando a função calcularMedia

    document.getElementById('media-final-valor').innerHTML= mediaFinal.toFixed(2); // atualizando o valor da média final no HTML, usando toFixed(2) para limitar a 2 casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? '<span class="resultado aprovado">Aprovado</span>' : '<span class="resultado reprovado">Reprovado</span>'; // atualizando o resultado final no HTML, usando operador ternário para verificar se a média é maior ou igual a 7, se for, exibe "Aprovado", caso contrário, exibe "Reprovado"
}

function calcularMedia() {
    let somaDasNotas = 0; // variável para armazenar a soma das notas

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]; // somando as notas do array notas
    }
    
    return somaDasNotas / notas.length; // calculando a média dividindo a soma das notas pelo número de notas

}