"use client"

import styled from "styled-components"

export default async function Home() {
  return (
    <InputBoxCon>
      <InputBox>
        <InputBoxItems>
          <h1>zowie</h1>
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
