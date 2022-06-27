var labels = [];
var listaAcessos = [];
var ctx;

window.onload = () => {
    ctx = document.getElementById('graficoProdutos');
    var acessosEstabelecimento = document.getElementById('acessosEstabelecimento');
    var dados = JSON.parse(localStorage.getItem('dados'));
    var idUsuario = dados.idUsuario;
    getCodigo(idUsuario,acessosEstabelecimento);
    //getProdutos(idUsuario);
   
       // getAcessosEstabelecimento(idUsuario, acessosEstabelecimento);
 };

function getProdutos(idEstabelecimento) {
    URL = `https://api-storage-mercado-easy.herokuapp.com/produtos/?idEstabelecimento=${idEstabelecimento}`
    fetch(URL)
        .then(res => res.json())
        .then(produtos => {
            produtos.map((produto) =>{
                labels.push(produto.nome + " " + produto.marca);
                listaAcessos.push(produto.quantidadeDeAcessos);
                
            });
            geraGraficoProdutos();
           
        })
        .catch(() => console.log ("Falha ao carregar produtos!"));  
}

function getCodigo(idUsuario,acessosEstabelecimento){
    URL = `https://api-storage-mercado-easy.herokuapp.com/gerente/?id=${idUsuario}`
    fetch(URL)
        .then(res => res.json())
        .then(data =>{
            var codigo = data[0].codigoEstabelecimento;
            getAcessosEstabelecimento(codigo, acessosEstabelecimento);
        })
}

function getAcessosEstabelecimento(codigo, acessosEstabelecimento) {
    URL = `https://api-storage-mercado-easy.herokuapp.com/estabelecimentos/?código=${codigo}`
    fetch(URL)
        .then(res => res.json())
        .then(estabelecimento => {
            acessosEstabelecimento.textContent =  estabelecimento[0].quantidadeDeAcessos + " acessos ao estabelecimento";
            getProdutos(estabelecimento[0].id);
        })
        .catch(() => console.log ("Falha ao carregar estabelecimentos!"));  
}

function geraGraficoProdutos(){
    const data = {
        labels,
        datasets: [{
            data: listaAcessos,
            label: 'Acessos',
            backgroundColor: 'blue',
            borderColor: '#191970',
            borderWidth: 3
        }],
    }  

    const config = {
        type: 'bar',
        data,
        options: {
            responsive: true,
            radius:4,
            hoverRadius:10,
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 20,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 15,
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false,
            }
        }
    }
    
    
    const chart = new Chart(ctx, config);
}
