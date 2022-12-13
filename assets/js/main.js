// constantes para paginacao e para guardar a URL da API
const offset = 0
const limit = 10
// grava a url ja com a query string
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

//o fetch retorna uma promisse - pois esta buscando algo da rede, e o tempo de resposta é indeterminado/imprevisivel
//o fetch usa sempre o metodo GET
//o metodo them processa a resposta - executa uma funcao
//o sistema continua a executar o programa e quando o fetch obter a resposta o sistema executa a funçao apontada pelo then - essa funçao é assincrona
fetch(url)
    //sucesso
    //é possivel encadear varios then, sendo que o proximo sempre recebe a resposta do anterior atraves do return
    //assim evitamos fazer recursividade de funcoes
    //podemos tambem usar funcoes arrow ao inves de declarativas
    //.then(function(response){
    //converte o corpo da resposta em JSON
    //      return response.json()
    //})

    //arrow fuction bem simplificada
    .then((response) => response.json())
    //.then(function(jsonBody){
    //o proximo then converte a resposta para um json e já é possivel manipular as informacoes para o html
    //vamos criar um then que ja traga somente o campo RESULTS do BODY DO GET
    //desconstruindo o objeto de resposta
    .then((jsonBody) => jsonBody.results)
    //como tem mais de uma acao essa funcao, é preciso colocar {}
    .then((pokemonList) => {
        //debugger
        console.log(pokemonList)
    })
    //fracasso
    .catch((error) => console.log(error))
    //alguma acao idenpedente do sucesso ou fracasso da requisicao (opcional)
    .finally(() => console.log('Requisição concluida!'))
