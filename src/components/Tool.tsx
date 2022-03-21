import React from 'react'
import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  font-size: 1.3rem;
  margin-left: 0.3125rem;
  margin-right: 0.3125rem;
  margin-bottom: 0.625rem;
  font-weight: 500;
  display: inline-block;
  border: solid 0.0525rem rgb(140, 130, 115);
  padding: 0.575rem 0.6375rem;
  border-radius: 0.125rem;
  background-color: #222526;
  > div {
    vertical-align: middle;
  }
  > span {
    padding-left: 5px;
    vertical-align: middle;
  }
`
/* ------------------------------------------------- */

interface PROPS {
  name: string
  src: string
}

const Tool: React.VFC<PROPS> = ({ name, src }) => {
  return (
    <Wrapper>
      <img src={src} width={17} height={17} />
      <span>{name}</span>
    </Wrapper>
  )
}

export default Tool
