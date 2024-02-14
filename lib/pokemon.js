// TODO write your code here

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'
const cardTemplate = document.querySelector('#cardTemplate')
const cardsContainer = document.querySelector('#cardsContainer')
const infoTemplate = document.querySelector('#infoTemplate')
const infoContainer = document.querySelector('#infoContainer')


fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then((pokedata) => {
          const clone = cardTemplate.content.cloneNode(true)
          clone.querySelector('img').src = pokedata.sprites.front_default
          clone.querySelector('h2').innerText = pokedata.name
          clone.querySelector('p').innerText = pokedata.types.map(type => type.type.name).join(', ')
          clone.querySelector('a').addEventListener('click', () => {
            infoContainer.innerHTML = ''
            const infoClone = infoTemplate.content.cloneNode(true)
            infoClone.querySelector('img').src = pokedata.sprites.front_default
            infoClone.querySelector('h2').innerText = pokedata.name
            infoClone.querySelector('p').innerText = pokedata.types.map(type => type.type.name).join(', ')

            infoContainer.appendChild(infoClone)
          })

          cardsContainer.appendChild(clone)
        })
    })
  })
// gh pages
