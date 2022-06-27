
var idPessoa = 0;
function enviarDados() {
  getIdPessoa();
  const primeiroNome = PrimeiroNome.value
  const sobrenome = Sobrenome.value
  const nomeDeUsuario = NomeDeUsuario.value
  const cep = Cep.value
  const rua = Rua.value
  const numero = Numero.value
  const bairro = Bairro.value
  const cidade = Cidade.value
  const email = Email.value
  const telefone = Telefone.value
  const senha = Senha.value
  const confirmaSenha = ConfirmaSenha.value
  var select = document.getElementById('uf');
  const uf = select.options[select.selectedIndex].value;

  var NovaPessoa = JSON.stringify({

    id: idPessoa,
    primeiroNome: primeiroNome,
    sobreNome: sobrenome,
    nomeDeUsuario: nomeDeUsuario,
    cep: cep,
    rua: rua,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    UF: uf,
    email: email,
    telefone: telefone,
    senha: senha
  })
  if(primeiroNome != '' && sobrenome !='' && nomeDeUsuario != '' && cep != '' && rua != '' && numero != '' && bairro != '' && cidade != ''
  && uf != '' && email != '' && telefone != '' && senha != '') {
    verifcaDadosEstabelecimento(NovaPessoa, senha, confirmaSenha, email);
  }
}

function verifcaDadosEstabelecimento(NovaPessoa, senha, confirmaSenha, email) {
  url = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos?email=${email}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.length != 0)
        alert("O Email já foi cadastrado por outro usuário!")
      else {
        verificaDadosGerente(NovaPessoa, senha, confirmaSenha, email);
      }
    })

}
function verificaDadosGerente(NovaPessoa, senha, confirmaSenha, email) {
  url = `https://api-storage-mercado-easy.herokuapp.com/gerente?email=${email}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length != 0)
        alert("O Email já foi cadastrado por outro usuário!")
      else {
        verificaDadosPessoa(NovaPessoa, senha, confirmaSenha, email)
      }
    })

}
function verificaDadosPessoa(NovaPessoa, senha, confirmaSenha, email) {
  url = `https://api-storage-mercado-easy.herokuapp.com/pessoaFisica?email=${email}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length != 0)
        alert("O Email já foi cadastrado por outro usuário!")
      else {
        if (senha == confirmaSenha) {
          const URL = 'https://api-storage-mercado-easy.herokuapp.com/pessoaFisica'
          fetch(URL, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: NovaPessoa
          })
            .then(response => response.json())
            .then(() => {
              adicionaDadosSessao();
              window.location.href = "Promocoes.html"
            })
            .catch(() => console.log("Falha ao se cadastrar :( "));
        }
        else {
          alert("Os campos de Senha e Confirma Senha devem ser iguais !!");
        }
      }
    })
}

function adicionaDadosSessao(){
  var dados = {
    tipoUsuario: "pessoaFisica",
    idUsuario: idPessoa,
  }
  localStorage.setItem("dados", JSON.stringify(dados));
  console.log("terminou a buscar");
}

function getIdPessoa() {
  var maior = 0;
  const url2 = 'https://api-storage-mercado-easy.herokuapp.com/pessoaFisica'
  fetch(url2)
    .then(res => res.json())
    .then(produtos => {
      produtos.map((produto) => {
        if (produto.id > maior) {
          maior = produto.id;
        }
      });
      idPessoa = maior + 1;
    })
}
