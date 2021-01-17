var Main = artifacts.require("../contracts/Main.sol");

module.exports = (deployer) => {
  deployer.deploy(Main);
};
