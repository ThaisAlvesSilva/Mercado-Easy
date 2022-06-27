var produto;
window.onload = () => {
    produto = JSON.parse(localStorage.getItem("Produto"));
    console.log(produto);

    adicionaDadosNaTela();

    editarPordutos.onsubmit = (evento) => {
        var novoPreco = preco.value;
        var novaQuantidade = quantidade.value;
        
        updateProduto(novoPreco, novaQuantidade);
        evento.preventDefault();
    }; 

}

function adicionaDadosNaTela(){
    document.getElementById("nome").innerHTML = produto.nome;
    document.getElementById("tipo").innerHTML = produto.tipo;
    document.getElementById("marca").innerHTML = produto.marca;
    document.getElementById("quantidade").value = produto.quantidade;
    if(produto.promocao){
        document.getElementById("preco").value = produto.novoPreco;
    }else{
        document.getElementById("preco").value = produto.preco;
    }
    
}

function updateProduto(novoPreco, novaQuantidade) {
    if(produto.promocao){
        if(novoPreco > produto.novoPreco && novoPreco < produto.preco){
            produto.novoPreco = novoPreco;
        }else if(novoPreco > produto.preco){
            produto.promocao = false;
            produto.preco = novoPreco; 
        }else if(novoPreco < produto.novoPreco){
            produto.preco = produto.novoPreco;
            produto.novoPreco = novoPreco;
        }
        /* if(novoPreco > produto.novoPreco){
            produto.promocao = false;
            produto.preco = novoPreco;
        }else{
            produto.preco = produto.novoPreco;
            produto.novoPreco = novoPreco;
        } */
    }else{
        produto.preco = novoPreco;
    }
   
    produto.quantidade = novaQuantidade;

    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/${produto.id}`;

     //ATUALIZA DADOS
     fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(() => {
        location.reload();
        window.location.href = 'ProdutosCadastrados.html';
        localStorage.setItem("editouProduto", "true");
    })
    .catch(() => console.log ("Falha ao atualizar dados do produto!")); 
}