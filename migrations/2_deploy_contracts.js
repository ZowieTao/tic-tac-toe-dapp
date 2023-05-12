var ChangeStateInput = artifact.require("../contracts/ChangeStateInput.sol")

module.exports = function (deployer) {
  deployer.deploy(ChangeStateInput)
}
