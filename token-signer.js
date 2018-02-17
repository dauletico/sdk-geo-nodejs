var util = require('util');
var events = require('events');

var ResponseCodes = {
  SUCCESS:    0,
  FAILURE: 1
};

function TokenSigner() {
  events.EventEmitter.call(this);
}

util.inherits(TokenSigner, events.EventEmitter);

TokenSigner.prototype.signToken = function(token) {
  // insert logic to sign token
  console.log('Token received: ' + token)
  this.emit('ready', ResponseCodes.ResponseCodes);
};

module.exports.TokenSigner = TokenSigner;
module.exports.ResponseCodes = ResponseCodes;
