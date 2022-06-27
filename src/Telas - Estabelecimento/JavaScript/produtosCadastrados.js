
var idProdutoDelete;
var idEstabelecimento;
window.onload = () => {
   var divProdutos = document.getElementById("produtos");
   var dados = JSON.parse(localStorage.getItem('dados'));
    idEstabelecimento = dados.idUsuario;
    getProdutos(divProdutos);

    if(localStorage.getItem('cadastrouProduto')){
       mostraMensagem();
       localStorage.removeItem('cadastrouProduto');
    }else if(localStorage.getItem('editouProduto')){
        document.getElementById("mensagem").innerHTML = "Produto editado com sucesso!";
        mostraMensagem();
        localStorage.removeItem('editouProduto');
    }
    
};

function getProdutos(divProdutos) {
    document.querySelector('#titulo').innerHTML = 'Produtos Cadastrados:';
    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos?idEstabelecimento=${idEstabelecimento}` 
    let listaProdutos = '';
    console.log(idEstabelecimento);
    fetch(URL)
        .then(res => res.json())
        .then(produtos => {
            produtos.map((produto) =>{
                listaProdutos +=  `<div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <img src="../Imagens/${produto.tipo}.jpg" alt="">
                    <div class="divInfos">
                        <div>
                            <br>
                            <p style="font-size:20px;"><strong>PRODUTO: </strong>${produto.nome.charAt(0).toUpperCase()}${produto.nome.slice(1)}  ${produto.marca}<br>`
                    if(produto.promocao){
                        listaProdutos += ` 
                            <strong><s>Preço: </strong>R$ ${produto.preco}</s><br>
                            <strong>Novo preço: </strong>R$ ${produto.novoPreco}<br></p>` 
                    }else{
                        listaProdutos += `<strong>Preço: </strong>R$ ${produto.preco}<br></p>`
                    }
                    listaProdutos += `
                                 </div> 
                                <div  class="botoes">
                                    <svg   data-toggle="modal" data-target="#modal-excluirProduto" onclick="adicionaIdDelete(${produto.id});" xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path  fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    <button onClick='adicionaPromocao(${JSON.stringify(produto)})' type="button" style="border-radius: 20px;" class="btn btn-warning" id="Promocao" data-toggle="modal" data-target="#exampleModalCenter">Promoção</button>
                                    <a href="EditarProdutos.html">
                                        <button onClick='editaProduto(${JSON.stringify(produto)})' id="Editar" class="btn" style="border-radius: 10px; margin-left: 2px; color: white;" >Editar </button>
                                    </a>
                                </div>
                        
                            </div>                
                        </div> `   
            divProdutos.innerHTML = listaProdutos;
        });
        })
        .catch(() => console.log ("Falha ao carregar produtos!"));  
}
function adicionaIdDelete(idProduto){
    idProdutoDelete = idProduto;
}

function editaProduto(produto){
    localStorage.setItem("Produto", JSON.stringify(produto));
}

function adicionaTexto(texto){
    document.getElementById("mensagem").textContent = texto;
}

function deleteProduto(){

    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/`

    fetch(`${URL}/${idProdutoDelete}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());
}

function mostraMensagem(){

    var intervalo = window.setInterval(function() {
        document.getElementById("mensagem").style.visibility = "visible";
    }, 50);

    window.setTimeout(function() {
        document.getElementById("mensagem").style.visibility = "hidden";
        clearInterval(intervalo);
    }, 1500);
    
}
