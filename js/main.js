import {animeScroll,addcl,remcl} from "./modules/animations_pages.js";
import {copiarTexto} from "./modules/copiar_texto.js";
import {buscaDadosGitHub} from "./modules/meus_projetos.js"
import {ValidatorCampos} from './modules/validacao_campo.js'
import {masks} from './modules/masks.js'

let validator = new ValidatorCampos();

//#region Funções

function show_menu_hbg()
{   
    //classList => Vai trazer um array com todas as class que tem no elemento com o id selecionado para ser verificado.
    idNavMenu.classList.forEach(itens => 
    {
        if (itens == 'active')
        {   
            idSectionMenuHbg.classList.toggle("active");
            idNavMenu.classList.toggle("active");
        };
    });
}

function formSubmit()
{
    document.getElementById('idFrmEnvioEmail').submit();
}

//#endregion


//#region Eventos do html

//Inicialiçando funções
animeScroll(); 
buscaDadosGitHub();

//Evento do menu HBG 
idSectionMenuHbg.addEventListener("click", () => 
{   
    //Foi preciso separa esses comando de add e remover a class active para atender as regras de quando for clicado pelo menu Hbg e for clicado menu normal
    
    idSectionMenuHbg.classList.toggle("active");
    idNavMenu.classList.toggle("active");

});

//Evento do scroll
idDivContainer.addEventListener('scroll', (evt) => 
{
    // evt.target.scrollTop, verica o top do do id conteiner a distancia que ele se encontra do top da pagina
    evt.target.scrollTop > 110 ? idDivHome.style.display = "block" : idDivHome.style.display = "none"
 
    animeScroll();
 })

idDivCardNome.addEventListener('click', () => { copiarTexto(idSpanCardNome)});
idDivCardEmail.addEventListener('click', () => { copiarTexto(idSpanCardEmail)});
idDivCardCelular.addEventListener('click', () => { copiarTexto(idSpanCardCelular)});
idDivCardEndereco.addEventListener('click', () => { copiarTexto(idSpanCardEndereco)});


idButtonEnviarMsg.addEventListener('click', (event) => {   

    event.preventDefault(); 

    console.log('clicou no btn de envio de msg box')

    //mandando o meu form para ser valiado
    validator.validate(idFrmEnvioEmail);

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

//Animações dos inputs ao receber e perder o foco 
document.querySelectorAll('.input, #idinputEnviarMsg').forEach(input => 
{
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

    //Vericar as mascaras dos campos
document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)


});

//#endregion

window.show_menu_hbg=show_menu_hbg;