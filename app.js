require('dotenv').config();
const ethers = require('ethers');

const assetContractABI = [/* ABI JSON here */];
const assetContractAddress = process.env.CONTRACT_ADDRESS;

let blockchainProvider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
let assetManagerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, blockchainProvider);
let assetContract = new ethers.Contract(assetContractAddress, assetContractABI, assetManagerWallet);

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