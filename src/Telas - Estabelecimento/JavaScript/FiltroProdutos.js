var msg='';
function enviar(){
    var dados = JSON.parse(localStorage.getItem('dados'));
    idEstabelecimento = dados.idUsuario;
    var divProdutos = document.getElementById("produtos");
    document.querySelector('#linkLogo').href = 'ProdutosCadastrados.html';
    document.querySelector('#produtos').innerHTML= '';
    document.querySelector('#titulo').innerHTML = 'Produtos Encontrados:';
    const produto = document.querySelector("#txtBusca");
    const value = produto.value.toLowerCase();
    console.log(value);
    if (value == ""){
        document.querySelector('#linkLogo').href = '../../Gerais/HTML/Home.html';
        getProdutos(divProdutos);
    }
    else{

    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos?idEstabelecimento=${idEstabelecimento}&nome=${value}`
    fetch(URL)
    .then(Response => Response.json())
    .then(data => {
        if (data.length != 0){

        
        console.log(data);
        data.map(produto=>{
            console.log(produto);
        msg =   `<div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <img id="imgProduto" src="../Imagens/${produto.tipo}.jpg" alt="">
        <div class="divInfosFiltro">
            <div>
                <br>
                <p style="font-size:20px;"><strong>PRODUTO: </strong>${produto.nome.charAt(0).toUpperCase()}${produto.nome.slice(1)}  ${produto.marca}<br>`
        if(produto.promocao){
            
            msg += ` 
                <strong><s>Preço: </strong>R$ ${produto.preco}</s><br>
                <strong>Novo preço: </strong>R$ ${produto.novoPreco}<br></p>` 
        }else{
            msg += `<strong>Preço: </strong>R$ ${produto.preco}<br></p>`
        }
        msg += `
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
    })
    document.querySelector('#produtos').innerHTML= msg;
}
else{
    document.querySelector('#produtos').innerHTML= '';
    document.querySelector('#titulo').innerHTML = 'Nenhum produto Encontrado:';
}
})
    }
}
