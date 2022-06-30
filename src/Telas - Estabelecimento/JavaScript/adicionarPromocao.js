var produtoPromo
function adicionaPromocao(produto){
    produtoPromo = produto;
    if(produto.promocao){
        document.getElementById("precoAtual").innerHTML = "R$: " + produtoPromo.novoPreco;
    }else{
        document.getElementById("precoAtual").innerHTML = "R$: " + produtoPromo.preco;
    }  
}

function salvaPromocao(){
    var preco = document.getElementById("novoPreco").value;
    var novoPreco;
    if(preco.includes(",")){
        novoPreco = preco.replace(",", ".");
    }else{
        novoPreco = preco;
    }
    novoPreco = parseFloat(novoPreco);
    var precoProd = parseFloat(produtoPromo.preco);
    var novoPrecoProd = parseFloat(produtoPromo.novoPreco);
    if(novoPreco != ''){
        if(produtoPromo.promocao){
            if(novoPreco > novoPrecoProd  && novoPreco <= precoProd){
                produtoPromo.novoPreco = novoPreco;
            }else{
                if(novoPreco >= precoProd){
                    produtoPromo.preco = novoPreco;  
                    produtoPromo.promocao = false;
                }else if(novoPreco < novoPrecoProd){
                    produtoPromo.novoPreco = novoPreco;
                }
            }
            if(precoProd == novoPreco){
                produtoPromo.promocao = false;
            }
        }else{
            if(novoPreco < precoProd){
                produtoPromo.promocao = true;
                produtoPromo.novoPreco = novoPreco;
                
            }else{
                produtoPromo.preco = novoPreco;
            }
        }
        atualizaProduto();
    } 
}

function atualizaProduto(){

    var URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/${produtoPromo.id}`

     //ATUALIZA PRODUTO
     fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoPromo)
    })
    .then(res => res.json())
    .then(() => {
        window.location.reload();
    })
    .catch(() => console.log ("Falha ao adicionar promocao!"));  
}