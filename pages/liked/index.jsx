import { Liked } from '@features/Liked'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Избранное">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Liked />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
