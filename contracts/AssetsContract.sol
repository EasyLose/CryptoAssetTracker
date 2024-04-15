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

    uint256 private assetCounter;
    mapping(uint256 => Asset) private assets;
    mapping(uint256 => address[]) private assetHistory;

    modifier onlyOwner(uint256 _assetId) {
        require(assets[_assetId].owner == msg.sender, "Caller is not the asset owner");
        _;
    }

    function registerAsset(string memory _name) public {
        assetCounter++;
        assets[assetCounter] = Asset(assetCounter, _name, msg.sender, block.timestamp);
        assetHistory[assetCounter].push(msg.sender);
        emit AssetRegistered(assetCounter, _name, msg.sender);
    }

    function transferOwnership(uint256 _assetId, address _newOwner) public onlyOwner(_assetId) {
        Asset storage asset = assets[_assetId];
        address previousOwner = asset.owner;
        asset.owner = _newOwner;
        assetHistory[_assetId].push(_newOwner);
        emit OwnershipTransferred(_assetId, previousOwner, _newOwner);
    }

    function getAssetById(uint256 _assetId) public view returns (Asset memory) {
        require(_assetId <= assetCounter, "Asset does not exist");
        return assets[_assetId];
    }

    function getAssetHistory(uint256 _assetId) public view returns (address[] memory) {
        return assetHistory[_assetId];
    }
}