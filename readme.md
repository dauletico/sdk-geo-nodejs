# Hackathon Node

The code for a Node (a trusted device).

The Node will provide the following functionality:

- Generate a private / public keypair, unique to each node
- Initialize itself with the backend, signing with the private key
- Act as a Bluetooth peripheral to receive verification requests from users. Sign messages using private key verifying presence of user at a certain timestamp.
- Communicate messages to backend 

### Planned integrations

[Bleno](https://github.com/noble/bleno) - Act as Bluetooth peripheral

[Crypto](https://nodejs.org/api/crypto.html) - Sign messages using private key

### Getting Started

1. Install requirements using `npm install`
1. Run using `node hackathon-node`