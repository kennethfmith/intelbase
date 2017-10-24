var mysql = require("mysql");
const config = require("../config");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: config.database.host,
    password: config.database.password,
    user: config.database.user,
    database: config.database.db

});

var dbconnection =
{
  // test connection
  testConnection:function(callback)
  {
    pool.getConnection(function(err, connection)
    {
      if (err) {
        console.log("error connecting")
        throw err;
      }
      callback(null,"connection successful");
    })
  },

  // run select query
  select:function(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
          console.log("error connecting")
          throw err;
        }
      connection.query(query, function(err, rows, fields) {
        if (err) {
          throw err;
          connection.close();
        }

        if (rows.length == 0) {
            callback(null, "no records found");
            connection.release();
        } else {
            callback(null, rows);
            connection.release();
        }
        });
    });
  },

  select:function(query, params, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
          console.log("error connecting")
          throw err;
        }

      connection.query(query, params, function(err, rows, fields) {
        if (err) {
          throw err;
          connection.close();
        }

        if (rows.length == 0) {
            callback(null, "no records found");
            connection.release();
        } else {
            callback(null, rows);
            connection.release();
        }
        });
    });
  },

  insert:function(query, params, callback)
  {
    pool.getConnection(function(err, connection)
    {
      if (err) {
        console.log("error connecting")
        throw err;
      }

      connection.query(query, params, function(err, result)
      {
        if (err) {
          callback(err);
          connection.close();
        } else {
          callback(null, result.insertId);
          connection.release();
        }
      });
    });
  },

  update:function(query, params, callback)
  {
    pool.getConnection(function(err, connection)
    {
      if (err) {
        console.log("error connecting")
        throw err;
      }

      connection.query(query, params, function(err, result)
      {
        if (err) {
          callback(err);
          connection.close();
        } else {
          callback(null, result.affectedRows);
          connection.release();
        }
      });
    });
  },

  delete:function(query, params, callback)
  {
    pool.getConnection(function(err, connection)
    {
      if (err) {
        console.log("error connecting")
        throw err;
      }

      connection.query(query, params, function(err, result)
      {
        if (err) {
          callback(err);
          connection.close();
        } else {
          callback(null, result.rowsAffected);
          connection.release();
        }
      });
    });
  }
}

module.exports = dbconnection;
