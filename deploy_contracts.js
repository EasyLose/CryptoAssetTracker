const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const walletMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", 
    },
    ropsten: {
      provider: () => new HDWalletProvider(walletMnemonic, `https://ropsten.infura.io/v3/${infuraApiKey}`),
      network_id: 3, 
      gasLimit: 5500000, 
      confirmationsRequired: 2, 
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0", 
    }
  }
};