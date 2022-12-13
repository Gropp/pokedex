//cria uma funcao que retorna o html da lista com as informacoes do fetch
function convertePokemonToLi(pokemon) {
    //USA CRASE
    //debugger
    // Nao pode deixar o return sozinho na linha, da erro de undefined!!!
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    <li class="type">grass</li>
                    <li class="type">poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>
        </li>
    `
}

// colocamos em uma constante o alvo onde queremos colocar os cards dos pokemosn
const pokemonLi = document.getElementById('pokemonList')

    pokeApi.getPokemons().then((pokemonList) => {
        //debugger
        console.log(pokemonList)
        for (let i=0; i < pokemonList.length; i++){
            const pokemon = pokemonList[i];
            // adiciona mais
            pokemonLi.innerHTML += convertePokemonToLi(pokemon)
        }
    })
    //fracasso
    .catch((error) => console.log(error))
    //alguma acao idenpedente do sucesso ou fracasso da requisicao (opcional)
    .finally(() => console.log('Requisição concluida!'))
