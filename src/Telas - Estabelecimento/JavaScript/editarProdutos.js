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

function updateProduto(preco, novaQuantidade) {

    //var preco = document.getElementById("novoPreco").value;
    var novoPreco;
    if(preco.includes(",")){
        novoPreco = preco.replace(",", ".");
    }else{
        novoPreco = preco;
    }
    novoPreco = parseFloat(novoPreco);
    var precoProd = parseFloat(produto.preco);
    var novoPrecoProd = parseFloat(produto.novoPreco);
    if(novoPreco != ''){
        if(produto.promocao){
            if(novoPreco > novoPrecoProd  && novoPreco <= precoProd){
                produto.novoPreco = novoPreco;
            }else{
                if(novoPreco >= precoProd){
                    produto.preco = novoPreco;  
                    produto.promocao = false;
                }else if(novoPreco < novoPrecoProd){
                    produto.novoPreco = novoPreco;
                }
            }
            if(precoProd == novoPreco){
                produto.promocao = false;
            }
        }else{
            produto.preco = novoPreco;
        }
        
    } 

    /* if(produto.promocao){
        if(novoPreco > produto.novoPreco && novoPreco < produto.preco){
            produto.novoPreco = novoPreco;
        }else if(novoPreco > produto.preco){
            produto.promocao = false;
            produto.preco = novoPreco; 
        }else if(novoPreco < produto.novoPreco){
            produto.preco = produto.novoPreco;
            produto.novoPreco = novoPreco;
        } */
        /* if(novoPreco > produto.novoPreco){
            produto.promocao = false;
            produto.preco = novoPreco;
        }else{
            produto.preco = produto.novoPreco;
            produto.novoPreco = novoPreco;
        } */
    /* }else{
        produto.preco = novoPreco;
    } */
   
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