import {ValidatorCampos} from "./modules/validacao_campo.js";
import {addcl,remcl} from "./modules/animacoes.js";

//#region Variveis

let validator = new ValidatorCampos();

//recebe todos os inputs do frm
const inputs = document.querySelectorAll(".campo");

//#endregion


//#region Funções

function modal() 
{
    // idDivModal.classList.toggle("template")
    idDivModal.classList.toggle("active")
    idDivResposta.classList.toggle("active")
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
        modal()
        // frm.id == 'formIn' ? conexaoCrud(1) : conexaoCrud(2)
        //formSubmit()
    }
})







//#endregion