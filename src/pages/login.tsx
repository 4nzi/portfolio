import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookie from 'universal-cookie'
import { Input, Label, Button } from '../components/index'

import { useMutateAuth } from '../hooks/useMutateAuth'
import { useValidate } from '../hooks/useValidate'

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
  const router = useRouter()
  const cookie = new Cookie()
  const { loginMutation } = useMutateAuth()
  const { required } = useValidate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('maunted')
    if (cookie.get('access_token')) {
      router.push('/admin')
    }
  }, [])

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const isBlank = required(username, password)
    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else {
      loginMutation.mutate({ username: username, password: password })
      setUsername('')
      setPassword('')
    }
  }

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
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className="password">
          <Label>PASSWORD</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
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
