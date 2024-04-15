const AssetsContract = artifacts.require("AssetsContract");

contract("AssetsContract", (accounts) => {
  const [admin, user1, user2] = accounts;

  beforeEach(async function () {
    this.instance = await AssetsContract.new({ from: admin });
  });

  it("should allow asset registration by the admin", async function () {
    await this.instance.registerAsset("Asset1", { from: admin });
    const assetOwner = await this.instance.ownerOf(1);
    assert.equal(assetOwner, admin, "The asset was not registered successfully by the admin.");
  });

  it("should not allow asset registration by non-admin users", async function () {
    try {
      await this.instance.registerAsset("Asset2", { from: user1 });
      assert.fail("Non-admin was able to register an asset.");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert not found: " + error.message);
    }
  });

  it("should allow ownership transfer of an asset from the owner to another account", async function () {
    await this.instance.registerAsset("Asset3", { from: admin });
    await this.instance.transferOwnership(1, user1, { from: admin });
    const newOwner = await this.instance.ownerOf(1);
    assert.equal(newOwner, user1, "Ownership was not transferred correctly.");
  });

  it("should not allow ownership transfer of an asset by a non-owner account", async function () {
    await this.instance.registerAsset("Asset4", { from: admin });
    try {
      await this.instance.transferOwnership(1, user2, { from: user1 });
      assert.fail("Ownership was transferred by a non-owner.");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert not found: " + error.message);
    }
  });

  it("should ensure only the asset owner can grant access to another account", async function () {
    await this.instance.registerAsset("Asset5", { from: admin });
    await this.instance.grantAccess(1, user1, { from: admin });
    const hasAccess = await this.instance.hasAccess(1, user1);
    assert.equal(hasAccess, true, "Access was not granted correctly by the asset owner.");
  });

  it("should ensure non-asset owners cannot grant access", async function () {
    await this.instance.registerAsset("Asset6", { from: admin });
    try {
      await this.instance.grantAccess(1, user2, { from: user1 });
      assert.fail("Non-owner was able to grant access.");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert not found: " + error.message);
    }
  });

  it("should allow asset owners to revoke access", async function () {
    await this.instance.registerAsset("Asset7", { from: admin });
    await this.instance.grantAccess(1, user1, { from: admin });
    await this.instance.revokeAccess(1, user1, { from: admin });
    const hasAccess = await this.instance.hasAccess(1, user1);
    assert.equal(hasAccess, false, "Access was not revoked correctly by the asset owner.");
  });

  it("should ensure non-asset owners cannot revoke access", async function () {
    await this.instance.registerAsset("Asset8", { from: admin });
    await this.instance.grantAccess(1, user1, { from: admin });
    try {
      await this.instance.revokeAccess(1, user1, { from: user2 });
      assert.fail("Non-owner was able to revoke access.");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert not found: " + error.message);
    }
  });
});