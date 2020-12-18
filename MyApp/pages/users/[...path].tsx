import { useRouter } from 'next/router';
import Layout from '../../components/Layout'

const UserDeepDetailPage = () => {
  const router = useRouter();
  
  return (
    <Layout
      title={`${
       'User Deep Detail'
      } | Next.js + TypeScript Example`}
    >
      <h1>User Deep Detail</h1>
      Got path: <pre>{JSON.stringify(router.query, null, 4)}</pre>
    </Layout>
  )
}

export default UserDeepDetailPage
