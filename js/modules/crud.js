import {read,create,excluir} from "../modules/banco_dados.js";

export async function crud(type, obj)
{
    switch (type) 
    {
        case 1: 
            const[ objetoSalvar ] = obj;
            
            let listaHistoricos =  await read();
            
            listaHistoricos.push(objetoSalvar);

            await create(listaHistoricos);
 
            break;

        case 2: 

            let arrayHistoricos =  await read();

            return arrayHistoricos

        case 3:

            await excluir(obj);

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