import styled from 'styled-components'
import { BaseStyle, ColorStyle, BoxStyle } from './style'

const Button = styled.button<{ sType?: string }>`
  ${(props) => !props.sType && BaseStyle};
  ${(props) => props.sType === 'color' && ColorStyle};
  ${(props) => props.sType === 'box' && BoxStyle};
`

export default Button
