/************************************************************************************************************
Arquivo de inicialização das funções javascript para construção da tabela de informações dos imóveis bem como
dos gráficos de indicadores;
Como as tabelas e gráficos mostram informações da mesma fonte de dados (o arquivo imoveis.json) é feito o
carregamento dos dados uma única vez, inicializando a variável dadosImoveisJson com o conteúdo do referido
arquivo em formato Json mesmo.
*************************************************************************************************************/
// Verificando se o DOM está pronto e chamando as funções para construir a tabela e os gráficos
$(document).ready(function () {
	// Carregando dados codificados em formato JSON a partir do arquivo imoveis.json usando uma solicitação GET HTTP
	$.getJSON( "imoveis.json", function(dadosImoveisJson) {
		// Chamando a função que irá plotar os gráficos com base nos dados dos imóveis
		// Está função está no arquivo graficos.js
		montaTabela(dadosImoveisJson);
    	carregaGraficos(dadosImoveisJson); 
  	});
});  
