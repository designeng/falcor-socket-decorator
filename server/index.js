var app = require('./app');

app.set('port', process.env.PORT || 8080);
var port = app.get('port');

app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('navigate to http://localhost:' + port);
});