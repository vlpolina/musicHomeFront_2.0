import { Catalog } from '@features/Catalog'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Каталог">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Catalog />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
