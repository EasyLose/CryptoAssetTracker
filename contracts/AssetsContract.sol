// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalAssetTracker {
    struct Asset {
        uint256 id;
        string name;
        address owner;
        uint256 creationTime;
    }

    event AssetRegistered(uint256 indexed id, string name, address indexed owner);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);
    event AssetNameUpdated(uint256 indexed id, string oldName, string newName);
    event AssetInteraction(uint256 indexed id, string interactionType, address indexed interactedBy);

    uint256 private assetCounter;
    mapping(uint256 => Asset) private assets;
    mapping(uint256 => address[]) private assetHistory;

    modifier onlyOwner(uint256 _assetId) {
        require(assets[_assetId].owner == msg.sender, "Caller is not the asset owner");
        _;
    }

    function registerAsset(string memory _name) public {
        uint256 newAssetId = ++assetCounter;
        assets[newAssetId] = Asset(newAssetId, _name, msg.sender, block.timestamp);
        assetHistory[newAssetId].push(msg.sender);
        emit AssetRegistered(newAssetId, _name, msg.sender);
        emit AssetInteraction(newAssetId, "Registered", msg.sender);
    }

    function transferOwnership(uint256 _assetId, address _newOwner) public onlyOwner(_assetId) {
        Asset storage asset = assets[_assetId];
        address previousOwner = asset.owner;
        asset.owner = _newOwner;
        assetHistory[_assetId].push(_newOwner);
        emit OwnershipTransferred(_assetId, previousOwner, _newOwner);
        emit AssetInteraction(_assetId, "Ownership Transferred", _newOwner);
    }

    function updateAssetName(uint256 _assetId, string memory _newName) public onlyOwner(_assetId) {
        Asset storage asset = assets[_assetId];
        string memory oldName = asset.name;
        asset.name = _newName;
        emit AssetNameUpdated(_assetId, oldName, _newName);
        emit AssetInteraction(_assetId, "Name Updated", msg.sender);
    }
    
    function getAssetById(uint256 _assetId) public view returns (Asset memory) {
        require(_assetId <= assetCounter && _assetId > 0, "Asset does not exist");
        return assets[_assetId];
    }

    function getAssetHistory(uint256 _assetId) public view returns (address[] memory) {
        require(_assetId <= assetCounter && _assetId > 0, "Asset does not exist");
        return assetHistory[_assetId];
    }
}