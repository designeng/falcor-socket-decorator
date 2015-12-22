var app = require('./app');

app.set('port', process.env.PORT || 8080);
var port = app.get('port');

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('navigate to http://localhost:' + port);
});