URL_gerentes = 'https://api-storage-mercado-easy.herokuapp.com/gerente'
URL_estabelecimentos = 'https://api-storage-mercado-easy.herokuapp.com/estabelecimentos'
URL_pessoaFisica = 'https://api-storage-mercado-easy.herokuapp.com/pessoaFisica'

var usuario = {
  idUsuario: 0,
  tipoUsuario: "teste"
};
window.onload = () => {
  if(localStorage.getItem("dados")){
    var dados = JSON.parse(localStorage.getItem("dados"));
    if(dados.tipoUsuario == "gerente"){
        window.location.href = '../../Telas - Gerente/Html/Administracao.html'
    }else if(dados.tipoUsuario == "estabelecimentos"){
        window.location.href = '../../Telas - Estabelecimento/Html/ProdutosCadastrados.html'
    }else if(dados.tipoUsuario == "pessoaFisica"){
        window.location.href = '../../Telas - Usuário/Html/Promocoes.html'
    }
  }
}

async function CompUser()
{
    var email = document.querySelector("#email").value;
    var senha = document.querySelector("#password").value;   
    var dados = 0;

    dados = await pegaDados(URL_gerentes);
    for(dado of dados)
    {
        if(dado.email == email)
        {        
            if(dado.senha == senha){
              usuario.idUsuario = dado.id
              usuario.tipoUsuario = "gerente"
              usuario = JSON.stringify(usuario)
              localStorage.setItem("dados", usuario)
              window.location.href = '../../Telas - Gerente/Html/Administracao.html'
               return 1 
            } 
        }  
    }
    
    dados = await pegaDados(URL_pessoaFisica);
    for(dado of dados)
    {
        if(dado.email == email)
        {
            if(dado.senha == senha){           
              usuario.idUsuario = dado.id
              usuario.tipoUsuario = "pessoaFisica"
              usuario = JSON.stringify(usuario)
              localStorage.setItem("dados", usuario)
              window.location.href = '../../Telas - Usuário/Html/Promocoes.html'
               return 1;
            }  
          }        
        }
    
    dados = await pegaDados(URL_estabelecimentos);
    for(dado of dados)
    {
        if(dado.email == email)
        {
            if(dado.senha == senha){
              usuario.idUsuario = dado.id
              usuario.tipoUsuario = "estabelecimentos"
              usuario = JSON.stringify(usuario)
              localStorage.setItem("dados", usuario)
              window.location.href = '../../Telas - Estabelecimento/Html/ProdutosCadastrados.html'
               return 1; 
            }
        }  
    }

    return 0;
}


async function valida(){
  if(await CompUser() == 0){
    alert("Email e/ou senha incorretos")
  }
  /* if(await CompUser() == 1){
    window.location.href = 'Home.html';
  } */
}

var botao = document.querySelector("#loginSubmit") 
botao.addEventListener("click",valida);


async function pegaDados(url)
{
     res =  await fetch(url);
     data = await res.json();
     return data;
} 
