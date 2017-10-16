var user = require("../models/usermodel");
const router = require("express").Router();

var userRoutes = require("./userroutes");

router.use("/users", userRoutes);

router.get("/", function(req, res)
{
  res.send("It is okay");
});

router.get("/testconnection", function(req, res)
{
  var x = user.testConnection(function(err, data)
  {
    if (err)
    {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
