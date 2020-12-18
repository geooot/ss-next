import Link from 'next/link'
import Layout from '../../components/Layout'

const UserCreatePage = () => (
  <Layout title="Create a new User | Next.js + TypeScript Example">
    <h1>Create a new User</h1>
    <p>
      Here you can create a new user.
    </p>
    <p>You are currently on: /users/create</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)
export default UserCreatePage
