var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");

const routes = require("./routes");

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", routes);

app.listen(3000);
console.log("intelweb running on port 3000");
