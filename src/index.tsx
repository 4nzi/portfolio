import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './GlobalStyle'
import { Layout, About, PostList, Hello } from './templates'
import { Section, Spacer } from './components/index'

const App: React.VFC = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <PostList />
        <Spacer size={90} />
        <Section title="About" />
        <About />
        <Spacer size={90} />
        <Section title="Hello" />
        <Hello />
      </Layout>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
