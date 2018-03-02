# Geo Node

![logo](http://image.ibb.co/cd2E0x/geo_logo.png)

The code for a Node (a trusted device).

The Node provides the following functionality:

- Generate a private / public keypair, unique to each node
- Initialize itself with the backend, signing with the private key
- Act as a Bluetooth peripheral to receive verification requests from users. Sign messages using private key verifying presence of user at a certain timestamp.
- Communicate messages to backend

## Prerequisites
- npm
- node

## Integrations

[Bleno](https://github.com/noble/bleno) - Act as Bluetooth peripheral

[Web3](https://github.com/ethereum/web3.js/) - Generate keypair

## Getting Started

1. Install requirements using `npm install`
1. Create the .env file: `cp .env.example .env`
1. Run using `node geo-node`

## Usage

Connect to the Geo Node by running the [Geo User Client](https://github.com/XYOracleNetwork/geo-user-client) on an iOS or Android device. Then, when in proximity of the device running Geo Node, the device will be discovered and you may connect to generate a signature.

Geo Node posts checkins to a [Geo Server](https://github.com/XYOracleNetwork/geo-server) running at the url specified in the `.env` file. This can be a server run by the user running the Geo Node.
