import { Support } from '@features/Support'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Поддержка">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Support />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
