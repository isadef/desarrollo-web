//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

var customSearch = false;

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (customSearch == false) {
      customSearch = true
    } else {
      customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

$(function(){
  //cargar ciudades y tipos
  $.ajax({
    url: '/llenarSelect',
    type: 'post',
    dataType: 'json',
    data: {tipo: "Tipo"},
    success: function(data){
      console.log("Tipos "  + data);
      ponerTipos(data, "#tipo");
    },
    error: function(){
      console.log("No se pudieron cargar los tipos");
    }
  });
  $.ajax({
    url: '/llenarSelect',
    type: 'post',
    dataType: 'json',
    data: {tipo: "Ciudad"},
    success: function(data){
      ponerTipos(data, "#ciudad");
    },
    error: function(){
      console.log("No se pudieron cargar las ciudades");
    }
  });
  
  $("#buscar").click(function(){
    $(".lista").empty();
    if (customSearch)
    {
      var ciudad = $('#ciudad').val();
      var tipo = $('#tipo').val();
      var slider = $("#rangoPrecio").data("ionRangeSlider");
      var from = slider.result.from;
      var to = slider.result.to;
      console.log("Ciudad: " + ciudad);
      console.log("Tipo: " + tipo);
      console.log("De: " + from);
      console.log("A: " + to);
      $.ajax({
        url: '/getFilteredData',
        type: 'post',
        dataType: 'json',
        data: {ciudad: ciudad, tipo: tipo, minPrecio: from, maxPrecio: to},
        success: function(data){
          ponerDatos(data);
        },
        error: function(){
          console.log("No se pudieron cargar las viviendas");
        }
      })
    }
    else
    {
      $.ajax({
        url: '/getAll',
        type: 'post',
        dataType: 'json',
        success: function(data){
          ponerDatos(data);
        },
        error: function(){
          console.log("No se pudieron cargar las viviendas");
        }
      })

    }
  });
});

function ponerTipos(data, tipo)
{
  for (var i = 0; i < data.length; i++)
  {
    $(tipo).append('<option value="'+data[i]+'">'+data[i]+'</option>');
  }
  $('select').material_select();
}

function ponerDatos(data){
  //console.log("Poner datos");
  for (var i = 0; i < data.length; i++)
  {
    $(".lista").append('<div class="card horizontal">' +
                        '<div class="card-image">' +
                          '<img src="img/home.jpg">' + 
                        '</div>' + 
                        '<div class="card-stacked">' +
                          '<div class="card-content">' +
                            '<div>' + 
                              '<b>Direccion: </b><p>'+ data[i].Direccion +'</p>' +
                            '</div>' +
                            '<div>' +
                              '<b>Ciudad: </b><p>'+ data[i].Ciudad +'</p>' +
                            '</div>' + 
                            '<div>' +
                              '<b>Telefono: </b><p>'+ data[i].Telefono +'</p>' +
                            '</div>' +
                            '<div>' +
                              '<b>Código postal: </b><p>'+ data[i].Codigo_Postal +'</p>' +
                            '</div>' +
                            '<div>' +
                              '<b>Precio: </b><p>'+ data[i].Precio +'</p>' +
                            '</div>' +
                            '<div>' +
                              '<b>Tipo: </b><p>'+ data[i].Tipo +'</p>'+
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>');
  }  
}