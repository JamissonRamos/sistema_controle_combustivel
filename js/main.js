import {ValidatorCampos} from "./modules/validacao_campo.js";
import {addcl,remcl} from "./modules/animacoes.js";
import {abrirCard,configCard} from "./modules/modal_msgbox.js";
import {receberDadosFrm} from "./modules/calculos_dados_frm.js";
import {crud} from "./modules/crud.js";

//#region Variveis

let validator = new ValidatorCampos();
let arrayValoresCalculados = []

//recebe todos os inputs do frm
const inputs = document.querySelectorAll(".campo");

//#endregion


//#region Funções

function DadosFrm(preco, media, gastoDiario, gastoSemanal, gastoMensal, gastoAual) 
{
    this.data = tratarData();
    this.preco = Number(preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    this.media = media;
    this.gastoDiario = gastoDiario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoSemanal = gastoSemanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoMensal = gastoMensal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoAual = gastoAual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
};

function tratarData() 
{
    let data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear().toString().padStart(2, '0'),
		hora = data.getHours().toString().padStart(2, '0'),
		min  =  data.getMinutes(),
		sec = data.getSeconds()
    return `${dia}/${mes}/${ano} ${hora}:${min}:${sec}`;
}

//Função para fazer o frm submit, atualizado a tela 
function atualizarForm(type)
{
    switch (type) 
    {
        case 1:
            document.getElementById('idFormCadastro').reset();
            
            break;
            
        case 2:
            
            document.getElementById('idFormCadastro').submit();
            break;
    
        default:
            break;
    }
}

function modal(id) 
{

    switch (id) 
    {
        case 1: //Btn Meus Históricos
            idDivModal.classList.toggle("active");
            idDivTebelaHistorico.classList.toggle("active");

            break;

        case 2: //Btn Mostra Cálculos
            idDivModal.classList.toggle("active");
    
            idDivResposta.classList.toggle("active");

            break;

        case 3: //Mostra modal Sem Registo
            idDivModal.classList.toggle("active");
    
            idDivSemRegistro.classList.toggle("active");

            break;
    
        default:
            break;
    };

    
}
 
//Função que vai mostra os valores dos cálculos nos campos do frm resposta
export function mostraModal(preco, media, valorDiario, valorSemanal, valorMensal, valorAnual)
{
    idSpanGatoD.textContent = valorDiario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoS.textContent = valorSemanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoM.textContent = valorMensal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoA.textContent = valorAnual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;

    arrayValoresCalculados.push
    (
        preco.toFixed(2),
        media,
        valorDiario.toFixed(2),
        valorSemanal.toFixed(2),
        valorMensal.toFixed(2),
        valorAnual.toFixed(2) 
    )
}

//Função que vai carregar os dados na tabela de históricos 
function tratandoDadosHistorico(obj) 
{
    obj.forEach((item, indice) => { criarTemplete(item, indice) });

    modal(1);
}

function criarTemplete(obj, indice) 
{
    idTbodyHistorico.innerHTML +=
    `
        <tr>
            <td> ${obj.data} </td>
            <td> ${Number(obj.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${obj.media} </td>
            <td> ${Number(obj.gastoDiario).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoSemanal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoMensal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoAual).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
             <td class="td_button"> 
                <button class="icone fas fa-trash-alt " onclick="excluirRegistro(${indice})"> </button> 
            </td>

        </tr>
    
    `
}

async function excluirRegistro(indiceRegistro) 
{
    let arrayHistoricos = await crud(2)

    //Excluir itens da lista
    arrayHistoricos.splice(indiceRegistro,1)

    await crud(3,arrayHistoricos);
}


//#endregion


//#region Eventos do HTML

//Fica verificando os eventos de focus e blur, quando o input recebe foco e perde o foco
inputs.forEach(input => {

	input.addEventListener("focus", addcl);

	input.addEventListener("blur", remcl);
});

btnCalcular.addEventListener('click', (event) => {   
    
    event.preventDefault(); 
    
    //mandando o meu form para ser valiado
    validator.validate(idFormCadastro);
    
    let erro = document.querySelectorAll('form .e')

    if(erro.length === 0)
    {
        receberDadosFrm(idFormCadastro);

        modal(2);

        atualizarForm(1);
    }   
})

idButtonHistorico.addEventListener("click", async ()  => 
{
    let arrayHistoricos = await crud(2)
    
    arrayHistoricos.length > 0 ? tratandoDadosHistorico(arrayHistoricos) : modal(3);    
});

idDivModal.addEventListener("click", () => 
{
    modal (3);
});

idBtnSalvaHistorico.addEventListener("click", () => 
{ 
    // modal(2);
    
    const [preco, media, gastoD, gastoS, gastoM, gastoA] = arrayValoresCalculados;

    let objHistorico = [];

    objHistorico.push( new DadosFrm
        (
            
            preco,
            media,
            gastoD, 
            gastoS, 
            gastoM, 
            gastoA
        )
    );
        
    crud(1, objHistorico);
    
    //Fechar os modal de cálculos
    setTimeout(() =>
    {
        modal(2);

        atualizarForm(2);

    }, 5400);
});

idBtnDescartaHistorico.addEventListener("click", ()  => 
{ 
    abrirCard(); 
    
    configCard(2);
    
    setTimeout(() =>
    {
        modal(2);

        //Depois que fechar os modal atualizar o frm
        setTimeout(() => { atualizarForm(2);}, 900);
        
    }, 5400);
});

idClose.addEventListener("click", () => 
{
    idNotifications.classList.remove("active");

    idBarraProgreco.classList.remove("active");

    // setTimeout(() => { idBarraProgreco.classList.remove("active"); }, 6000);
})

idCloseListaHistorico.addEventListener("click", () => 
{
   modal(1)
})

idSpanCloseSemRegistro.addEventListener("click", () => 
{
   modal(3)
})

idButtonLimparHistorico.addEventListener("click", () => {localStorage.clear(); modal(1)})


//#endregion 


window.excluirRegistro=excluirRegistro;