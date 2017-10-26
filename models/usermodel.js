var db = require("../db/dbconnection");
var userhelp = require("../helpers/user_helper.js");

/* USER FIELDS
 UserID
 FullName
 Password
*/

var user =
{

  // test connection - move to another file
  testConnection:function(callback)
  {
    db.testConnection(function(err, data)
    {
      if (err)
      {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  all:function(callback)
  {
    db.select("SELECT * FROM users", function(err, data){
      if (err)
      {
        callback(err, null);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
  },

  getForID:function(id, callback)
  {
    db.select("SELECT * FROM users WHERE UserID = ?", id, function(err, data){
      if (err)
      {
        callback(err, null);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
  },

  newUser:function(data, callback)
  {
    var pwdX;
    var pwd = data.Password;
    console.log("pwd = " + pwd);
    userhelp.cryptIt(pwd,"dsdjf0sd9ffncxi", (err, data) => {
        pwdX = data;
    });
    callback(null, pwdX);
    /*
    //var tempdata = { 'FullName':'Mike Krisky','Password':'sluggy' };
    db.insert("INSERT INTO users SET ?", data, (err, data) => {
      if (err)
      {
        callback(err, null);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
    */
  },

  updateUser:function(data, callback)
  {
    var sql = "UPDATE users SET FullName = ?, Password = ? WHERE UserID = ?";
    db.update(sql, [data.FullName, data.Password, data.UserID], (err, data) => {
      if (err)
      {
        callback(err, null);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
  },

  deleteUser:function(data, callback)
  {
    var sql = "DELETE FROM users WHERE UserID = ?";
    console.log(data);
    db.update(sql, [data.UserID], (err, data) => {
      if (err)
      {
        callback(err, null);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
  },

  authenticateUser:function(data, callback){
    // parse data (username, password)
    // query db for username, userid, and salt
    // encode pwd + salt
    // query db for password match
    // return result
  }
}


module.exports = user;
