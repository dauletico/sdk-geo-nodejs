var util = require('util');
var bleno = require('bleno');

//
// Token Signer
// Signs tokens received from users
//
var TokenSigner = require('./token-signer');

//
// Token Service
// Initializes bluetooth service
//
var TokenService = require('./token-service');

//
// A name to advertise our Token Service.
//
var name = 'TokenService';
var tokenService = new TokenService(new TokenSigner.TokenSigner());

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [tokenService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('Initialized node, now advertising bluetooth.');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      tokenService
    ]);
  }
});
