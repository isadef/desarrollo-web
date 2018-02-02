var http = require('http'),
    express = require('express'),
    routing = require('./router.js'),
    bodyParser = require('body-parser');
    
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routing);

var server = http.createServer(app);
server.listen(8080, function(){
  console.log("Server is listening on port: " + 8080);
})