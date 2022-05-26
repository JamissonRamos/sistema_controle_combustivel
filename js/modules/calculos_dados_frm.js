import {mostraModal} from "../main.js";

let preco           = 0
let quilometros_dia = 0
let media           = 0
let dias_semana     = 0
let resulDiario     = 0
let resulSemanal    = 0
let resulMensal     = 0
let resulAnual      = 0


 export function receberDadosFrm(frm)
{
    let inputs = frm.getElementsByTagName('input');

    let arrayInputs = [...inputs]

    arrayInputs.forEach(item => 
    {            
        'media' == item.id ? media = Number(item.value.replace(',', '.')) : false;
        'preco' == item.id ? preco = Number(item.value.replace(',', '.')) : false;
        'quilometros_dia' == item.id ? quilometros_dia = Number(item.value.replace(',', '.')) : false;
        'dias_semana' == item.id ? dias_semana = Number(item.value.replace(',', '.')) : false;
    });

    resulDiario = valoresCal(1,quilometros_dia,media,preco);
    resulSemanal = valoresCal(2,quilometros_dia,media,preco,dias_semana);
    resulMensal = valoresCal(3,quilometros_dia,media,preco,dias_semana);
    resulAnual = valoresCal(4,quilometros_dia,media,preco);

    mostraModal(preco, media, resulDiario, resulSemanal, resulMensal, resulAnual)

};

function valoresCal(typeCalculo,  mediaCarro, valorGasolina , qtdKmDia, diaSeman) 
{
    let resultadoCalculo = 0 

    switch (typeCalculo)
    {
        case 1: //calcularDiario
            
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia;
            // console.log((valorGasolina / mediaCarro) * qtdKmDia)
            break;

        case 2: //calcularSemanal
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * diaSeman;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * diaSeman)
            break;

        case 3: //calcularMensal
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * 30;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * 30)
            break;

        case 4: //calcularAnual
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * 365;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * 365)
            break;

        default:
            break;
    }

    return resultadoCalculo
}


