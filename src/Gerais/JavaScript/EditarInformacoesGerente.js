var dadosUsuario;
var URL;
var dados; 
var locationPerfil;

window.onload = () => {
    
    dados = JSON.parse(localStorage.getItem('dados'));
    var idUsuario = dados.idUsuario;


    console.log(idUsuario);

    getDadosUsuario(idUsuario);

    editarInformacoes.onsubmit = (evento) => {
        console.log("Teste editar informacoes");
          
        var email = Email.value;
        var confirmarEmail = confirmaEmail.value;
        var telefone = Telefone.value;
        var senha = Senha.value;
        var confirmarSenha = confirmaSenha.value;

        if(Senha.value == confirmaSenha.value){
            if(Email.value == confirmaEmail.value){
                verificaDadosEstabelecimento(email, telefone, senha);
                //updateInformacoes(email, telefone, senha);
            }else{
                alert("E-mails diferentes");
            }
        }else{
            alert("Senhas diferentes");
        }
        evento.preventDefault();
    }; 
};

function getDadosUsuario(idUsuario){
    URL = `https://api-storage-mercado-easy.herokuapp.com/gerente/${idUsuario}`;

    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            dadosUsuario = dados;
            document.getElementById('Email').value = dados.email;
            document.getElementById('confirmaEmail').value = dados.email;
            document.getElementById('Telefone').value = dados.telefone;
            document.getElementById('nome').innerHTML = "Olá, " + dados.primeiroNome.charAt(0).toUpperCase() + dados.primeiroNome.slice(1) + " " + dados.sobreNome; 
        })
        .catch(() => console.log ("Falha ao carregar informações do usuário!"));  
}

function updateInformacoes(email, telefone, senha, rua, bairro, cidade, numero,uf){
    dadosUsuario.email = email;
    dadosUsuario.telefone = telefone;
    dadosUsuario.senha = senha;

    //ATUALIZA DADOS
    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(dadosUsuario)
    })
    .then(res => res.json())
    .then(() => {
        location.reload();
        window.location.href =  '/src/Telas - Gerente/Html/PerfilGerente.html';
    })
    .catch(() => console.log ("Falha ao atualizar dados!"));  
}

function verificaDadosEstabelecimento(email, telefone, senha) {
    url = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos?email=${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.length != 0){
            if(dados.tipoUsuario == "estabelecimentos"){
                if(data[0].id == dados.idUsuario){
                    verificaDadosGerente(email, telefone, senha);
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
          verificaDadosGerente(email, telefone, senha);
        }
      })
  }
function verificaDadosGerente(email, telefone, senha) {
    url = `https://api-storage-mercado-easy.herokuapp.com/gerente?email=${email}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
        if (data.length != 0){
            if(dados.tipoUsuario == "gerente"){
                if(data[0].id == dados.idUsuario){
                    verificaDadosPessoa(email, telefone, senha);
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
            verificaDadosPessoa(email, telefone, senha)
        }
        })

}
function verificaDadosPessoa(email, telefone, senha) {
    url = `https://api-storage-mercado-easy.herokuapp.com/pessoaFisica?email=${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length != 0){
            if(dados.tipoUsuario == "pessoaFisica"){
                if(data[0].id == dados.idUsuario){
                    updateInformacoes(email, telefone, senha)
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
            updateInformacoes(email, telefone, senha)
        }
    })
}
