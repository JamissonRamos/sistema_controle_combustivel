

export function crud(type, array)
{
    switch (Number) 
    {
        case 1: 
            //Salvar o array (listaUsuario) dentro do localStorage = Vai convverter o array (listaUsuario) em json 
            localStorage.listaHistorico = JSON.stringify(listaHistorico); 
            break;
        case 2: 
            //O for of recebe como paramentro o Json do local storage e converte para cada loop ele vai atribuir um valor para o array
            //for (let i of JSON.parse(localStorage.listaHistorico)) {
            //console.log(i)
            //recuperarGasto.push(new usuario(i.nome, i.email, i.senha, i.dataCadastro))
            //console.log(recuperarTarefas)
            //}
            break;

        default:
            break;
    }
}

