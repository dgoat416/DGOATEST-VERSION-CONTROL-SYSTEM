// File: app.js
var express = require('express'); // Load the Express builder fcn.
var app = express();  // Init an Express object.
app.get('/', function (req, res) { // Set page-gen fcn for URL root request.
    res.send('Hello World! IM GOATED SON!'); // Send webpage containing "Hello World!".
});
app.listen(3000, function () { // Set callback action fcn on network port.
    console.log('app.js listening on port 3000!');
});