import { useRouter } from 'next/router'

import { ProductDetails } from '@features/ProductDetails'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout title="Просмотр карточки товара">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <ProductDetails slug={slug} />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
