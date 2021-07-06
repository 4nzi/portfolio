import styled from 'styled-components'
import { Post } from '../templates'
import { POST } from '../types/Types'

/* --------------------- Style --------------------- */
const Wrapper = styled.ul`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); //responsive対応
  gap: 14px;
`
/* ------------------------------------------------- */

interface STATICPROPS {
  posts: POST[]
}

const PostList: React.VFC<STATICPROPS> = ({ posts }) => {
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
