
import { useRouter } from 'next/router';
import Layout from '../../components/Layout'

const UserDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout
      title={`${
       'User Detail'
      } | Next.js + TypeScript Example`}
    >
      <h1>Users Detail for {id}</h1>
      <p>We can show the details of user {id}</p>
      <p>Keep in mind, this template does not support SSR (on dynamic pages) so fetching details will need to be done on client</p>
      <p>Now that you've seen this, try out /users/wildcard/paths/to/whereevernpm</p>
    </Layout>
  )
}

export default UserDetailPage