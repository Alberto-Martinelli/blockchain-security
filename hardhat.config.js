require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {}, // Default in-memory network
    localhost: {
      url: "http://127.0.0.1:8545", // Explicitly use localhost
    },
  },
  solidity: "0.8.28",
};
