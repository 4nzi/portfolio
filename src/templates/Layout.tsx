import styled from 'styled-components'
import Head from 'next/head'
import { LinkButton, Spacer } from '../components/index'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  > nav {
    @media (max-width: 1000px) {
      /* display: none; */
    }
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
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Spacer axis="vertical" size={40} />
      <header>
        <div className="container">
          <Wrapper>
            <LinkButton href="/#top">4NZI</LinkButton>
            <nav>
              <ul>
                <li>
                  <LinkButton data-testid="nav-bar" href="/#about">
                    about
                  </LinkButton>
                </li>
                <li>
                  <LinkButton href="/#hello">hello</LinkButton>
                </li>
                <li>
                  <LinkButton href="/admin">admin</LinkButton>
                </li>
              </ul>
            </nav>
          </Wrapper>
        </div>
      </header>
      <Spacer axis="vertical" size={20} />
      <main>{children}</main>
      <Footer>
        <p>© 2021 ANZI / ALL RIGHTS RESERVED</p>
      </Footer>
    </>
  )
}

export default Layout
