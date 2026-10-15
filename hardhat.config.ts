import { defineConfig } from "hardhat/config";
import hardhatMocha from "@nomicfoundation/hardhat-mocha";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatChaiMatchers from "@nomicfoundation/hardhat-ethers-chai-matchers";

export default defineConfig({
  plugins: [
    hardhatMocha,
    hardhatEthers,
    hardhatChaiMatchers,
  ],
  solidity: "0.8.20",
});