var db = require("../db/dbconnection");

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
  }
}


module.exports = user;
