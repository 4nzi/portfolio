import React from 'react'
import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Wrapper = styled.h2`
  border-bottom: 1px solid #7a7a7a;
  margin-bottom: 30px;
  padding-bottom: 10px;
  letter-spacing: 2px;
  text-transform: capitalize;
`
/* ------------------------------------------------- */
interface PROPS {
  margin: boolean
  title: string
}

const Section: React.VFC<PROPS> = ({ title }) => {
  return <Wrapper id={title}>{title}</Wrapper>
}

export default Section
