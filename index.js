var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

app.post("/", function(req, resp) {
  //handle request
});
app.listen(3000);
