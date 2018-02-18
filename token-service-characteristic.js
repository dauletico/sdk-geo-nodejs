var util = require('util');
var bleno = require('bleno');
var TokenSigner = require('./token-signer');

function TokenServiceCharacteristic(TokenSigner) {
  console.log('Characteristic initialized.')
  bleno.Characteristic.call(this, {
    uuid: '14444444444000000000000000000001',
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
    var token = data.toString('utf8');
    console.log(token)
    this.TokenSigner.once('ready', (response) => {
      console.log(response)
      if (this.updateValueCallback) {
        var responseString = response.signature.signature + '|' + response.timestamp + '|' + response.publicKey;
        let firstPart = responseString.substring(0, 100);
        let secondPart = responseString.substring(100);
        var buf = Buffer.from(firstPart);
        this.updateValueCallback(buf);
        var buf = Buffer.from(secondPart);
        this.updateValueCallback(buf);
      }
      callback()
    });
    this.TokenSigner.signToken(token);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = TokenServiceCharacteristic;