import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const Registry = await ethers.getContractFactory("CredentialRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  console.log("CredentialRegistry deployed to:", await registry.getAddress());

  const [institusi] = await ethers.getSigners();
  await registry.setIssuer(institusi.address, true);
  console.log("Issuer terdaftar:", institusi.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});