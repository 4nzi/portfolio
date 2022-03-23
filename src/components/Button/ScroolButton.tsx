import React from 'react'
import styled from 'styled-components'
import { Link as Scroll } from 'react-scroll'
import { BaseStyle } from './style'

const StyledButton = styled(Scroll)`
  ${BaseStyle};
`

interface PROPS {
  text: string
}

const LinkButton: React.VFC<PROPS> = ({ text }) => {
  const ConvertToLowerCase = text.toLowerCase()
  return (
    <StyledButton to={ConvertToLowerCase} smooth={true}>
      {text}
    </StyledButton>
  )
}

export default LinkButton
