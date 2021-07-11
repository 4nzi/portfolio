import { GetStaticProps } from 'next'
import { Layout, About, Hello, PostList } from '../templates/index'
import { Section, Spacer } from '../components/index'
import { POST } from '../types/Types'

import { QueryClient, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getPosts } from '../hooks/useQueryPosts'

interface STATICPROPS {
  posts: POST[]
}

const Home: React.VFC<STATICPROPS> = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<POST[]>('posts')
  return (
    <Layout title="Home">
      <div className="container">
        <PostList posts={data} />
        <Spacer axis="vertical" size={90} />
        <Section title="About" margin={true} />
        <About />
        <Spacer axis="vertical" size={90} />
        <Section title="Hello" margin={true} />
        <Hello />
      </div>
    </Layout>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', getPosts)
  return {
    props: {
      dehydratedPosts: dehydrate(queryClient),
    },
    revalidate: 10,
  }
}
