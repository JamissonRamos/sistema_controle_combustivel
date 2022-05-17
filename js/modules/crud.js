
//let listaHistoricos = JSON.parse(localStorage.getItem('listaHistoricos')) || [];

//console.log(listaHistoricos);

export function crud(type, obj)
{
    

    switch (type) 
    {
        
        case 1: 
            console.log(obj);

            //listaHistoricos.push(obj);

            //console.log(listaHistoricos)

            console.log('banco salvar');

            //Salvar o array (listaUsuario) dentro do localStorage = Vai convverter o array (listaUsuario) em json 
            localStorage.obj = JSON.stringify(obj); 
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

