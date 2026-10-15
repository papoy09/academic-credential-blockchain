import { expect } from "chai";
import { network } from "hardhat";

describe("CredentialRegistry", function () {
  let registry: any, institusi: any, lulusan: any, verifier: any;
  let ethers: any;

  // Koneksi dibuat SEKALI di sini, di dalam blok before
  before(async function () {
    const connection = await network.create();
    ethers = connection.ethers;
  });

  beforeEach(async function () {
    [institusi, lulusan, verifier] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory("CredentialRegistry");
    registry = await Registry.deploy();
    await registry.waitForDeployment();
    await registry.setIssuer(institusi.address, true);
  });

  it("T-01: Issue credential oleh issuer terdaftar", async function () {
    const id = ethers.id("CR-001");
    await expect(
      registry.connect(institusi).issueCredential(id, lulusan.address, "QmHash...")
    ).to.emit(registry, "CredentialIssued");
  });

  it("T-02: Issue credential oleh non-issuer harus revert", async function () {
    const id = ethers.id("CR-002");
    await expect(
      registry.connect(verifier).issueCredential(id, lulusan.address, "QmHash...")
    ).to.be.revertedWith("Not authorized");
  });

  it("T-03: Verify credential valid mengembalikan true", async function () {
    const id = ethers.id("CR-003");
    await registry.connect(institusi).issueCredential(id, lulusan.address, "QmHash...");
    expect(await registry.verifyCredential(id)).to.equal(true);
  });

  it("T-04: Verify credential revoked mengembalikan false", async function () {
    const id = ethers.id("CR-004");
    await registry.connect(institusi).issueCredential(id, lulusan.address, "QmHash...");
    await registry.connect(institusi).revokeCredential(id);
    expect(await registry.verifyCredential(id)).to.equal(false);
  });
});