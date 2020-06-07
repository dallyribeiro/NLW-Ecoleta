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
    const citySelect = document.querySelector("[name=city]") 
    const stateInput = document.querySelector("[name=state]")
    
    //console.log(event.target.value) Onde o evento foi executado
    const ufValue = event.target.value

    //Pega de maneira dinamica 
    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Limpa o conteúdo antes de pegar outro
    citySelect.innerHTML =  "<option value>Selecione a cidade</option>"
    //Bloueia o campo
    citySelect.disabled = true

    fetch(url)    
    .then(res => res.json() ) 
    .then(cities => {       
        
        for( const city of cities) {        
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]") //Procurar pelo seletor
    .addEventListener("change", getCities) //Adicionar um "ouvidor de eventos"
        


//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li") 

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//Coleção de dados, um array
let selectedItems = [] //Let adicionando valor na variavél

function handleSelectedItem(event){
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //Verificar se existem itens seleciona
    //Se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex ( item => {//procurar por index
        return itemFound = item == itemId //Isso será true or false
        return itemFound
} )

    //Se já estiver selecionado
    if(alreadySelected >= 0) {
        //Tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //False
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{
        //Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)

    } 

    //Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
    
}












