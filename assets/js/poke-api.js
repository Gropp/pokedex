// vamos criar uma função para centralizar a manipulacao do fetch
// função que faz o consumo da API
// precisamos fazer um fetch para cada detalhe de cada pokemon

const pokeApi = {}

//metodo para buscar os detalhes dos pokemons Ja retorna em JSON
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
}

//offset e limit sao usados na paginacao
pokeApi.getPokemons = (offset = 0, limit = 10) => {
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