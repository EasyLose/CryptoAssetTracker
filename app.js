require('dotenv').config();
const ethers = require('ethers');

const assetContractABI = [/* ABI JSON here */];
const assetContractAddress = process.env.CONTRACT_ADDRESS;

let blockchainProvider;
try {
    blockchainProvider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
} catch (error) {
    console.error("Failed to connect to the blockchain provider: ", error);
    process.exit(1); 
}

let assetManagerWallet;
try {
    assetManagerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, blockchainProvider);
} catch (error) {
    console.error("Failed to create wallet from private key: ", error);
    process.exit(1); 
}

let assetContract;
try {
    assetContract = new ethers.Contract(assetContractAddress, assetContractABI, assetManagerWallet);
} catch (error) {
    console.error("Failed to initialize contract: ", error);
    process.exit(1); 
}

async function createNewAsset(assetId, ownerAddress) {
    try {
        const transaction = await assetContract.createAsset(assetId, ownerAddress);
        await transaction.wait();
        console.log(`Asset created with ID: ${assetId}, for owner: ${ownerAddress}`);
    } catch (error) {
        console.error("Error creating asset: ", error);
    }
}

async function transferOwnershipOfAsset(assetId, newOwnerAddress) {
    try {
        const transaction = await assetContract.transferAsset(assetId, newOwnerAddress);
        await transaction.wait();
        console.log(`Asset with ID: ${assetId} transferred to new owner: ${newOwnerAddress}`);
    } catch (error) {
        console.error("Error transferring asset: ", error);
    }
}

async function retrieveAssetHistory(assetId) {
    try {
        const assetHistory = await assetContract.getAssetHistory(assetId);
        console.log(`History for asset ID ${assetId}: `, assetHistory);
    } catch (error) {
        console.error("Error fetching asset history: ", error);
    }
}

module.exports = { createNewAsset, transferOwnershipOfAsset, retrieveAssetHistory };