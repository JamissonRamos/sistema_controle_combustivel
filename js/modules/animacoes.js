//Vai atribuir a class 'preenchido' no elemnto pai do input
export function addcl()
{
	let parent = this.parentNode;

	parent.classList.add("preenchido");
}

//Vai remover a class 'preenchido' no elemnto pai do input, se o input for vazio
export function remcl()
{
	let parent = this.parentNode;

	if(this.value == "")
	{
		parent.classList.remove("preenchido");
	}
}
