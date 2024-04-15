const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_API_KEY;
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "*",       
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3,         
      gas: 5500000,          
      confirmations: 2,      
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