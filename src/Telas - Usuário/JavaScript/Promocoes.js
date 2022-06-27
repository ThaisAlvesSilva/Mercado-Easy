var produtoClicado;
window.onload = () => {
  GetPromocoes();
}

function GetPromocoes(){
    var ListaProduto='';
    document.querySelector('#Promo').innerHTML = 'Promoções';
    fetch("https://api-storage-mercado-easy.herokuapp.com/produtos/?promocao=true",{
        method:"GET",
        headers:{
            "Content-type":"application/json;charset=UTF-8"
        },
    })
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        data.map(item=>{
          console.log(item);
          ListaProduto += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" style="height:100">
              <img src="../Imagens/${item.tipo}.jpg" alt="">
              <div class="divInfos">
              <div>
                  <br>
                  <p><strong>PRODUTO: </strong>${item.nome.charAt(0).toUpperCase()}${item.nome.slice(1)}  ${item.marca} <br> `
                if (item.promocao){
                  ListaProduto +=
                  `<strong><s>Preço Antigo: </strong>R$ ${item.preco}</s><br>
                  <strong> Novo Preço: </strong>R$ ${item.novoPreco}</p>`
                }
                else{
                  ListaProduto += 
                  `<strong>Preço: R$ </strong>${item.preco}<br> `
                }
                ListaProduto+= ` 
                  <button id="buttontxt" onclick = 'informacoesEstabelecimento(${item.idEstabelecimento});' type="button" class="btn btn-danger" data-toggle="modal" data-target='#${item.idEstabelecimento}'>
                  <p id="txt" style="color: white; font-weight: bold; font-size: large; margin-left:-7.5px">Ver estabelecimento</p>
                 </button>
                 <a href="#" onclick='adcProduto(${JSON.stringify(item)})'>
                     <svg id="cartplus" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </a>  
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
                                        <h5><strong>Supermercados BH</strong></h5><br>Av. Severino Ballesteros, 65 - Ressaca<br>Contagem - MG<br><strong>Contato: </strong>(31) 3333-8829</button> 
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                
                </div>         
              </div>
          </div> 
                       
      </div>`

        })
        document.querySelector('#mostrarPromo').innerHTML= ListaProduto;
    })
}


function adcProduto(item){
  let carrinho = [];
  let existProduto = false;
  if(localStorage.getItem("carrinho")){
    carrinho=JSON.parse(localStorage.getItem("carrinho"));
    carrinho.forEach(produto => {
      if(produto.id == item.id){
        existProduto=true;
      }
    });
    
    if(!existProduto ){
      carrinho.push(item);
    }
  }
  else{
  carrinho.push(item);
}
  console.log(carrinho)
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log(carrinho);
  produtoClicado = item;
  
  getDadosProdutos();
}

function infosProdutos(){
    produtoClicado.quantidadeDeAcessos+=1;

    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/${produtoClicado.id}`; 

    //ATUALIZA DADOS
    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(produtoClicado)
    })
    .then(res => res.json())
    .then(() => {
       
    });
    mostraMensagem();
  }

  function getDadosProdutos(){
    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/${produtoClicado.id}`; 

    fetch(URL)
      .then(res => res.json())
      .then(data=> {
         produtoClicado = data; 
         infosProdutos();
      })
  }
  
  function mostraMensagem(){

    var intervalo = window.setInterval(function() {
        document.getElementById("mensagem").style.visibility = "visible";
    }, 50);

    window.setTimeout(function() {
        document.getElementById("mensagem").style.visibility = "hidden";
        clearInterval(intervalo);
    }, 1000);
    
}