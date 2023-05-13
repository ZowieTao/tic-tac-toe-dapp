// SPDX-License-Identifier: MIT

pragma solidity >=0.4.26 <0.9.0;

contract ChangeStateInput {
  // variable
  string stateInput;

  function set(string memory v) public {
    stateInput = v;
  }

  function get() public view returns (string memory) {
    return stateInput;
  }
}
