var rand = require('csprng');
const crypto = require('crypto');

rand(160, 36) // -> 'tq2pdxrblkbgp8vt8kbdpmzdh1w8bex'

var userHelper =
{

  cryptIt:function(pwd,nacl){
    crypto.pbkdf2(pwd, nacl, 33111, 32, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      callback(derivedKey.toString('hex'));
    });
  }

}
