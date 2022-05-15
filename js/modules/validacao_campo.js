export class ValidatorCampos
{
    
    constructor()
    {
        this.validations =
        [
			'data-required', //Campos obrigatorios
			'data-only-numbers', //Digitar somente números
			'data-rend-numbe', //Receber valor de dias da semana
        ];
    };/* Fim do constructior */

    validate(form)    
    {
        let percorrerValidations = document.querySelectorAll('form .error-validation');

        if(percorrerValidations.length > 0)
        {
            this.limparValidations(percorrerValidations);
        }

        let inputs = form.getElementsByTagName('input');

        // console.log(inputs)
        // console.log(textareas)

        let arrayInputs = [...inputs]
       
// //         console.log(arrayInputs)

        arrayInputs.forEach(item =>
        {
            for (let i = 0; this.validations.length > i; i++) {

                if(item.getAttribute(this.validations[i]) != null)
                {
                    // console.log(this.validations[i].replace('data-','').replace('-',''))
                    // console.log(item)

                    let nomeMetodo = this.validations[i].replace('data-','').replace('-','');

                    // //console.log(nomeMetodo)

                    let valorAtributo = item.getAttribute(this.validations[i]);

                    this[nomeMetodo](item, valorAtributo)
                }
            }
        }, this);
    };

    // método para exibir inputs que são necessários
    required(input)
    {
        let inputValue = input.value;

        if(inputValue === '')
        {
            let errorMessage = `Opa, Este campo é obrigatório`;

            this.imprimirMsgbox(input, errorMessage);
        }
        else if(inputValue <= 0)
        {
            let errorMessage = `Ei, Deve preencher com um valor maior que zero (0)`;

            this.imprimirMsgbox(input, errorMessage);
        }
}


	//Campo pode receber valor de 1 ate 8
	rendnumbe(input)
	{
		let inputValue = input.value

		if(inputValue > 8)
		{
			let errorMessage = `Opa, esse campo so pode receber valor de 1 até 8`;

			this.imprimirMsgbox(input, errorMessage);
		}
	}

	//Receber somente numero, ',' ou '.'
	onlynumbers(input) {
		//Formta a variavel para compara alor recebido do input
		let re =  /^[0-9.]+$/; ///^[0-9.]+$/
		//limpa e os espaços e troca as , por .
		let inputValue = input.value.replace(',','.').trim();

		let errorMessage = `Ei, este campo não aceita letras somente números`;

		if(!re.test(inputValue)) {
			this.imprimirMsgbox(input, errorMessage);
		}

	}


    imprimirMsgbox(input, msg)
    {
        let qtdErros = input.parentNode.querySelector('.error-validation');

        if(qtdErros === null)
        {
            let novaDivErro = document.querySelector('.error-validation').cloneNode(true);

            novaDivErro.textContent = msg;

            // console.log(input)
            
            let inputPai = input.parentNode;
            
            // console.log(inputPai)

            novaDivErro.classList.remove('template');

            inputPai.appendChild(novaDivErro);
            
            novaDivErro.classList.add('e');

            // novaDivErro.style.backgroundColor = 'rgba(252, 14, 14, 0.233)';
            novaDivErro.style.borderLeftColor = 'red';
        }
    };

    limparValidations(validations)
    {
        validations.forEach(item => {item.remove()})
    };

};/* Fim da Class */
