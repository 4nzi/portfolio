import styled from 'styled-components'
import Link from 'next/link'
import { Input, Label, Button } from '../components/index'
import { useLogin } from '../hooks/useLogin'

/* --------------------- Style --------------------- */
const Contaier = styled.div`
  margin: 0 auto;
  max-width: 474px;
  height: 377px;
  padding: 0 20px 0 20px;
  > h1 {
    text-align: center;
    padding-bottom: 11.5px;
    margin: 50px 0 25px;
    font-size: 4.2rem;
  }
`
const Wrapper = styled.form`
  padding: 20px;
  background-color: #222;
  > .name {
    margin-bottom: 15px;
  }
  > .password {
    margin-bottom: 30px;
  }
  > .submit {
    text-align: center;
    margin-bottom: 20px;
  }
  > span {
    color: #13aff0;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.15s ease;
    &:hover {
      color: #1083b4;
    }
  }
`
/* ------------------------------------------------- */

const Login: React.VFC = () => {
  const {
    username,
    password,
    userChangeHandler,
    passChangeHandler,
    submitHandler,
  } = useLogin()

  return (
    <Contaier>
      <h1>Login</h1>
      <Wrapper>
        <div className="name">
          <Label>NAME</Label>
          <Input
            type="text"
            placeholder="Name"
            value={username}
            onChange={userChangeHandler}
          />
        </div>
        <div className="password">
          <Label>PASSWORD</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={passChangeHandler}
          />
        </div>
        <div className="submit">
          <Button sType="box" onClick={submitHandler}>
            ログイン
          </Button>
        </div>
        <Link href="/">
          <span>Back to site</span>
        </Link>
      </Wrapper>
    </Contaier>
  )
}
export default Login
