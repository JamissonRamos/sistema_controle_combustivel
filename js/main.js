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
    this.preco = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
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
function formSubmit()
{
    document.getElementById('idFrmEnvioEmail').submit();
}

function modal(id) 
{

    switch (id) 
    {
        case 1: //Btn Meus Históricos
            idDivModal.classList.toggle("active");

            break;

        case 2: //Btn Mostra Cálculos
            idDivModal.classList.toggle("active");
    
            idDivResposta.classList.toggle("active");

            break;

        case 3: //Btn Mostra Fechar
            idDivModal.classList.remove("active");
    
            idDivResposta.classList.remove("active");

            break;
    
        default:
            break;
    };

    
}
 
//Função que vai mostra os valores dos cálculos nos campos do frm resposta
export function mostraModal(valorDiario, valorSemanal, valorMensal, valorAnual)
{
    idSpanGatoD.textContent = valorDiario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoS.textContent = valorSemanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoM.textContent = valorMensal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoA.textContent = valorAnual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;

    arrayValoresCalculados.push
    (
        valorDiario.toFixed(2),
        valorSemanal.toFixed(2),
        valorMensal.toFixed(2),
        valorAnual.toFixed(2) 
    )
    
    console.log(arrayValoresCalculados)
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

        formSubmit();
    }
})

idButtonHistorico.addEventListener("click", () => 
{
    modal (1);
});

idDivModal.addEventListener("click", () => 
{
    modal (3);
});

idBtnSalvaHistorico.addEventListener("click", () => 
{ 
    // modal(2);
    
    const [gastoD, gastoS, gastoM, gastoA] = arrayValoresCalculados;

    let objHistorico = [];

    objHistorico.push( new DadosFrm
        (
            idFormCadastro.preco.value,
            idFormCadastro.media.value,
            gastoD, 
            gastoS, 
            gastoM, 
            gastoA
        )
    );
        
    crud(1, objHistorico);

});

idBtnDescartaHistorico.addEventListener("click", () => 
{ 
    modal();

    abrirCard(); 

    configCard(2);
});

idClose.addEventListener("click", () => 
{
    idNotifications.classList.remove("active");

    idBarraProgreco.classList.remove("active");

    // setTimeout(() => { idBarraProgreco.classList.remove("active"); }, 6000);
})





//#endregion