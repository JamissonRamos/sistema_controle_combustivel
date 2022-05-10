import {ValidatorCampos} from "./modules/validacao_campo.js";

//#region Variveis

let validator = new ValidatorCampos();

//#endregion



//#region Eventos do HTML

btnCalcular.addEventListener('click', (event) => {   
    
    event.preventDefault(); 
    
    console.log('clicou no btn de calculo dos dados')
    
    //mandando o meu form para ser valiado
    validator.validate(idFormCadastro);
    
    let erro = document.querySelectorAll('form .e')

    if(erro.length === 0)
    {
        // frm.id == 'formIn' ? conexaoCrud(1) : conexaoCrud(2)
        console.log('Deu certo mano')
        formSubmit()
        // event.target.submit();
        //event.submit();
    }
})







//#endregion