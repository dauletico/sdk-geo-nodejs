var util = require('util');
var bleno = require('bleno');
var TokenSigner = require('./token-signer');

function TokenServiceCharacteristic(TokenSigner) {
  console.log('Characteristic initialized.')
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Signs token and notifies upon completion'
      })
    ]
  });

  this.TokenSigner = TokenSigner;
}

util.inherits(TokenServiceCharacteristic, bleno.Characteristic);

TokenServiceCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  /*else if (data.length !== 2) { // TODO: update to accept correct length
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }*/
  else {
    var token = data.toString('hex');
    console.log(token)
    this.TokenSigner.once('ready', (result) => {
      if (this.updateValueCallback) {
        var data = new Buffer(1);
        data.writeUInt8(result, 0);
        this.updateValueCallback(data);
      }
    });
    this.TokenSigner.signToken(token);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = TokenServiceCharacteristic;