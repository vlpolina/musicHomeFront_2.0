import { Signup } from '@features/Signup'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Регистрация">
      <Layout.Header />
      <Layout.Content>
        <div className="loginContainer">
          <Signup />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
