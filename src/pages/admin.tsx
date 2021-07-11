import { Spacer, Loading } from '../components/index'
import { NewPost, Layout, PostTable } from '../templates/Admin/index'
import { useAuthChecker } from '../hooks/useAuthChecker'

const Admin: React.VFC = () => {
  const { isLoading } = useAuthChecker()

  if (isLoading === true) return <Loading isShow={true} />
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
