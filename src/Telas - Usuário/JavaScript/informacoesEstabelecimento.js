var dadosEstabelecimentoCLicado;

function informacoesEstabelecimento(idEstabelecimento) {
    
    URL = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos/${idEstabelecimento}`;
    fetch(URL)
        .then(Response => Response.json())
        .then(data => {
            dadosEstabelecimentoCLicado = data;
            var infos = `<h5 ><strong>${data.nome.charAt(0).toUpperCase()}${data.nome.slice(1)} </strong></h5>
            <br><strong>Endereço:</strong> ${data.rua.charAt(0).toUpperCase()}${data.rua.slice(1)}, ${data.numero}
            <br>${data.bairro.charAt(0).toUpperCase()}${data.bairro.slice(1)}, ${data.cidade.charAt(0).toUpperCase()}${data.cidade.slice(1)} - ${data.UF}<br><strong>Contato: </strong>${data.telefone}</button> `
            document.getElementById("nomeEstabelecimento"+idEstabelecimento).innerHTML = infos;
            somaAcesso();
        });
  } 
  function somaAcesso() {
    dadosEstabelecimentoCLicado.quantidadeDeAcessos++;

    URL = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos/${dadosEstabelecimentoCLicado.id}`; 

    //ATUALIZA DADOS
    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(dadosEstabelecimentoCLicado)
    })
    .then(res => res.json())
    .then(() => {
        
    });
  }