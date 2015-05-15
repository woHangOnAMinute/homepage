/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
console.log(express);

var config = require('./config/environment');
// Setup server
var app = express();
// app = express().http().io()
var server = require('http').createServer(app);
require('./config/express')(app);
// require('./routes')(app);

// var io = require('socket.io').listen(server);
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('updatePlaylist', function(data){
    io.emit('updatePlaylist', data);
  });

});
//
//         io.on('batman', function (socket) {
//         console.log(data);
// // socket.broadcast.emit('updatePlaylist', { id: data.newId });
// io.sockets.emit('updatePlaylist', { id: data.newId });
//
//     });

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
