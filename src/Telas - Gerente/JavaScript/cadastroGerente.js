URL_gerentes = 'https://api-storage-mercado-easy.herokuapp.com/gerente'
URL_estabelecimentos = 'https://api-storage-mercado-easy.herokuapp.com/estabelecimentos'
var id=0;

window.onload = () => {
    var botao = document.querySelector('input[type="submit"]');
    botao.addEventListener("click",salvaDados);
}

async function salvaDados()
{
    var nome = document.querySelector("#primeiroNome").value;
    var sobrenome =  document.querySelector("#sobrenome").value;
    var usuario =  document.querySelector("#nomeDeUsuario").value;
    var CPF =  document.querySelector("#cpf").value;
    var codigo =  document.querySelector("#codigoEstabelecimento").value;
    var email =  document.querySelector("#email").value;
    var telefone =  document.querySelector("#telefone").value;
    var password =  document.querySelector("#password").value;
    var confirmacao = document.querySelector('#confirmaSenha').value;
    var checkbox = document.querySelector("#t_and_c");
    if(nome != '' && sobrenome != '' && usuario != '' && CPF != '' && codigo != '' && email != '' && telefone != '' && password != '' && confirmaSenha != ''){ 
        if(password == confirmacao){
            if(checkbox.checked){    
                var gerente =
                {
                    id: id,
                    primeiroNome: nome,
                    sobreNome: sobrenome,
                    nomeDeUsuario: usuario,
                    cpf: CPF,
                    codigoEstabelecimento: codigo,
                    email: email,
                    telefone: telefone,
                    senha: password,
                }
                var c =  await Compcod(gerente)
                var gerente = JSON.stringify(gerente);

                if(c == 1){
                    if(await getcodigo(JSON.parse(gerente).codigoEstabelecimento)){
                        if(await getEmail(email)){
                            alert("O Email já foi cadastrado por outro usuário!")
                        }else{
                            fetch(URL_gerentes,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: gerente
                                }).then(res => Getres(res))
                                await salvaLocalStorage();
                        }
                    }else{
                        alert("Já existe um gerente cadastrado com o código informado. Só pode haver um usuário responsavel por cada estabelecimento.")
                    }
                    
                }else{
                    alert("Não existe nenhum estabelecimento cadastrado com o código informado. Informe um código válido!");
                }
            }else{
                alert("É preciso concordar com os Termos de Uso!");
            } 
        }else{ 
            alert("As senhas não sao iguais!");
        }
    }
}

async function getcodigo(codigo)
{
    let gerentes = await pegaDados(URL_gerentes)
        
    for (gerente of gerentes)
    {
        
        if(codigo == gerente.codigoEstabelecimento)
            {
                return 0;
            }
    }
    return 1;
}

async function getEmail(email)
{
    let estabelecimentos = await getDados(`https://api-storage-mercado-easy.herokuapp.com/estabelecimentos?email=${email}`)
    if(estabelecimentos.length != 0){
        return true;
    }else{
        let gerentes = await getDados(`https://api-storage-mercado-easy.herokuapp.com/gerente?email=${email}`)
        if(gerentes.length != 0){
            return true;
        }else{
            let pessoas = await getDados(`https://api-storage-mercado-easy.herokuapp.com/pessoaFisica?email=${email}`)
            if(pessoas.length != 0){
                return true;
            }
        }
    }
    return false
}

async function getDados(url)
{
     res =  await fetch(url);
     data = await res.json();
     return data;
}

async function Compcod(gerente)
{   
    var dados = 0;
    dados = await pegaDados(URL_estabelecimentos);
    for(dado of dados)
    {
        if(gerente.codigoEstabelecimento == dado.código)
        {
            return 1;
        }
    }
}

function achamaior(estabelecimento)
{
    var maior = 0;
    for(var i=0; i<estabelecimento.length; i++)
    {
        
        if(estabelecimento[i].id>maior)
        {
            maior = estabelecimento[i].id;
        }
    }
    return maior;
}

async function salvaLocalStorage()
{
    var maior = 0;
    await pegaDados(URL_gerentes).then(gerentes => 
    {
        maior = achamaior(gerentes);
        var identificacao = maior;
        
        var dados = 
        {
            tipoUsuario: "gerente",
            idUsuario: identificacao+1,
        }
        localStorage.setItem("dados",JSON.stringify(dados));
        console.log("terminou a buscar");
    })
    return "saiu da funcao"
}

function Getres(res)
{
    if(res.status == 201)
    {
        //alert("Dados inseridos");
        window.location.href = 'Administracao.html';
    }
    
    
}


async function pegaDados(url)
{
     res =  await fetch(url);
     data = await res.json();
     return data;
} 





