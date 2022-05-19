

export function abrirCard ()
{
    idNotifications.classList.add("active");

    idBarraProgreco.classList.add("active");

    setTimeout(() => { idNotifications.classList.remove("active"); }, 5000);

    setTimeout(() => { idBarraProgreco.classList.remove("active"); }, 5300);
}

export function configCard(type, msg)
{
    
    switch (type) 
    {
        case 1:

            styleCard('green','sucesso','Dados salvo com sucesso!','check');

            
            break;

        case 2:
            styleCard('orange','Alerta','Dados descartado','warning_amber');

            break;

        case 3:
            styleCard('red','Erro','Erro no servidor tente novamente','close');

            break;
        case 4:
                styleCard('red','Erro',`Todo mundo erra e dessa vez foi agente. ${msg}`,'close');
    
                break;
    
        default:

            break;
    };
}

function styleCard(cor, title, msg, icone)
{
    idNotifications.style.borderColor = cor;

    idBoxIcone.style.backgroundColor  = cor;

    idIcone.innerHTML = icone;

    idtitle.style.color = cor;
    
    idtitle.innerHTML = title;
    
    idMsg.innerHTML = msg;
    
    idMsg.style.color = cor;
    
    idClose.style.color = cor;

    idBarraProgreco.style.setProperty('--bg', cor); //muda a cor da barra de progresso
};