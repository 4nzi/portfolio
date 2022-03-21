import React from 'react'

const Spacer = ({ size = 0, style = {}, ...delegated }) => {
  return (
    <span
      style={{
        display: 'block',
        minHeight: size,
        ...style,
      }}
      {...delegated}
    />
  )
}
export default Spacer
