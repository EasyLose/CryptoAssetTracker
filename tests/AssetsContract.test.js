const AssetsContract = artifacts.require("AssetsContract");

contract("AssetsContract", (accounts) => {
  const [admin, user1, user2] = accounts;

  beforeEach(async function () {
    this.instance = await AssetsContract.new({ from: admin });
  });

  async function registerAsset(name, fromAccount) {
    await this.instance.registerAsset(name, { from: fromAccount });
  }

  async function checkOwnership(assetId, expectedOwner) {
    const assetOwner = await this.instance.ownerOf(assetId);
    assert.equal(assetOwner, expectedOwner, "Ownership does not match expected owner.");
  }

  it("should allow asset registration by the admin", async function () {
    await registerAsset.call(this, "Asset1", admin);
    await checkOwnership.call(this, 1, admin);
  });

  it("should not allow asset registration by non-admin users", async function () {
    try {
      await registerAsset.call(this, "Asset2", user1);
      assert.fail("Non-admin was able to register an asset.");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert not found: " + error.message);
    }
  });

  it("should allow ownership transfer of an asset from the owner to another account", async function () {
    await registerAsset.call(this, "Asset3", admin);
    await this.instance.transferOwnership(1, user1, { from: admin });
    await checkOwnership.call(this, 1, user1);
  });
});