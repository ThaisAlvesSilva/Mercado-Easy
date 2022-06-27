URL = 'https://api-storage-mercado-easy.herokuapp.com/estabelecimentos'
var id=0;

window.onload = () => {
    var botao = document.querySelector('input[type="submit"]');
    botao.addEventListener("click",salvaDados);
}

async function salvaDados()
{
    var estabelecimento = document.querySelector("#estabelecimento").value;
    var cep =  document.querySelector("#Cep").value;
    var numero =  document.querySelector("#Nº").value;
    var endereco =  document.querySelector("#endereco").value;
    var bairro =  document.querySelector("#Bairro").value;
    var cidade =  document.querySelector("#Cidade").value;
    var select = document.getElementById('uf');
    var UF = select.options[select.selectedIndex].value;
    var CNPJ =  document.querySelector("#CNPJ").value;
    var telefone =  document.querySelector("#Telefone").value;
    var senha =  document.querySelector("#Senha").value;
    var confirmacao = document.querySelector("#confirmacao").value
    var checkbox = document.querySelector("#t_and_c")
    var email = document.querySelector("#email").value;  
    if(estabelecimento != '' && cep != '' && numero != '' && endereco != '' && bairro != '' && cidade != '' && UF != '' && CNPJ != '' && email != '' && senha != '' && confirmacao != ''){   
        if(senha == confirmacao){
            if(checkbox.checked){    
                var estabelecimentos =
                {
                    id: id,
                    código: 0,
                    quantidadeDeAcessos:0,
                    nome: estabelecimento,
                    cep: cep,
                    rua: endereco,
                    numero: numero,   
                    bairro: bairro,
                    cidade: cidade,
                    UF: UF,
                    email: email,
                    cnpj: CNPJ,
                    telefone:telefone,
                    senha:senha,
                }
                if(await getEmail(email)){
                    alert("O Email já foi cadastrado por outro usuário!")
                }else{           
                    await pegaDados().then(esta => 
                        {
                        
                            var id = achamaior(esta);
                            estabelecimentos.código = id +1000;  

                        })

                        estabelecimento = JSON.stringify(estabelecimentos)

                    fetch(URL,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: estabelecimento
                    }).then(res => Getres(res))
                    await salvaLocalStorage();
                }
            }else{
                //document.getElementById("t_and_c").setCustomValidity("É preciso concordar com os Termos de Uso!");
                alert("É preciso concordar com os Termos de Uso!");
            }
        }else{
            alert("Senhas não são iguais");
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


function salvaLocalStorage()
{
    var maior = 0;
    pegaDados().then(estabelecimento => 
    {
        var identificacao = achamaior(estabelecimento);

        var dados = JSON.stringify( 
        {
            tipoUsuario: "estabelecimentos",
            idUsuario: identificacao+1,
        })
        localStorage.setItem("dados",dados);
    })
}

function Getres(res)
{
    if(res.status == 201)
    {
        //alert("Dados inseridos");
        window.location.href = 'ProdutosCadastrados.html';
    }
    
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



async function pegaDados()
{
     res =  await fetch(URL);
     data = await res.json();
     return data;
} 





