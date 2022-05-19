import { abrirCard, configCard } from "../modules/modal_msgbox.js";

//1 => Read
export async function read() 
{   try
    {
        return await JSON.parse(localStorage.getItem('listaHistoricos')) || []

    } catch(e) { msgBox(4, e) } 
}

//2 => Create
export async function create(objSalvo)
{
    try
    {
        localStorage.listaHistoricos = await JSON.stringify(objSalvo);

        msgBox(1);

    } catch(e) { msgBox(4, e) } 
}


//3 => Update
//4 => Delete

//5 => Msgbox
function msgBox(type,msg) 
{
    abrirCard();

    configCard(type, msg)

    //window.location.reload()
}
