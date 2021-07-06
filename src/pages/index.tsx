import { GetStaticProps } from 'next'
import { Layout, About, Hello, PostList } from '../templates/index'
import { Section, Spacer } from '../components/index'
import { POST } from '../types/Types'

import { getAllPostsData } from '../lib/fetch'

interface STATICPROPS {
  posts: POST[]
}

const Home: React.VFC<STATICPROPS> = ({ posts }) => {
  return (
    <Layout title="Home">
      <div className="container">
        <PostList posts={posts} />
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

/* pre-fetched */
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData()
  return {
    props: { posts },
    revalidate: 10, //ISR
  }
}
