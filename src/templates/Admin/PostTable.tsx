import styled from 'styled-components'
import { useQueryPosts } from '../../hooks/useQueryPosts'
import { useMutatePost } from '../../hooks/useMutatePost'

/* --------------------- Style --------------------- */
const Wrapper = styled.tbody`
  border: solid 1px #575757;
  font-size: 1.2rem;
  table-layout: fixed;
  width: 100%;
  > tr {
    border-bottom: solid 1px #575757;
    > th {
      padding: 15px 20px;
      color: #797979;
    }
    > .top {
      width: 60%;
    }
    > .del {
      width: 10%;
    }
    > td {
      height: 84px;
      padding: 15px 20px;
    }
    > .image {
      display: flex;
      padding: 10px 20px;

      > img {
        height: 100%;
      }
      > p {
        margin-left: 12px;
        font-size: 1.2rem;
        color: white;
      }
    }
  }
`
const Title = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 25px;
`
/* ------------------------------------------------- */

const PostTable: React.VFC = () => {
  const { status, data } = useQueryPosts()
  const { deletePostMutation } = useMutatePost()

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>'Error'</p>
  return (
    <>
      <Title>投稿一覧</Title>
      <table>
        <Wrapper>
          <tr>
            <th className="top">投稿リスト</th>
            <th>画像数</th>
            <th>作成日</th>
            <th className="del"></th>
          </tr>
          {data?.map((post) => (
            <tr key={post.id}>
              <td className="image">
                <img src={post.thum} alt={post.title} />
                <p>{post.title}</p>
              </td>
              <td>{post.images.length}</td>
              <td>{post.created_on}</td>
              <td>
                <button
                  onClick={() => {
                    deletePostMutation.mutate(post.id)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width="18px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </Wrapper>
      </table>
    </>
  )
}
export default PostTable
