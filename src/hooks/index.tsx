// Truffle Outputs post-migration process
import { useRef } from "react"
import Web3 from "web3"

import { ChangeStateInputAbi } from "../abi/abis"

const web3 = new Web3(Web3.givenProvider)
const contractAddr = "0x170420aB49da884293ef8d90383b4e0ebe0C1ba8"

interface WindowWithEthereum extends Window {
  ethereum?: any
}

const ChangeState = new web3.eth.Contract(ChangeStateInputAbi, contractAddr)

declare const window: WindowWithEthereum

export const useHandleInit = () => {
  const initialized = useRef(false)
  // Check if a web3 instance is running on port :9545
  const web3Check = new Web3()

  web3Check.setProvider(
    new Web3.providers.WebsocketProvider("ws://localhost:9545"),
  )

  web3Check.eth.net
    .isListening()
    .then(() => {
      initialized.current = true

      return console.log("connection is success")
    })
    .catch((error) => {
      initialized.current = false

      return console.log("uh-oh... something went wrong here: ", error)
    })

  // Check the promise statement and confirm its 9545 on the port
  web3Check.eth.net
    .isListening()
    .then(() => {
      // eslint-disable-next-line
      // @ts-ignore
      console.log("web3CheckPromise url", web3Check._provider.url)
    })
    .catch((err) => {
      console.error("err:", err)
    })

  // Read: Get data from our local blockchain
  const handleGet = async () => {
    const result = await ChangeState.methods.get().call()

    return JSON.parse(result)
  }

  // Write: Send data to our local blockchain
  const handleSet = async (val: any) => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const account = accounts[0]

      const gas = await ChangeState.methods
        .set(JSON.stringify(val))
        .estimateGas()

      const result = await ChangeState.methods
        .set(JSON.stringify(val))
        .send({ from: account, gas })
      console.log("result", result)
    }
  }

  return { handleGet, handleSet, initialized }
}
