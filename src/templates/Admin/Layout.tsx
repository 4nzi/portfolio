import styled from 'styled-components'
import Head from 'next/head'
import Cookie from 'universal-cookie'
import { LinkButton, Button, Spacer } from '../../components/index'

import { useAtom } from 'jotai'
import { isLogin } from '../../store/atoms'

/* --------------------- Style --------------------- */
const Header = styled.header`
  background-color: #1083b4;
`
const Contaier = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  gap: 2rem;
  > nav {
    font-size: 1.4rem;
    > ul {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
`
const Footer = styled.footer`
  margin-top: 40px;
  padding-bottom: 40px;
  > p {
    border-top: 2px solid rgba(144, 130, 109, 0.2);
    color: #999;
    padding: 20px 0px;
    font-size: 1rem;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto;
  }
`
/* ------------------------------------------------- */

interface PROPS {
  title: string
}

const Layout: React.FC<PROPS> = ({ children, title = 'Default title' }) => {
  const cookie = new Cookie()
  const [, setLogin] = useAtom(isLogin)

  const logout = () => {
    cookie.remove('access_token')
    setLogin(false)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header>
        <Contaier>
          <Wrapper>
            <h1>管理ページ</h1>
            <nav>
              <ul>
                <li>
                  <LinkButton href="/">サイトに戻る</LinkButton>
                </li>
                <li>
                  <Button onClick={logout}>ログアウト</Button>
                </li>
              </ul>
            </nav>
          </Wrapper>
        </Contaier>
      </Header>
      <Spacer axis="vertical" size={30} />
      <main>{children}</main>
      <Footer>
        <p>© 2021 ANZI / ALL RIGHTS RESERVED</p>
      </Footer>
    </>
  )
}
export default Layout
