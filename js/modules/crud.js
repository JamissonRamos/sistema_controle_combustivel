import {read,create} from "../modules/banco_dados.js";


export async function crud(type, obj)
{
    const[ objetoSalvar ] = obj;

    switch (type) 
    {
        case 1: 
            
            let listaHistoricos =  await read();
            
            listaHistoricos.push(objetoSalvar);

            await create(listaHistoricos);
 
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

            abrirCard(); 

            configCard(4);

            break;
    }
};

/* 
1 - Esse crud ficou como base dados, como se fosse meu banco 
2 - case 1 -> vai ser onde vai add todo registro novo
    2.2 => nessa case vai utilizar a variável de listaHistoricos, para trazer os dados e então add novo registo 



*/