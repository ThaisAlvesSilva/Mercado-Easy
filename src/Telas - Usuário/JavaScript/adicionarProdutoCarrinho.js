
var produtos;
var produtoExcluir;
window.onload = () => {
    var carrinhoCompras = document.getElementById('mostrarCarrinho')
    if(localStorage.getItem("carrinho")){
        produtos=JSON.parse(localStorage.getItem("carrinho"));
        atualizarCarrinho(carrinhoCompras);
    }else{
        document.getElementById('btclear').style.visibility = "hidden";
    }
}

function atualizarCarrinho (carrinhoCompras){
    var produtosCarrinho = ' ';
    produtos.forEach((item)=>{
        produtosCarrinho+= `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <img id="imgProduto" src="../Imagens/${item.tipo}.jpg" alt="">
                <div class="divInfos">
                    <p><strong> PRODUTO: </strong>${item.nome.charAt(0).toUpperCase()}${item.nome.slice(1)}  ${item.marca}</p>`
                    if (item.promocao){
                        produtosCarrinho +=
                        
                        `<p><strong><s>Preço Antigo: </strong>R$ ${item.preco}</s><br>
                        <strong> Novo Preço: </strong>R$ ${item.novoPreco}</p>`
                    }
                    else{
                        produtosCarrinho += 
                        `<p><strong>Preço:  </strong>R$ ${item.preco}</p> `
                    }
                    produtosCarrinho += `
                    <div>
                        <button id="popup" onclick = 'informacoesEstabelecimento(${item.idEstabelecimento});' type="button" class="btn btn-danger" data-toggle="modal" data-target='#${item.idEstabelecimento}'>
                            <p style="color: white; font-weight: bold; font-size: large; margin-right:-20px;">Ver estabelecimento</p>
                        </button>  
                            
                        <div class="modal fade" id='${item.idEstabelecimento}' tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                        </svg>
                                    </button>  
                                    <div class="modal-body divBotoes">
                                        <div id="inf" class="d-flex justify-content-center">
                                            <button id='nomeEstabelecimento${item.idEstabelecimento}' type="button" class="btn btn-danger btn-lg btn-block">
                                                <h5><strong>Supermercado Dia</strong></h5><br>Av. dos Engenheiros, 376 - Castelo<br>Belo Horizonte - MG<br><strong>Contato: </strong>0800 775 1080</button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onclick='adicionaId(${item.id})' id="btdelete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-excluirProduto"><p>Excluir</p></button>
                </div>
            </div>
     `
            
    })
    carrinhoCompras.innerHTML=produtosCarrinho;
}
function limparCarrinho (item){
    localStorage.removeItem("carrinho"); 
    location.reload();
}

function adicionaId(id){
    produtoExcluir = id;
}

function excluiProduto(){
    var novoProdutos = produtos.filter((item) => item.id !== produtoExcluir);
    if(novoProdutos.length > 0){
        localStorage.setItem("carrinho", JSON.stringify(novoProdutos));
    }else{
        localStorage.removeItem("carrinho"); 
    }
    
    window.location.reload();
}

