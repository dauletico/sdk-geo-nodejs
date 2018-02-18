# Geo Node

![logo](https://image.ibb.co/bwnLo7/geo_1_15.png)

The code for a Node (a trusted device).

The Node provides the following functionality:

- Generate a private / public keypair, unique to each node
- Initialize itself with the backend, signing with the private key
- Act as a Bluetooth peripheral to receive verification requests from users. Sign messages using private key verifying presence of user at a certain timestamp.
- Communicate messages to backend 

### Integrations

[Bleno](https://github.com/noble/bleno) - Act as Bluetooth peripheral

[Web3](https://github.com/ethereum/web3.js/) - Generate keypair

### Getting Started

1. Install requirements using `npm install`
1. Run using `node geo-node`
