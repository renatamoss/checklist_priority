//Banco de dados utilizado no projeto: localStorage
//Consiste em salvar, adicionar, recuperar ou excluir dados localmente em um navegador Web, 
//esta informação é guardada na forma de pares de chave-valor e os valores podem ser apenas strings

//Função Ternária: vai no banco localStorage e retorna (JSON.parse p/ transformar em string)
//Objeto banco(array):tarefa(variável string), status(variavel checked ou vazia) e indice(p/ manipular banco)
const getBanco = () => JSON.parse(localStorage.getItem('checklistList')) ?? [];
const setBanco = (banco) => localStorage.setItem('checklistList', JSON.stringify(banco));

//Criando um elemento label com propriedade createElement
//item.classList.add adiciona uma classe neste elemento criado(item)
//innerHTML: incluindo elemento string no html com JS
//Adiciona no id checklistList(no documento HTML) este item criado appendChild(item)
//criando a tarefa(variável string), status(variavel checked ou vazia) e indice(p/ manipular banco)
//data-indice: atributo que permite troca de infomação entre JS X HTML
const criarTarefa = (tarefa, status = '', indice) => {
    const item = document.createElement('label');
    item.classList.add('checklist__tarefa');

    item.innerHTML = ` 
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>`

    document.getElementById('checklistList').appendChild(item);
}

//Função para limpar as tarefas toda a vez que atualiza o banco(não acumula tarefa)
const limparTarefas = () => {
    const checklistList = document.getElementById('checklistList');
    while (checklistList.firstChild) {
        checklistList.removeChild(checklistList.lastChild);
    }
}

//Atualizar a tela
//antes chama função limparTarefas()
//chamo função getBanco para buscar os dados no localStorage
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarTarefa(item.tarefa, item.status, indice));
}

atualizarTela();

//Inserir Tarefa digitada no imput 'newTarefa'
//Método addEventListener: manda para callback inserirTarefa após keypress
const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco()
        banco.push({ 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTela()
        evento.target.value = '';
    }
}

document.getElementById('newTarefa').addEventListener('keypress', inserirTarefa);

//Função remover tarefa
//Método slice: remove a tarefa do banco conforme(indice)
//depois atualiza banco e atualiza tela
const removerTarefa = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela()
}

//Atualizar tarefa
//se click no checkbox chama função atualizarTarefa(indice): checked
const atualizarTarefa = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela()
}


//Esta função qdo clico na tarefa(qualquer lugar) retorna o elemento
//o elemento tem o indice através da propriede data(dataset retorna o elemento) 
//Se click no button: remove tarefa(indice do elemento)
//se click no checkbox chama função atualizarTarefa(indice): checked
const clickTarefa = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerTarefa(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarTarefa(indice);

    }
}
document.getElementById('checklistList').addEventListener('click', clickTarefa);

atualizarTela()





