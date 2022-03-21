import React from 'react'
import styled from 'styled-components'
import { Tool } from '../components/index'

/* --------------------- Style --------------------- */
const Wapper = styled.div`
  > P {
    padding-bottom: 10px;
  }
  > h4 {
    color: #909090;
    font-size: 1.2rem;
    display: inline-block;
    /* border-bottom: 1px solid rgb(140, 130, 115); */
    margin-bottom: 10px;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin-top: 20px;
  }
`
/* ------------------------------------------------- */

const About: React.VFC = () => {
  return (
    <Wapper>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <p>
        It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
      <h4>Tools:</h4>
      <div>
        <Tool name="Cinema 4D" src="/tools/c4d.png" />
        <Tool name="Blender" src="/tools/bl.png" />
        <Tool name="ZBrush" src="/tools/zb.png" />
        <Tool name="Substance Painter" src="/tools/sp.png" />
        <Tool name="Redshift Render" src="/tools/rs.png" />
        <Tool name="Octane Render" src="/tools/or.png" />
        <Tool name="Unreal Engine" src="/tools/ue.png" />
        <Tool name="After Effects" src="/tools/ae.png" />
        <Tool name="Photoshop" src="/tools/ps.png" />
      </div>
    </Wapper>
  )
}

export default About
