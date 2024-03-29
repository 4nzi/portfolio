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
  title: string
}

const Section: React.VFC<PROPS> = ({ title }) => {
  const ConvertToLowerCase = title.toLowerCase()
  return <Wrapper id={ConvertToLowerCase} >{title}</Wrapper>
}

export default Section
