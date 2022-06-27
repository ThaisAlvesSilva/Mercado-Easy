
window.onload = () => {
    /*  var dadosUsuario = JSON.stringify({
        idUsuario: 1,
        tipoUsuario: "gerente"
    }); 
    localStorage.setItem('dados', dadosUsuario);   */
    
    var dados = JSON.parse(localStorage.getItem('dados'));

    getDadosUsuario(dados.idUsuario);
}

function getDadosUsuario(idUsuario){
    URL = `https://api-storage-mercado-easy.herokuapp.com/gerente/${idUsuario}`;
    
    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            document.getElementById('nome').innerHTML = `${dados.primeiroNome.charAt(0).toUpperCase()}${dados.primeiroNome.slice(1)} ${dados.sobreNome.charAt(0).toUpperCase()}${dados.sobreNome.slice(1)}`;
            document.getElementById('email').innerHTML = dados.email;
            document.getElementById('telefone').innerHTML = dados.telefone;  
        })
        .catch(() => console.log ("Falha ao carregar informações do gerente!"));
}

function logOut(){
    localStorage.removeItem("dados");
    window.location.href = "../../Gerais/HTML/Home.html"
}