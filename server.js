// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var config = require('./config').config;

var api = new ParseServer(config.server);
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
var dashboard = new ParseDashboard(config.dashboard, config.options);

var app = express();

app.disable('x-powered-by');

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
app.use(config.serverPath, api);
app.use(config.adminPath, dashboard);
// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.');
});

var httpServer = require('http').createServer(app);
httpServer.listen(config.port, function() {
    console.log('Server running on port: ' + config.port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
