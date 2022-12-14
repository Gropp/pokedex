// colocamos em uma constante os alvos onde queremos colocar os cards dos pokemons e o button
const totalPokemonHtml = document.getElementById('totalPokemon')
const LocalInsercaoHtml = document.getElementById('pokemonList')
const loadMoreButtons = document.getElementById('loadMoreButton')

//declaracao dos controles de paginacao
const maxRecords = 100
const limit = 12;
let offset = 0;


//paginacao - na verdade vai fazer um append - vai aumentar o numero de elementos
function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">0${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}"/>
                </div>
            </li>
        `).join('')
        LocalInsercaoHtml.innerHTML += newHtml
    })
}

pokeApi.getTotalPokemon().then((totalPokemon) => {
    const totalHtml = `<p class="totalPokemon">Número total de Pokemons é de: <span>${totalPokemon}</span></p>`
    totalPokemonHtml.innerHTML = totalHtml
})

loadMorePokemons(offset, limit)

//adiciona um evento ao botao
loadMoreButtons.addEventListener('click', () => {
    // incrementa o offset com o valor do intervalo do limite
    offset += limit
    loadMorePokemons(offset, limit)
})