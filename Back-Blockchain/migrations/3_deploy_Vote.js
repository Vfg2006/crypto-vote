var TokenERC20 = artifacts.require("./TokenERC20.sol");
var Vote = artifacts.require("./Vote.sol");

module.exports = function(deployer) {
	deployer.link (TokenERC20, Vote);
	deployer.deploy(Vote);
};
