var TokenERC20 = artifacts.require("./TokenERC20.sol");
var Vote = artifacts.require("./Vote.sol");

module.exports = function(deployer) {

	deployer.deploy(TokenERC20, 1000000, "Vote", "CPT");
	deployer.link(TokenERC20, Vote);
	deployer.deploy(Vote);
};
