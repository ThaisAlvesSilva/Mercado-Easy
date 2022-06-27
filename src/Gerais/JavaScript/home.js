function verificaLogin(){
    if(localStorage.getItem("dados")){
        var dados = JSON.parse(localStorage.getItem("dados"));
        if(dados.tipoUsuario == "gerente"){
            window.location.href = '../../Telas - Gerente/Html/Administracao.html'
        }else if(dados.tipoUsuario == "estabelecimentos"){
            window.location.href = '../../Telas - Estabelecimento/Html/ProdutosCadastrados.html'
        }else if(dados.tipoUsuario == "pessoaFisica"){
            window.location.href = '../../Telas - Usuário/Html/Promocoes.html'
        }
    }else{
        window.location.href = "login.html"
    }
}