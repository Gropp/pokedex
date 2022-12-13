// vamos criar uma função para centralizar a manipulacao do fetch
// função que faz o consumo da API

const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    // grava a url ja com a query string
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    //o fetch retorna uma promisse - pois esta buscando algo da rede, e o tempo de resposta é indeterminado/imprevisivel
    return fetch(url)
        //sucesso
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        //fracasso
        .catch((error) => console.log(error))
}