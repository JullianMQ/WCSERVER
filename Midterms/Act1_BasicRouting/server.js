var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World!")
})

app.listen(3000, function(req, res) {
    console.log('Server running at http://localhost:3000');
    
})