import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { Spacer } from '../components/index'
import { NewPost, Layout, PostTable } from '../templates/Admin/index'

import { useAtom } from 'jotai'
import { isLogin } from '../store/atoms'

const Admin: React.VFC = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const [login, setLogin] = useAtom(isLogin)

  useEffect(() => {
    if (cookie.get('access_token')) {
      setLogin(true)
    } else {
      router.push('/login')
    }
  }, [login])

  if (login === false) return <></>
  return (
    <Layout title="admin">
      <div className="container" style={{ maxWidth: '1400px' }}>
        <PostTable />
        <Spacer axis="vertical" size={30} />
        <NewPost />
      </div>
    </Layout>
  )
}

export default Admin
