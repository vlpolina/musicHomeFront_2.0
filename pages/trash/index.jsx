import { Trash } from '@features/Trash'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Корзина">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Trash />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
