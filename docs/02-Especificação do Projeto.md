# Especificações do Projeto

O Mercado Easy é uma plataforma digital que tem como principal objetivo facilitar para os seus usuários a busca pelos menores preços de produtos em supermercados no momento de realizar suas compras, evitando que esse não tenha que se deslocar até vários estabelecimentos para encontrar aquele que possui os menores preços dos produtos que procura. A plataforma será desenvolvida utilizando a linguagem de marcação HTML, juntamente com o framework Boostrap que irá auxiliar no desenvolvimento dos componentes presentes no site e com o CSS que será utilizado para adicionar estilo na página. Para o desenvolvimento da parte dinâmica do site será utilizada a linguagem JavaScript. As informações dos usuários serão armazenadas utilizando a API de dados rest Json Server.  

## Personas

João Paulo tem 27 anos, ele trabalha como operador de torno mecânico em uma Indústria  Mecânica sediada no Município de Campinas em São Paulo e realiza entrega delivery aos finais de semana para um restaurante para poder pagar as contas de casa. João se casou novo logo aos 22  com sua primeira namorada que conheceu quando tinha 15 anos de idade. Hoje em dia ele e sua esposa chamada Rebeca têm 3 filhos, o mais velho tendo 6 e o mais novo 8 meses de idade. Rebeca é dona de casa e responsável por fazer a lista de compras no mês, ela tem tido dificuldade de encontrar promoções e os melhores preços nos estabelecimentos, por isso gostaria muito que houvesse algum aplicativo que a mostrasse de forma simples e rápida em quais mercados estão os menores preços.

Julio tem 22 anos, mora sozinho em Contagem MG, é programador junior e faz faculdade de Ciência da Computação no período noturno.Júlio utiliza grande parte do seu salário para pagar a faculdade, o que faz com que ele tenha que economizar bastante na hora das compras de casa. Com isso, ele procura por uma opção que possa facilitar na hora da procura pelo menor preço dos produtos, tendo em vista que o mesmo não possui muito tempo para se locomover em vários supermercados para analisar os preços dos itens que precisa. 

Maurício Ramos possui 72 anos e mora sozinho em um bairro simples de sua cidade, está aposentado e recebe uma baixa
remuneração, além de não possuir formas de ganhar dinheiro extra, forçando-o a comprar apenas o essencial para o seu dia a dia e sempre o que for mais barato,
o que muitas vezes acarreta na compra de produtos de baixa qualidade; sua capacidade de se locomover está bem prejudicada e por isso evita andar por longas distâncias,
para que sua condição física não se agrave. Dessa forma, ele busca um meio de não gastar tanto dinheiro em suas idas ao supermercado, já que possui outros gastos com remédios e contas, além de não precisar se locomover para longe de sua residência.

Nathalia Silva tem 34 anos, é divorciada e tem 2 filhos menores de idade para sustentar, para isso, ela tem dois empregos. Em um dos seus empregos ela trabalha em uma Empresa de Telemarketing no qual tem sua carga horária de 7:00 até 15:00 e logo após o término do horário de trabalho do seu primeiro emprego, ela se encaminha para o seu segundo, no qual ela trabalha como babá das 16:00 até as 19:00 para que tenha uma renda extra. Como Nathalia é uma pessoa muito ocupada, ela vê a necessidade de um aplicativo em que a faria economizar tempo ao realizar suas compras.



## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário  | Uma barra de pesquisa, que após a realização da busca mostre em quais estabelecimentos estão os produtos mais baratos          | Ter acesso aos menores preços do produto               |
|Usuário      | Filtro para mostrar  somente os produtos em promoção     | Permitir que possam ter acesso as melhores ofertas |
|Representante do estabelecimento|Acessar uma Dashboard para escolher o produto pelo seu código, adicionar preço, quantidade e dizer se ele esta na promoção  | Fazer com que os usuários tenham acessos aos preços do produtos |
|Gerente do Supermercado | Gerar relatórios em formato de gráficos acerca dos acessos dos usuários a seu estabelecimento e quais são os produtos mais buscados | Visão de análise sob a gestão de acessos ao seu negócio |


## Requisitos

Os quadros que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o representante do estabelecimento cadastre os preços dos produtos | ALTA | 
|RF-002| Permitir que o usuário tenha acesso aos preços dos produtos e seus respectivos estabelecimentos  | ALTA |
|RF-003| Permitir que o representante do estabelecimento movimente o estoque dos produtos  | ALTA |
|RF-004| Emitir um relatório de acessos para cada estabelecimento | ALTA |
|RF-005| Permitir que representante do estabelecimento adicione promoções aos produtos | MÉDIA |
|RF-006| Permitir que o usuário tenha acesso aos produtos em promoção | MÉDIA |
|RF-007| Permitir que o usuário adicione produtos ao seu carrinho | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Garantir integridade e confidencialidade entre o gerente e o representante do supermercado| BAIXA |
|RNF-002| Auntentificação do usuário | ALTA | 
|RNF-003| Registrar ações do usuário |  ALTA |



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |



