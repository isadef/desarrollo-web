var flag = false;
var reiniciar = false;

$(function()
{
  setInterval(cambiarTitulo, 1000);
  $(".btn-reinicio").click(reInicio);
});

function reInicio()
{
  if (!reiniciar)
  {
    iniciarJuego();
    start();
    $(".btn-reinicio").text("Reiniciar");
    reiniciar = true;
  }
  else
  {
    location.reload();
  }
}

function iniciarJuego()
{
  for (var q = 1; q < 8; q++)
  {
    var myClass = '.col-'+q; 
    var div = $(myClass);
    for (var w = 1; w < 8; w++)
    {
      var num = Math.floor(Math.random() * 4) + 1;
      div.append("<div class='auxiliar'><img src='images/" + num + ".png' class='elemento'></div>");
    }
  }
  $(".panel-tablero img").draggable();
  $(".auxiliar").droppable({
    drop: function(event, ui){
      verSi(event.target, ui.draggable);
    }
  });
  checkMatch();
}

function verSi(div1, img2)
{
  var posible = false;
  var option = 0;
  var div2 = $(img2).parent();
  var i1 = $(div1).index();
  var i2 = $(div2).index();
  var col1 = $(div1).parent();
  var col2 = $(div2).parent();
  var n1 = parseInt($(col1).attr("class")[4]);
  var n2 = parseInt($(col2).attr("class")[4]);
  if (n1 > 1)
  {
    if (n2 == n1 - 1)
    {
      if (i1 == i2)
      {
        posible = true;
        option = 1;
      }
    }
  }
  if (n1 < 7)
  {
    if (n2 == n1 + 1)
    {
      if (i2 == i1)
      {
        posible = true;
        option = 2;
      }
    }
  }
  if (n1 == n2)
  {
    if (i1 > 0)
    {
      if (i1 - 1 == i2)
      {
        posible = true;
        option = 3;
      }
    }
    if (i1 < 6)
    {
      if (i1 + 1 == i2)
      {
        posible = true;
        option = 4;
      }
    }
  }
  /*console.log(n1);
  console.log(n2);
  console.log(i1);
  console.log(i2);
  console.log(posible);*/
  if (posible)
  {
    swap(div1, img2, option);
  }
  else
  {
    $(img2).css("left","auto");
    $(img2).css("top","auto");
  }
}

function swap(div1, img2, option)
{
  var div2 = $(img2).parent();
  var img1 = $(div1).find("img");
  /*console.log(div1);
  console.log(div2);
  console.log(img1);
  console.log(img2);*/
  $(img2).css("left","auto");
  $(img2).css("top","auto");
  $(img1).detach();
  $(img2).detach();
  $(div1).append(img2);
  $(div2).append(img1);
  
  switch(option)
  {
    case 1:
      $(img1).css("margin-left","100px");
      $(img1).animate({
        marginLeft: 0
      }, 500);
      break;
    case 2:
      $(img1).css("margin-right","100px");
      $(img1).animate({
        marginRight: 0
      }, 500);
      break;
    case 3:
      console.log("Why me?!");
      $(img1).css("margin-bottom","-99px");
      $(img1).animate({
        marginBottom: 0
      }, 500);
      break;
    case 4:
      $(img1).css("margin-bottom","99px");
      $(img1).animate({
        marginBottom: 0
      }, 500);
      break;
  }
  
  var moves = parseInt($("#movimientos-text").text()) + 1;
  $("#movimientos-text").text(moves);
  checkMatch();
}

function cambiarTitulo()
{
  if (!flag)
  {
    $(".main-titulo").css("color","white");  
  }
  else
  {
    $(".main-titulo").css("color","yellow");
  }
  flag = !flag;
}

function checkMatch()
{
  var res = 0;
  var veces = 0;
  var mat = new Array(7);
  var esconder = new Array(7);
  var imagenes = new Array(7);
  for (var q = 0; q < 7; q++)
  {
    mat[q] = new Array(7);
    esconder[q] = new Array(7);
    imagenes[q] = new Array(7);
  }
  for (var q = 1; q < 8; q++)
  {
    var myClass = ".col-"+q;
    for (var w = 1; w < 8; w++)
    {
      var selec = "div:nth-child("+w+") img";
      var img = $(myClass).find(selec);
      var i = img.attr('src')[7];
      mat[q-1][w-1] = i;
      esconder[q-1][w-1] = false;
      imagenes[q-1][w-1] = img;
    } 
  }
  //vertical
  for (var q = 0; q < 7; q++)
  {
    for (var w = 0; w < 7; w++)
    {
      var con = 0;
      var num = mat[q][w];
      while (w < 7 && mat[q][w] == num)
      {
        con++;
        w++;
      }
      w--;
      if(con >= 3)
      {
        var aux = w-con;
        for (var e = w; e > aux; e--)
        {
          res+= 10;
          if (!esconder[q][e])
          {
            veces++;
          }
          esconder[q][e] = true;
        }
      }
    }
  }
  /*for (var q = 0; q < 7; q++)
  {
    var cadena = "";
    for (var w = 0; w < 7; w++)
    {
      cadena += esconder[q][w]+" ";
    }
    console.log(cadena);
  }*/
  //horizontal
  for (var q = 0; q < 7; q++)
  {
    for (var w = 0; w < 7; w++)
    {
      var con = 0;
      var num = mat[w][q];
      while (w < 7 && mat[w][q] == num)
      {
        con++;
        w++;
      }
      w--;
      if(con >= 3)
      {
        var aux = w-con;
        for (var e = w; e > aux; e--)
        {
          res+= 10;
          if (!esconder[e][q])
          {
            veces++;
          }
          esconder[e][q] = true;
        }
      }
    }
  }
  //esconder
  for (var q = 0; q < 7; q++)
  {
    var cadena = "";
    for (var w = 0; w < 7; w++)
    {
      cadena += esconder[q][w]+" ";
      if (esconder[q][w])
      {
        
        if (veces == 1)
        {
          animacionEsp(imagenes[q][w],q+1);
        }
        else
        {
          animacion(imagenes[q][w],q+1);
        }
        veces--;
      }
    }
    //console.log(cadena);
  }
  var anterior = parseInt($('#score-text').text());
  anterior += res;
  $('#score-text').text(anterior);
}


function aux(contador, element, nh)
{
  if (contador < 4)
  {
    $(element).fadeOut('slow', function(){
      $(this).fadeIn('slow', function(){
        contador++;
        aux(contador+1, this, nh);
      });
    });
  }
  else
  {
    var pare = $(element).parent();
    $(element).remove();
    pare.remove();
    var myClass = '.col-'+ nh;
    var div = $(myClass);
    var n = Math.floor(Math.random() * 4) + 1;
    div.prepend("<div class='auxiliar'><img src='images/" + n + ".png' class='elemento'></div>");
    console.log
    $(".panel-tablero img").draggable();
    //$(".panel-tablero img").draggable('enable');
    $(".auxiliar").droppable({
    drop: function(event, ui){
        verSi(event.target, ui.draggable);
      }
    });
  } 
}

function animacion(element,nh)
{
  //$(".panel-tablero img").draggable('disable');
  aux(0, element, nh);
}


function auxEsp(contador, element, nh)
{
  if (contador < 4)
  {
    $(element).fadeOut('slow', function(){
      $(this).fadeIn('slow', function(){
        contador++;
        auxEsp(contador+1, this, nh);
      });
    });
  }
  else
  {
    var pare = $(element).parent();
    $(element).remove();
    pare.remove();
    var myClass = '.col-'+ nh;
    var div = $(myClass);
    var n = Math.floor(Math.random() * 4) + 1;
    div.prepend("<div class='auxiliar'><img src='images/" + n + ".png' class='elemento'></div>");
    $(".panel-tablero img").draggable();
    //$(".panel-tablero img").draggable('enable');
    $(".auxiliar").droppable({
    drop: function(event, ui){
        verSi(event.target, ui.draggable);
      }
    });
    checkMatch();
  } 
}

function animacionEsp(element,nh)
{
  //$(".panel-tablero img").draggable('disable');
  auxEsp(0, element, nh);
}

function animacionFin()
{
  $(".panel-tablero").slideUp(700);
  $(".time").hide();
  $(".panel-score").css("margin-left","70%");
  $(".panel-score").delay(700).animate({
    width: "100%",
    marginLeft: "0"
  }, 1000, ponerTitulo);
}

function ponerTitulo()
{
  $(".panel-score").prepend("<h2 class='terminado'>Juego terminado</h2>");
  $(".terminado").slideDown(1000);
}
//timer
var segundos = 0;
var minutos = 2;
var control;
function start () 
{
	control = setInterval(cronometro,1000);
}
function stop () 
{
	clearInterval(control);
}
function cronometro () 
{
	if (segundos > 0)
  {
    segundos--;
    if (segundos == 0 && minutos == 0)
    {
      stop();
      animacionFin();
    }
    var m = "0"+minutos;
    var s = segundos;
    if (segundos < 10)
    {
      s = "0"+segundos;
    }
    $("#timer").text(m+":"+s);
  }
  else if (segundos == 0)
  {
    segundos = 59;
    minutos--;
    var m = "0"+minutos;
    var s = segundos;
    $("#timer").text(m+":"+s);
  }
}