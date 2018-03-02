var util = require('util');
var events = require('events');
var fs = require('fs');
var request = require('request');
require('dotenv').config();

var Web3 = require('web3');
var web3 = new Web3();
var account;

if (fs.existsSync('keys/privkey')) {
  var private_key = fs.readFileSync('keys/privkey', 'utf-8');
  account = web3.eth.accounts.wallet.add(private_key);
  console.log('Loading existing account.');
} else {
  account = web3.eth.accounts.create();
  fs.writeFileSync('keys/privkey', account.privateKey);
  console.log('Generating new account...');
}

console.log(account);

var ResponseCodes = {
  SUCCESS: 0,
  FAILURE: 1
};

function TokenSigner() {
  events.EventEmitter.call(this);
}

util.inherits(TokenSigner, events.EventEmitter);

TokenSigner.prototype.signToken = function(input) {
  var inputArr = input.split('|');
  var anonymizeVerifications = inputArr[0];
  var token = inputArr[1];
  // insert logic to sign token
  console.log('Token received: ' + token)


  // Message Format
  // For now: 'token' + '|' + 'timestamp'

  var timestamp = Math.floor(new Date() / 1000)
  var message = token + '|' + timestamp;

  var signature = account.sign(message);
  console.log('Signed message: ' + message);
  console.log('Generated signature: ' + signature.signature);
  if (anonymizeVerifications == 0) {
    request.post(process.env.SERVER_URL + '/api/checkin', { form :
      {
        userToken: token,
        timestamp: timestamp,
        signature: signature,
        node: account.address
      }}, (err, res, body) => {
        console.log(body);
      });
  }
  this.emit('ready', {
    signature: signature,
    timestamp: timestamp,
    publicKey: account.address
  });
};

module.exports.TokenSigner = TokenSigner;
module.exports.ResponseCodes = ResponseCodes;
