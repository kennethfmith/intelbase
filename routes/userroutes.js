var user = require("../models/usermodel");
var express = require("express");
var router = express.Router();

router.post('/testPost', function(req, res){
console.log("Request handler post was called.");
res.send("GOOD");
});

router.get("/", function(req, res)
{
  var x = user.all(function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});


router.get("/:userID", function(req, res)
{
  var id = req.params.userID * 1;
  user.getForID(id, function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});

router.post("/", function(req, res)
{
  user.newUser(req.body, function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});

router.put("/", function(req, res)
{
  user.updateUser(req.body, function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});

router.delete("/", function(req, res)
{
  user.deleteUser(req.body, function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});


module.exports = router;
