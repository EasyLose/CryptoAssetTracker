require('dotenv').config();
const ethers = require('ethers');

const contractABI = [ /* ABI JSON here */ ];
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function createAsset(assetId, ownerAddress) {
    try {
        let txn = await contract.createAsset(assetId, ownerAddress);
        await txn.wait();
        console.log(`Asset created with ID: ${assetId}, for owner: ${ownerAddress}`);
    } catch (error) {
        console.error("Error creating asset: ", error);
    }
}

async function transferAsset(assetId, newOwnerAddress) {
    try {
        let txn = await contract.transferAsset(assetId, newOwnerAddress);
        await txn.wait();
        console.log(`Asset with ID: ${assetId} transferred to new owner: ${newOwnerAddress}`);
    } catch (error) {
        console.error("Error transferring asset: ", error);
    }
}

async function fetchAssetHistory(assetId) {
    try {
        let history = await contract.getAssetHistory(assetId);
        console.log(`History for asset ID ${assetId}: `, history);
    } catch (error) {
        console.error("Error fetching asset history: ", error);
    }
}

/*
createAsset('1', '0x...');
transferAsset('1', '0x...');
fetchAssetHistory('1');
*/