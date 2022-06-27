
window.onload = () => {
    /*  var dadosUsuario = JSON.stringify({
        idUsuario: 1,
        tipoUsuario: "pessoaFisica"
    }); 
    localStorage.setItem('dados', dadosUsuario);  */ 
    
    var dados = JSON.parse(localStorage.getItem('dados'));

    getDadosUsuario(dados.idUsuario);
}

function getDadosUsuario(idUsuario){
    URL = `https://api-storage-mercado-easy.herokuapp.com/pessoaFisica/${idUsuario}`;
    
    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            document.getElementById('nome').innerHTML = `${dados.primeiroNome.charAt(0).toUpperCase()}${dados.primeiroNome.slice(1)} ${dados.sobreNome.charAt(0).toUpperCase()}${dados.sobreNome.slice(1)}`;
            document.getElementById('endereco').innerHTML = `Rua ${dados.rua.charAt(0).toUpperCase()}${dados.rua.slice(1)},${dados.numero}, ${dados.bairro.charAt(0).toUpperCase()}${dados.bairro.slice(1)}, ${dados.cidade.charAt(0).toUpperCase()}${dados.cidade.slice(1)} - ${dados.UF}`;
            document.getElementById('email').innerHTML = dados.email;
            document.getElementById('telefone').innerHTML = dados.telefone;  
        })
        .catch(() => console.log ("Falha ao carregar informações do usuário(pessoaFisica)!"));
}

function logOut(){
    localStorage.removeItem("dados");
    if(localStorage.getItem("carrinho")){
        localStorage.removeItem("carrinho");
    }
    window.location.href = "../../Gerais/HTML/Home.html"
}