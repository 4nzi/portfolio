import React from 'react'
import styled from 'styled-components'
import { Tool } from '../components/index'
import { c4d, bl, zb, sp, rs, or, ue, ae, ps } from '../images/tools/index'

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
        <Tool name="Cinema 4D" src={c4d} />
        <Tool name="Blender" src={bl} />
        <Tool name="ZBrush" src={zb} />
        <Tool name="Substance Painter" src={sp} />
        <Tool name="Redshift Render" src={rs} />
        <Tool name="Octane Render" src={or} />
        <Tool name="Unreal Engine" src={ue} />
        <Tool name="After Effects" src={ae} />
        <Tool name="Photoshop" src={ps} />
      </div>
    </Wapper>
  )
}

export default About
