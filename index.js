var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;


// ROUTES FOR OUR API
// =============================================================================

// Routing
app.use(express.static(__dirname ));

app.set('port', (process.env.PORT || 5000));
// views is directory for all template files
app.set('views', __dirname);
app.set('view engine', 'ejs');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res){
  console.log("making get request");
  res.render('index.ejs');
});
