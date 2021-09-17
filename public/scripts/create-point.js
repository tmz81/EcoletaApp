//get states
function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then(states => {
    for(const state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}
populateUFs()

//get city
function getCity(event) {
  const citySelect = document.querySelector('[name=city]')
  const stateInput = document.querySelector('[name=state]')
  const ufValue = event.target.value
  const indexState = event.target.selectedIndex
  stateInput.value = event.target.options[indexState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })  
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCity)