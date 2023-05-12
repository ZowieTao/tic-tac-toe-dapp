"use client"

import { useState } from "react"
import Web3 from "web3"

import { changeStateInput } from "../abi/abis"

// Truffle Outputs post-migration process
const web3 = new Web3(Web3.givenProvider)
const contractAddr = "0x0"
const ChangeState = new web3.eth.Contract(changeStateInput, contractAddr)

interface WindowWithEthereum extends Window {
  ethereum?: any
}

declare const window: WindowWithEthereum

export default function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(0)
  const [getState, setGetState] = useState("click to refresh")

  // Check if a web3 instance is running on port :9545
  const web3Check = new Web3()
  web3Check.setProvider(
    new Web3.providers.WebsocketProvider("ws://localhost:9545"),
  )
  web3Check.eth.net
    .isListening()
    .then(() => {
      return console.log("connection is success")
    })
    .catch((error) => {
      return console.log("uh-oh... something went wrong here: ", error)
    })

  // Read: Get data from our local blockchain
  const handleGet = async (e) => {
    e.preventDefault()
    const result = await ChangeState.methods.get().call()
    setGetState(result)
    console.log(result)
  }

  // Write: Send data to our local blockchain
  const handleSet = async (e) => {
    e.preventDefault()
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.enable()
      const account = accounts[0]
      const gas = await ChangeState.methods.set(Math.random()).estimateGas()
      const result = await ChangeState.methods
        .set(state)
        .send({ from: account, gas })
      console.log(result)
    }
  }

  return (
    <>
      <div onClick={handleGet}>set</div>
      <div onClick={handleGet}>get</div>
      {children}
    </>
  )
}
