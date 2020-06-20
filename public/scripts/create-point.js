//document.querySelctorAll(input) serve para usar o código em alguma parte do documento//
function populateUFs() { 
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //criar uma função anônima// 
    // outro modo de escrever seria:
    // .then( res => res.json() )
    .then( (res) => { return res.json()}) 
    .then(states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //+= pegar você mesmo e somar
        }
    })
}
populateUFs()
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value 
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json()) //criar uma função anônima// 
    .then(cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //+= pegar você mesmo e somar
        }           
        citySelect.disabled = false
        } )
}
document
    .querySelector("select[name=uf]")
    .addEventListener ("change", getCities)
//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of  itemsToCollect) {
    items.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []
// ele coloca let porque depois vai mudar os valores, se fosse const n poderia
function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    //primeiro, verificar se existem itens selecionados, se sim 
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // == é para comparar valor
        return itemFound
    })
    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
// tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicinar à seleção
        selectedItems.push(itemId)
    }
    //se não estiver selecionado, adicionar adicionar à seleção
    //atualizar, por fim, o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}