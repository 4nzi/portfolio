import styled from 'styled-components'
import Link from 'next/link'
import { BaseStyle } from './style'
import { LinkProps } from 'next/link'

const Wrapper = styled.div`
  ${BaseStyle};
`

const LinkButton: React.FC<LinkProps> = (props) => {
  return (
    <Wrapper>
      <Link {...props}></Link>
    </Wrapper>
  )
}

export default LinkButton
