# nub-auth

[![npm version](https://badge.fury.io/js/nub-auth.svg)](https://badge.fury.io/js/nub-auth)
[![npm](https://img.shields.io/npm/dm/nub-auth.svg)]()
![TypeScript compatible](https://img.shields.io/badge/typescript-compatible-brightgreen.svg)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)



a very simple, minimalistic basic authentication tool, that will mostly serve as a middleware.

## How to Install and Installation information

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

type below command in your terminal
```
npm install nub-auth
```

## How to use it
The module interface exposes just a single function that expects a single argument

``` app.js
var express = require('express');
var nubAuth = require('nub-auth');
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

```

### argument users

You should pass an objects with users and password as key value pairs

### argument chanllenge

By defaults the tools does not force the browser to display a basic chanllenge to the user, set this to true to force the browser to display a chanllenge. NB browsers like chromium edge will not display a chanellege, you have to set this on your browser settings.
