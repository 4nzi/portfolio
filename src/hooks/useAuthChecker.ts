import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'

import { useAtom } from 'jotai'
import { isLogin } from '../store/atoms'

export const useAuthChecker = () => {
  const router = useRouter()
  const cookie = new Cookie()
  const token = cookie.get('access_token')

  const [isLoading, setLoading] = useState(true)
  const [login, setLogin] = useAtom(isLogin)

  const getIsAuthenticated = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/jwt/verify/`,
        {
          token: `${token}`,
        }
      )
      return true
    } catch (err) {
      return false
    }
  }

  useEffect(() => {
    getIsAuthenticated().then((auth) => {
      setLogin(auth)
      if (!auth) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    })
  }, [login])

  return {
    isLoading,
    login,
  }
}
