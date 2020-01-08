let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json());

app.post("/", function(req, resp) {
  //handle request
});
app.listen(3000);
