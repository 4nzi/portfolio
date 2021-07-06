import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { USER } from '../types/Types'

export const useMutateAuth = () => {
  const router = useRouter()
  const cookie = new Cookie()

  const loginMutation = useMutation(
    (user: USER) =>
      axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/jwt/create`, user),
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
  return { loginMutation }
}
