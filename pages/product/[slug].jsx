import { ProductDetails } from '@features/ProductDetails'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Просмотр карточки товара">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <ProductDetails />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
