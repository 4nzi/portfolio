import React from 'react'
import styled from 'styled-components'
import { Post } from '../components'
import { posts } from '../lib/posts'

/* --------------------- Style --------------------- */
const Wrapper = styled.ul`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); //responsive対応
  gap: 14px;
`
/* ------------------------------------------------- */

const PostList: React.VFC = () => {
  return (
    <Wrapper id="work">
      {posts.map((post) => (
        <li key={post.id}>
          <Post {...post} />
        </li>
      ))}
    </Wrapper>
  )
}

export default PostList
