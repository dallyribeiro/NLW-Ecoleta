function populateUFs() {
    //Pega o select
    const ufSelect = document.querySelector("select[name=uf]") 
    //Promessa
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //Retorna uma nova promessa
    //.then( (res) => {return res.json})
    .then(res => res.json() ) //Função anônima que está retornando um valor
    .then(states => { 
        
        //Para cada estado de estados e colocar na variavel
        for( const state of states) {

        //Propriedade do html, ou do select
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}
populateUFs()

//Função para pegar as cidades
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]") 
    const stateInput = document.querySelector("input[name=state]")
    
    //console.log(event.target.value) Onde o evento foi executado
    const ufValue = event.target.value

    //Pega de maneira dinamica 
    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState]

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)    
    .then(res => res.json() ) 
    .then(cities => {        
        for( const city of cities) {        
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]") //Procurar pelo seletor
    .addEventListener("change", getCities) //Adicionar um "ouvidor de eventos"
        





















