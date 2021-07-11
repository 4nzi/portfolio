import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Layout } from '../../templates/index'
import { Section, LinkButton } from '../../components/index'
import { POST } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next' //type

import { getPostIds, getPost } from '../../hooks/useQueryPosts'
import { QueryClient, useQueryClient } from 'react-query'

/* --------------------- Style --------------------- */
const Wrapper = styled.ul`
  > li {
    > P {
      text-align: center;
      padding: 5px 0 15px 0;
    }
  }
  > div {
    margin-top: 20px;
    text-align: center;
  }
`
const Image = styled.img`
  width: 100%;
`
/* ------------------------------------------------- */

const PostDetail: React.VFC<POST> = ({ title, images }) => {
  const router = useRouter()

  if (router.isFallback || !title) {
    return <h1>Loading...</h1>
  }
  return (
    <Layout title={title}>
      <div className="container">
        <Section margin={false} title={title}></Section>
        <Wrapper>
          {images.map((image) => (
            <li key={image.id}>
              <Image src={image.file} alt={image.caption} />
              <p>{image.caption}</p>
            </li>
          ))}
          <LinkButton href="/">Back</LinkButton>
        </Wrapper>
      </div>
    </Layout>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds()
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPost(ctx.params.id as string)
  return {
    props: { ...post },
    revalidate: 10, //ISR
  }
}
