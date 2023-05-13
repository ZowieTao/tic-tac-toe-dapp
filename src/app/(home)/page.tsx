"use client"

import { useMemo, useState } from "react"
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
  // // Check if a web3 instance is running on port :9545
  // const web3Check = new Web3()
  // web3Check.setProvider(
  //   new Web3.providers.WebsocketProvider("ws://localhost:9545"),
  // )
  // web3Check.eth.net
  //   .isListening()
  //   .then(() => {
  //     return console.log("connection is success")
  //   })
  //   .catch((error) => {
  //     return console.log("uh-oh... something went wrong here: ", error)
  //   })

  // // Check the promise statement and confirm its 9545 on the port
  // const web3CheckPromise = web3Check.eth.net
  //   .isListening()
  //   // ts-ignore
  //   .then(() => console.log("web3CheckPromise url", web3Check._provider.url))

  // // Read: Get data from our local blockchain
  // const handleGet = async (e) => {
  //   e.preventDefault()
  //   const result = await ChangeState.methods.get().call()
  //   console.log("gerResult", result)
  // }

  // // Write: Send data to our local blockchain
  // const handleSet = async (e) => {
  //   e.preventDefault()
  //   if (typeof window.ethereum !== "undefined") {
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     })

  //     const account = accounts[0]
  //     const gas = await ChangeState.methods.set(10).estimateGas()

  //     const result = await ChangeState.methods
  //       .set(10)
  //       .send({ from: account, gas })
  //     console.log("result", result)
  //   }
  // }

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
  const Cell = styled.div`
    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1976d2;
      cursor: pointer;
    }

    &:active,
    &:focus {
      background-color: #1565c0;
      outline: none;
    }
  `

  return (
    <Cell className="square" onClick={onSquareClick}>
      {value}
    </Cell>
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

  const winner = useMemo(() => {
    return calculateWinner(squares)
  }, [squares])

  const status = useMemo(() => {
    return winner
      ? "Winner: " + winner
      : "Next player: " + (xIsNext ? "X" : "O")
  }, [winner, xIsNext])

  const StatusContainer = styled.div`
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  `

  const BoardContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 10px;
  `

  const BoardRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px; /* 间距大小 */
  `

  return (
    <>
      <StatusContainer className="status">{status}</StatusContainer>
      <BoardContainer>
        {[0, 1, 2].map((parentVal) => {
          const startCount = parentVal * 3

          return (
            <BoardRow className="board-row" key={parentVal}>
              {[startCount, startCount + 1, startCount + 2].map((val) => {
                return (
                  <Square
                    key={val}
                    value={squares[val]}
                    onSquareClick={() => handleClick(val)}
                  />
                )
              })}
            </BoardRow>
          )
        })}
      </BoardContainer>
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
      <div
        key={JSON.stringify(squares)}
        style={{ display: "flex", paddingBottom: "5px" }}
      >
        <Button onClick={() => jumpTo(move)}>{description}</Button>
      </div>
    )
  })

  const MovesContainer = styled.div`
    height: 8rem;
    overflow: scroll;
    padding: 0.8rem;
  `
  console.info("info", { history, currentMove, xIsNext, currentSquares })

  return (
    <GameComponent className="game">
      <GameBoard className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </GameBoard>
      <GameInfo className="game-info">
        <MovesContainer>{moves}</MovesContainer>
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
  padding: 1rem;
  border-right: 1px solid #555555;
  display: flex;
  flex-direction: column;
`
export const GameInfo = styled.div`
  padding: 1rem;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`
