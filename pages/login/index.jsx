import { Login } from '@features/Login'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Вход">
      <Layout.Header />
      <Layout.Content>
        <div className="loginContainer">
          <Login />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
