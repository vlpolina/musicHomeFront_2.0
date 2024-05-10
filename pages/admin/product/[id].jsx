import { AdminProductEditor } from '@features/AdminProductEditor'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const id = '1'
  return (
    <Layout title="Админ">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <AdminProductEditor id={id} />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
