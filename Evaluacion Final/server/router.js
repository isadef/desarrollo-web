var express = require('express'),
    path = require('path');
var router = express.Router();
var libr = require('./lib');

var viewsPath = path.join(__dirname, "../") + 'public/';

router.get('/', function(req, res){
  res.sendFile(viewsPath + 'index.html');
});

router.get('/index.html', function(req, res){
  res.sendFile(viewsPath + 'index.html');
});

router.get('/ion.rangeSlider.css', function(req, res){
  res.sendFile(viewsPath + 'ion.rangeSlider.css');
});

router.get('/ion.rangeSlider.skinFlat.css', function(req, res){
  res.sendFile(viewsPath + 'ion.rangeSlider.skinFlat.css');
});

router.get('/app.css', function(req, res){
  res.sendFile(viewsPath + 'app.css');
});

router.get('/ion.rangeSlider.min.js', function(req, res){
  res.sendFile(viewsPath + 'ion.rangeSlider.min.js');
});

router.get('/app.js', function(req, res){
  res.sendFile(viewsPath + 'app.js');
});

router.get('/app.js', function(req, res){
  res.sendFile(viewsPath + 'app.js');
});

router.get('/img/sprite-skin-flat.png', function(req, res){
  res.sendFile(viewsPath + '/img/sprite-skin-flat.png');
});

router.get('/img/home.jpg', function(req, res){
  res.sendFile(viewsPath + '/img/home.jpg');
});

router.post('/getAll', function(req, res){
  libr.getAllData(res);
});

router.post('/getFilteredData', function(req, res){
  var preferencias = {ciudad: req.body.ciudad, tipo: req.body.tipo, minPrecio: req.body.minPrecio, maxPrecio: req.body.maxPrecio};
  libr.getFilteredData(res, preferencias);
});

router.post('/llenarSelect', function(req, res){
  //console.log("Es " + req.body.tipo);
  libr.getTipos(res, req.body.tipo);
});

module.exports = router;