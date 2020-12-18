import Link from 'next/link'
import Layout from '../../components/Layout'

const UsersPage = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>You are currently on: /users, try out dynamic routes by going to /users/1234</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default UsersPage
