//lista de tipos
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

//cria uma funcao que retorna o html da lista com as informacoes do fetch
function convertePokemonToLi(pokemon) {
    //USA CRASE
    //debugger
    // Nao pode deixar o return sozinho na linha, da erro de undefined!!!
    return `
        <li class="pokemon">
            <span class="number">${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

// colocamos em uma constante o alvo onde queremos colocar os cards dos pokemosn
const LocalInsercaoHtml = document.getElementById('pokemonList')

//chamamos a funcao que faz a conexao com a API e tratamos com um .then novamente o formato dessa lista
//no then poe por default uma lista vazia, para em caso de nao vir nada, a lista vazia é recebida e nao da erro
pokeApi.getPokemons().then((pokemonList = []) => {
    // como as arrow functions usam referencias, podemos trocar todas as linha abaixo por:
    // pega a lista de pokemons, mapeia, junta e joga no html concatenando:
    const newHtml = pokemonList.map(convertePokemonToLi).join('')
    LocalInsercaoHtml.innerHTML = newHtml
    // o map retorna value, index, array
    // o map substitui o for
    // arrow function usa somente uma linha
    //const newList = pokemonList.map((pokemon) => convertePokemonToLi(pokemon))
    // O join junta todos os elentos da lista
    //const newHtml = newList.join('')
    //pokemonLi.innerHTML += newHtml
})
  
