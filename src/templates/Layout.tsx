import React from 'react'
import styled from 'styled-components'
import { ScroolButton, Spacer, Button } from '../components/index'

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

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Spacer size={40} />
      <header>
        <div className="container">
          <Wrapper>
            <Button>4NZI</Button>
            <nav>
              <ul>
                <li>
                  <ScroolButton text="about" />
                </li>
                <li>
                  <ScroolButton text="hello" />
                </li>
              </ul>
            </nav>
          </Wrapper>
        </div>
      </header>
      <Spacer size={20} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer>
        <p>© 2022 4NZI / ALL RIGHTS RESERVED</p>
      </Footer>
    </>
  )
}

export default Layout
