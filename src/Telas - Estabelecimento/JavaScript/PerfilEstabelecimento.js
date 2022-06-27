
window.onload = () => {
    /*  var dadosUsuario = JSON.stringify({
        idUsuario: 1,
        tipoUsuario: "estabelecimentos"
    }); 
    localStorage.setItem('dados', dadosUsuario);  */ 
    
    var dados = JSON.parse(localStorage.getItem('dados'));

    getDadosUsuario(dados.idUsuario);
}

function getDadosUsuario(idUsuario){
    URL = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos/${idUsuario}`;

    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            document.getElementById('nome').innerHTML = dados.nome.charAt(0).toUpperCase() + dados.nome.slice(1);
            document.getElementById('codigo').innerHTML = dados.código;
            document.getElementById('endereco').innerHTML = `Rua ${dados.rua.charAt(0).toUpperCase()}${dados.rua.slice(1)},${dados.numero}, ${dados.bairro.charAt(0).toUpperCase()}${dados.bairro.slice(1)}, ${dados.cidade.charAt(0).toUpperCase()}${dados.cidade.slice(1)} - ${dados.UF}`;
            document.getElementById('email').innerHTML = dados.email;
            document.getElementById('cnpj').innerHTML = dados.cnpj;
            document.getElementById('telefone').innerHTML = dados.telefone;  
        })
        .catch(() => console.log ("Falha ao carregar informações do estabelecimento"));
}

function logOut(){
    localStorage.removeItem("dados");
    window.location.href = "../../Gerais/HTML/Home.html"
}