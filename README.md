# nub-auth
a very simple, minimalistic basic authentication tool, that will mostly serve as a middleware.

var express = require('express');
var nubAuth = require('./middleware.js');
app = express();

app.use(['/v1'], nubAuth({
    challenge: true,
    users: { 'admins': 'admin', 'users': 'user', 'guest': 'guested' }
}));
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send('Hello World welcome to API endpoints free !');
});

app.get("/v1", (req, res) => {
  res.send("Hello World welcome to API endpoints closed !");
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

// app.use(["/api2"], nubAuth({
//     users: {},
//     challenge: true
// }));
