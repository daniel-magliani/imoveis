/************************************************************************************************************
Função que irá receber os dados em formato Json do arquivo "imoveis.json" e inserir na tabela id="tblImoveis"
os dados das colunas:
Endereço;
Bairro;
Cidade;
Modalidade de Venda;
Preço Oferta (R$);
Valor Avaliação (R$);
Porcentagem Desconto (%).
Habilitando busca de valores bem como filtro individual por coluna.
************************************************************************************************************/

function montaTabela(dadosImoveisJson){
  $('#tblImoveis').DataTable({
      "data": dadosImoveisJson,
      "columns": [
          { "data": "endereco"},
          { "data": "bairro" },
          { "data": "cidade" },
          { "data": "modalidadeVenda" },
          { "data": "precoOferta"  }, 
          { "data": "valorAvaliacao" },
          { "data": "porcentagemDesconto" },
      ],
      "columnDefs": [{
          "render": function(data){
                      data = data.replace(".","").replace(",",".");
                      return parseFloat(data).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                    },
          "targets": [4,5] // Convertendo colunas precoOferta e valorAvaliacao para valor em reais
      },
      {
          "render": function ( data, type, row ) {
                      return parseFloat(data).toLocaleString() + '%';
                    },
          "targets": [6] // Convertendo porcentagemDesconto para float e adicionando %
      },
      {
          "render": function ( data, type, row ) {
                      return data.trim();
                    },
          "targets": [0,1,2] // Limpando espaços em branco do início e fim das colunas endereco,bairro e cidade
      }
      ],
      oLanguage: { // Traduzindo os menus do DataTables em português
          sLengthMenu:   "Mostrar _MENU_ registros",
          sInfo:         "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          sInfoEmpty:    "Mostrando de 0 até 0 de 0 registros",
          sInfoFiltered: "(filtrado de _MAX_ registros no total)",
          sSearch:       "Procurar:",
          oPaginate: {
              sFirst:    "Primeiro",
              sPrevious: "Anterior",
              sNext:     "Seguinte",
              sLast:     "Último"
          },
          oAria: {
              sSortAscending:  ": Ordenar colunas de forma ascendente",
              sSortDescending: ": Ordenar colunas de forma descendente"
          }
      },
      "language": { 
        "decimal": ",",    // Utilizando a vírgula para marcar a casa decimal 
        "thousands": "."   // Utilizando a ponto para marcar os milhares
      },
      initComplete: function () {     // Função DataTables para pesquisa de coluna individual (selecionar entradas)
        this.api().columns().every( function () {
          var column = this;
          var select = $('<select class="browser-default custom-select form-control-sm"><option value="" selected>Filtrar</option></select>')
              .appendTo( $(column.footer()).empty() )
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                      $(this).val()
                  );
                  column
                      .search( val ? '^'+val+'$' : '', true, false )
                      .draw();
              });

          column.cells('', column[0]).render('display').sort().unique().each( function ( d, j ){            
              select.append( '<option value="'+d+'">'+d+'</option>' )
          });
        });
      }
  });
}  
 