import React from 'react'
import styled from 'styled-components'
import { POST } from '../types'

/* --------------------- Style --------------------- */
const Wapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 100%; //比率//
`
const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const MaskText = styled.h4`
  opacity: 0;
  font-size: 1.6rem;
  text-align: center;
  padding-top: 100px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute; /* 絶対位置指定 */
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4); /* マスクは半透明 */
  transition: all 0.2s ease;
  //hover
  &:hover {
    opacity: 1;
  }
`
/* ------------------------------------------------- */

const Post: React.VFC<POST> = ({ id, thum, title }) => {
  return (
    <a href={`/posts/${id}`}>
      <Wapper>
        <Image src={thum} />
        <MaskText>{title}</MaskText>
      </Wapper>
    </a>
  )
}

export default Post
