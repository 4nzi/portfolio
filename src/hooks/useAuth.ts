import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { useValidate } from './useValidate'

export const useAuth = () => {
  const router = useRouter()
  const cookie = new Cookie()
  const { required } = useValidate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('maunted')
    if (cookie.get('access_token')) {
      router.push('/admin')
    }
  }, [])

  const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const passChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const useMutatAuth = useMutation(
    () =>
      axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/jwt/create`, {
        username: username,
        password: password,
      }),
    {
      onSuccess: (res) => {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        router.push('/admin')
      },
      onError: () => {
        alert('ユーザーネームまたはパスワードが異なります。')
      },
    }
  )

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const isBlank = required(username, password)
    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else {
      useMutatAuth.mutate()
      setUsername('')
      setPassword('')
    }
  }

  return {
    username,
    password,
    userChangeHandler,
    passChangeHandler,
    submitHandler,
  }
}
