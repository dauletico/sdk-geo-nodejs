var util = require('util');
var bleno = require('bleno');

var TokenServiceCharacteristic = require('./token-service-characteristic');

function TokenService(tokenSigner) {
    console.log('Creating service...')
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new TokenServiceCharacteristic(tokenSigner)
        ]
    });
}

util.inherits(TokenService, bleno.PrimaryService);

module.exports = TokenService;
