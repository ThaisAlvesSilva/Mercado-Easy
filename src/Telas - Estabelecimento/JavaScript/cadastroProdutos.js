URL = "https://api-storage-mercado-easy.herokuapp.com/produtos/" 
var idProduto = 0;

window.onload = () => {
   /*   var dados = JSON.stringify({
        idUsuario: 1,
        tipoUsuario: "estabelecimentos"
    });
    localStorage.setItem('dados', dados);  */  

    document.getElementById('nome').value='';
    document.getElementById('tipoProduto').value='';
    document.getElementById('marca').value='';
    document.getElementById('preco').value='';
    document.getElementById('quantidade').value='';

    getIdProduto();

    cadastroProdutos.onsubmit = (evento) => {
          
        var dados = JSON.parse(localStorage.getItem('dados'));
        var idEstabelecimento = dados.idUsuario;
        var nomeProduto = nome.value.toLowerCase();
        var precoProduto = preco.value;
        var marcaProduto = marca.value;
        var quantidadeProduto = quantidade.value;
        var select = document.getElementById('tipoProduto');
        var tipoProduto= select.options[select.selectedIndex].value;

        saveDadosProduto(idEstabelecimento, nomeProduto, tipoProduto, marcaProduto, precoProduto, quantidadeProduto);
        evento.preventDefault();
    }; 
};

function getIdProduto(){
    var maior = 0;
    fetch(URL)
        .then(res => res.json())
        .then(produtos => {
            produtos.map((produto) =>{
                if(produto.id > maior){
                    maior = produto.id;
                }
            });
           id = maior + 1;
        })
        .catch(() => console.log ("Falha ao carregar produtos!"));  
}

function saveDadosProduto(idEstabelecimento, nome, tipo, marca, preco, quantidade){
    var novoProduto = JSON.stringify({
        id: idProduto,
        idEstabelecimento: idEstabelecimento,
        quantidadeDeAcessos: 0,
        nome: nome,
        tipo: tipo,
        marca: marca,
        preco: preco,
        quantidade: quantidade
    });

     //ADICIONA PRODUTO
     fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: novoProduto
    })
    .then(res => res.json())
    .then(() => {
        location.reload()
        window.location.href = 'ProdutosCadastrados.html';
        localStorage.setItem("cadastrouProduto", "true");
    })
    .catch(() => console.log ("Falha ao cadastrar produto!"));  
}

