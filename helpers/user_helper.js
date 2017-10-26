var rand = require('csprng');
const crypto = require('crypto');

var userHelper =
{

  cryptIt:function(pwd, nacl, callback){
    crypto.pbkdf2(pwd, nacl, 33111, 32, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      callback(null, derivedKey.toString('hex'));
    });
  }

}

module.exports = userHelper;
