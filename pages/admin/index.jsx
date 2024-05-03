import { Admin } from '@features/Admin'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Админ">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Admin />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
