"use client"

import { useState } from "react"
import styled from "styled-components"
import Web3 from "web3"

import { ChangeStateInputAbi } from "../../abi/abis"
import { ClickButton } from "../../components"

// Truffle Outputs post-migration process
const web3 = new Web3(Web3.givenProvider)
const contractAddr = "0xa7303281db1d0Af9Db6Fd46E41eb27C2b6C54128"
const ChangeState = new web3.eth.Contract(ChangeStateInputAbi, contractAddr)

interface WindowWithEthereum extends Window {
  ethereum?: any
}

declare const window: WindowWithEthereum

export default async function Home() {
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

  // Check the promise statement and confirm its 9545 on the port
  const web3CheckPromise = web3Check.eth.net
    .isListening()
    .then(() => console.log(web3Check._provider.url))

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
      const gas = await ChangeState.methods
        .set(Math.floor(Math.random() * 100))
        .estimateGas()
      const result = await ChangeState.methods
        .set(state)
        .send({ from: account, gas })
      console.log(result)
    }
  }

  return (
    <InputBoxCon>
      <InputBox>
        <InputBoxItems>
          <h1>zowie</h1>
          <ClickButton onClick={handleSet}>set</ClickButton>
          <ClickButton onClick={handleGet}>get</ClickButton>
          <ClickButton onClick={handleGet}>{getState}</ClickButton>
        </InputBoxItems>
      </InputBox>
    </InputBoxCon>
  )
}

export const InputBoxCon = styled.div`
  width: 100%;
  height: 100vh;
`

export const InputBox = styled.div`
  background-color: #5cb3ff;
  color: #ffffff;
  width: 60%;
  height: 250px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
`

export const InputBoxItems = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: relative;
`
