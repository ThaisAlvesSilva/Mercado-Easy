var dadosUsuario;
var URL;
var dados; 
var locationPerfil;

window.onload = () => {
    
    dados = JSON.parse(localStorage.getItem('dados'));
    var idUsuario = dados.idUsuario;
    var tipoUsuario = dados.tipoUsuario;

    getLocation();

    console.log(idUsuario);
    console.log(tipoUsuario);

    getDadosUsuario(idUsuario, tipoUsuario);

    editarInformacoes.onsubmit = (evento) => {
        console.log("Teste editar informacoes");
          
        var email = Email.value;
        var confirmarEmail = confirmaEmail.value;
        var telefone = Telefone.value;
        var senha = Senha.value;
        var confirmarSenha = confirmaSenha.value;
        var rua = Rua.value;
        var bairro = Bairro.value;
        var cidade = Cidade.value;
        var numero = Numero.value;
        var select = document.getElementById('uf');
        var uf = select.options[select.selectedIndex].value;

        if(Senha.value == confirmaSenha.value){
            if(Email.value == confirmaEmail.value){
                verificaDadosEstabelecimento(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmarEmail);
                //updateInformacoes(email, telefone, senha, rua, bairro, cidade, numero, uf);
            }else{
                alert("E-mails diferentes");
            }
        }else{
            alert("Senhas diferentes");
        }
        evento.preventDefault();
    }; 
};

function getLocation(){
    if(dados.tipoUsuario == "pessoaFisica"){
        locationPerfil = '/src/Telas - Usuário/Html/Perfil.html';
    }else if(dados.tipoUsuario == "estabelecimentos"){
        locationPerfil = '/src/Telas - Estabelecimento/Html/PerfilEstabelecimento.html';
    }
}

function getDadosUsuario(idUsuario, tipoUsuario){
    URL = `https://api-storage-mercado-easy.herokuapp.com/${tipoUsuario}/${idUsuario}`;

    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            dadosUsuario = dados;
            document.getElementById('Email').value = dados.email;
            document.getElementById('confirmaEmail').value = dados.email;
            document.getElementById('Telefone').value = dados.telefone;
            document.getElementById('Rua').value = dados.rua.charAt(0).toUpperCase() + dados.rua.slice(1);
            document.getElementById('Bairro').value = dados.bairro.charAt(0).toUpperCase() + dados.bairro.slice(1);
            document.getElementById('Cidade').value = dados.cidade.charAt(0).toUpperCase() + dados.cidade.slice(1);
            document.getElementById('Numero').value = dados.numero;
            document.getElementById('uf').value = dados.UF;
            if(tipoUsuario != "estabelecimentos"){
                document.getElementById('nome').innerHTML = "Olá, " + dados.primeiroNome.charAt(0).toUpperCase() + dados.primeiroNome.slice(1) + " " + dados.sobreNome;    
            }else{
                document.getElementById('nome').innerHTML = "Olá, " +  dados.nome.charAt(0).toUpperCase() + dados.nome.slice(1);
            }
           
        })
        .catch(() => console.log ("Falha ao carregar informações do usuário!"));  
}

function updateInformacoes(email, telefone, senha, rua, bairro, cidade, numero,uf){
    dadosUsuario.email = email;
    dadosUsuario.telefone = telefone;
    dadosUsuario.senha = senha;
    dadosUsuario.rua = rua;
    dadosUsuario.bairro = bairro;
    dadosUsuario.cidade = cidade;
    dadosUsuario.numero = numero;
    dadosUsuario.UF = uf;
    

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
        //window.close();
        //window.open(locationPerfil);
        location.reload();
        window.location.href =  locationPerfil;
    })
    .catch(() => console.log ("Falha ao atualizar dados!"));  
}

function verificaDadosEstabelecimento(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail) {
    url = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos?email=${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.length != 0){
            if(dados.tipoUsuario == "estabelecimentos"){
                if(data[0].id == dados.idUsuario){
                    verificaDadosGerente(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail);
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
          verificaDadosGerente(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail);
        }
      })
  }
  function verificaDadosGerente(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail) {
    url = `https://api-storage-mercado-easy.herokuapp.com/gerente?email=${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length != 0){
            if(dados.tipoUsuario == "gerente"){
                if(data[0].id == dados.idUsuario){
                    verificaDadosPessoa(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail);
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
          verificaDadosPessoa(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail)
        }
      })
  
  }
  function verificaDadosPessoa(email, telefone, senha, rua, bairro, cidade, numero, uf, confirmaEmail) {
    url = `https://api-storage-mercado-easy.herokuapp.com/pessoaFisica?email=${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length != 0){
            if(dados.tipoUsuario == "pessoaFisica"){
                if(data[0].id == dados.idUsuario){
                    updateInformacoes(email, telefone, senha, rua, bairro, cidade, numero, uf)
                }else{
                    alert("O Email já foi cadastrado por outro usuário!")
                }
            }else{
                alert("O Email já foi cadastrado por outro usuário!")
            }
        }
        else {
            updateInformacoes(email, telefone, senha, rua, bairro, cidade, numero, uf)
        }
      })
  }
