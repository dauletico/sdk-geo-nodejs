var util = require('util');
var bleno = require('bleno');

var TokenServiceCharacteristic = require('./token-service-characteristic');

function TokenService(tokenSigner) {
    console.log('Creating service...')
    bleno.PrimaryService.call(this, {
        uuid: '15555555555000000000000000000001',
        characteristics: [
            new TokenServiceCharacteristic(tokenSigner)
        ]
    });
}

util.inherits(TokenService, bleno.PrimaryService);

module.exports = TokenService;
