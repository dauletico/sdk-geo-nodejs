var util = require('util');
var events = require('events');
var crypto = require('crypto');
var fs = require('fs');

var private_key = fs.readFileSync('keys/privkey.pem', 'utf-8');
var public_key = fs.readFileSync('keys/pubkey.pem', 'utf-8');
var signer = crypto.createSign('sha256');

var ResponseCodes = {
  SUCCESS: 0,
  FAILURE: 1
};

function TokenSigner() {
  events.EventEmitter.call(this);
}

util.inherits(TokenSigner, events.EventEmitter);

TokenSigner.prototype.signToken = function(token) {
  // insert logic to sign token
  console.log('Token received: ' + token)

  // Message Format
  // For now: 'token' + '|' + 'timestamp'

  var timestamp = Math.floor(new Date() / 1000)
  var message = token + '|' + timestamp;

  signer.update(message);
  signer.end();

  const signature = signer.sign(private_key)
  const signature_hex = signature.toString('hex')
  console.log('Signed message: ' + message);
  console.log('Generated signature: ' + signature_hex);
  this.emit('ready', ResponseCodes.ResponseCodes);
};

module.exports.TokenSigner = TokenSigner;
module.exports.ResponseCodes = ResponseCodes;
