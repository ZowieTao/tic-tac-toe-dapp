"use client"

import { useState } from "react"
import styled from "styled-components"
import Web3 from "web3"

import { ChangeStateInputAbi } from "../../abi/abis"

// Truffle Outputs post-migration process
const web3 = new Web3(Web3.givenProvider)
const contractAddr = "0x170420aB49da884293ef8d90383b4e0ebe0C1ba8"
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
    .then(() => console.log("web3CheckPromise url", web3Check._provider.url))

  // Read: Get data from our local blockchain
  const handleGet = async (e) => {
    e.preventDefault()
    const result = await ChangeState.methods.get().call()
    setGetState(result)
    console.log("get result", result)
  }

  // Write: Send data to our local blockchain
  const handleSet = async (e) => {
    e.preventDefault()
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const account = accounts[0]
      const gas = await ChangeState.methods.set(10).estimateGas()

      const result = await ChangeState.methods
        .set(10)
        .send({ from: account, gas })
      console.log("result", result)
    }
  }

  return (
    <InputBoxCon>
      <InputBox>
        <InputBoxItems>
          <Game />
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

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Game() {
  const _history = [
    [null, null, null, null, null, null, null, null, null],
    ["X", null, null, null, null, null, null, null, null],
    ["X", null, null, null, null, "O", null, null, null],
    ["X", "X", null, null, null, "O", null, null, null],
    ["X", "X", null, null, "O", "O", null, null, null],
    ["X", "X", null, null, "O", "O", null, "X", null],
  ]

  const [history, setHistory] = useState(_history ?? [Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(_history.length - 1)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to move #" + move
    } else {
      description = "Go to game start"
    }

    return (
      <li key={JSON.stringify(squares)}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  console.info("info", { history, currentMove, xIsNext, currentSquares })

  return (
    <GameComponent className="game">
      <GameBoard className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </GameBoard>
      <GameInfo className="game-info">
        <ol>{moves}</ol>
      </GameInfo>
    </GameComponent>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

export const GameComponent = styled.div`
  display: flex;
  justify-content: center;
`

export const GameBoard = styled.div`
  padding: 2rem;
  border-right: 1px solid #555555;
`
export const GameInfo = styled.div`
  padding: 2rem;
`
