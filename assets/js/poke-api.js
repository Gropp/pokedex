// vamos criar uma função para centralizar a manipulacao do fetch
// função que faz o consumo da API
// precisamos fazer um fetch para cada detalhe de cada pokemon

const pokeApi = {}

//preenchendo a classe pokemon que criamos
function convertPokeApiDetailToPokemon(pokeDetail) {
    //instancia a classe
    const pokemon = new Pokemon()
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //desconstruindo o objeto types
    //pega somente o primeiro tipo, que é o ambiente do pokemon grass/fire/water ...
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getTotalPokemon = () => {
    const urlSimples = 'https://pokeapi.co/api/v2/pokemon'
    return fetch(urlSimples)
        .then((response) => response.json())
        .then((jsonCount) => jsonCount.count)
        .catch((error) => console.log(error))
        .finally(() => console.log('Requisição do total OK!'))

}

//metodo para buscar os detalhes dos pokemons Ja retorna em JSON
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

//offset e limit sao usados na paginacao
pokeApi.getPokemons = (offset, limit) => {
    // grava a url ja com a query string
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    //o fetch retorna uma promisse - pois esta buscando algo da rede, e o tempo de resposta é indeterminado/imprevisivel
    return fetch(url)
        //sucesso
        //transforma a resposta em um json
        .then((response) => response.json())
        //retira desse json somente o campo results da API (cada api tem um nome)
        .then((jsonBody) => jsonBody.results)
        //os proximos then buscam na url do pokemon que veio nos results os detalhes de cada pokemon
        //para cada results eu pego a url de detalhes de cada pokemon com o map e faço um fetch na url e trata para vir como JSON
        //chama o metodo detail que faz um fetch nas urls
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //usamos o promise all para esperar que todas as requisicoes venham
        .then((detailRequests) => Promise.all(detailRequests))
        //so executa o proximo then quando todas as promises forem executadas
        //criando uma lista com todos os detalhes dos pokemons
        .then((pokemonDetails) => pokemonDetails)
        //fracasso
        .catch((error) => console.log(error))
        .finally(() => console.log('Requisição concluida!'))
}

//chamamos a funcao que faz a conexao com a API e tratamos com um .then novamente o formato dessa lista
//no then poe por default uma lista vazia, para em caso de nao vir nada, a lista vazia é recebida e nao da erro
// pokeApi.getPokemons().then((pokemonList = []) => {
    // como as arrow functions usam referencias, podemos trocar todas as linha abaixo por:
    // pega a lista de pokemons, mapeia, junta e joga no html concatenando:
    // const newHtml = pokemonList.map(convertePokemonToLi).join('')
    // LocalInsercaoHtml.innerHTML = newHtml
    // o map retorna value, index, array
    // o map substitui o for
    // arrow function usa somente uma linha
    //const newList = pokemonList.map((pokemon) => convertePokemonToLi(pokemon))
    // O join junta todos os elentos da lista
    //const newHtml = newList.join('')
    //pokemonLi.innerHTML += newHtml
//})