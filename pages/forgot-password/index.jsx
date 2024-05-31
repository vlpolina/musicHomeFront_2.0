import { ForgotPassword } from '@features/ForgotPassword'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Восстановление пароля">
      <Layout.Header />
      <Layout.Content>
        <div className="loginContainer">
          <ForgotPassword />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
