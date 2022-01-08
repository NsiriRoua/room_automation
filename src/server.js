var express    = require ('express');
var bodyParser = require('body-parser');
var passport   = require('passport');
var mongoose   = require('mongoose');
var cors       = require('cors');
var https      = require('https')
var http       = require('http')
var fs         = require('fs')
var mqtt = require('mqtt');

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var port = config.server.port;
var cert = config.certificate;
var key = config.privatekey;
var url  = config.url;
var uri  = config.database.mongodb_uri;

var fs = require('fs');
var https = require('https');

var certificate = fs.readFileSync(cert, 'utf8');
var privateKey = fs.readFileSync(key, 'utf8');


var credentials = {key: privateKey, cert: certificate};

var app = express();

// your express configuration here
var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

app.use(cors());

//get your request parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
// Use the passport package in our application
app.get('/', function(req,res) {
    return res.send('Hello! The API is at: ' + 'my.wob.application' +port + '/api ');
 });

 var routes = require('./routes');
 var mqttroutes = require('./mqttroutes')
 app.use('/mqttapi', mqttroutes)
 app.use('/api', routes);

 mongoose.connect(uri).
          catch(error => handleError(error));


 const connection = mongoose.connection;
 connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
 });

 connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
    process.exit();
 });

 //start the server
httpsServer.listen(port, () => {
  console.log('HTTPS Server running on:' + url+ ':'+port);
});
httpServer.listen(8080, () => {
  console.log('HTTP Server running on port 80');
});



