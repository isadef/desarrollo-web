var fs = require('fs');

function getAllData(response)
{
  //console.log("getAllData");
  fs.readFile('../public/data.json', function(err, data){
		if (err)
		{
      console.log("getAllData error");
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		else
		{
      //console.log("getAllData success");
			response.send(data);
      response.end();
		}
	});
}

function getTipos(response, prop)
{
  fs.readFile('../public/data.json', 'utf8', function(err, data){
		if (err)
		{
      console.log("getTipos error");
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		else
		{
      //console.log("getTipos success");
			countDif(response, prop, data);
		}
	});
}

function countDif(response, prop, data)
{
  var aux = {};
  var res = [];
  data = JSON.parse(data);
  for (var i = 0; i < data.length; i++)
  {
    if (!aux.hasOwnProperty(data[i][prop]))
    {
      res.push(data[i][prop]);
      var auxProp = data[i][prop];
      aux[auxProp] = true;
      //console.log(JSON.stringify(aux));
    }
  }
  response.send(res);
  response.end();
}

function getFilteredData(response, objFiltrado)
{
  fs.readFile('../public/data.json', function(err, data){
		if (err)
		{
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		else
		{
			filtrar(response, objFiltrado, data);
		}
	});
}

function filtrar(res, obj, data)
{
  data = JSON.parse(data);
  if (obj.tipo != "")
  {
    data = data.filter(function(elemento){
      return elemento.Tipo == obj.tipo;
    }); 
  }
  if (obj.ciudad != "")
  {
    data = data.filter(function(elemento){
      return elemento.Ciudad == obj.ciudad;
    }); 
  }
  //console.log("El precio es " + obj.minPrecio + "-" + obj.maxPrecio);
  data = data.filter(function(elemento){
    var precio = Number(elemento.Precio.substring(1).replace(',', ''));
    //console.log(precio);
    return (precio >= obj.minPrecio && precio <= obj.maxPrecio);
  });
  res.send(data);
  res.end();
}

exports.getAllData = getAllData;
exports.getFilteredData = getFilteredData;
exports.getTipos = getTipos;