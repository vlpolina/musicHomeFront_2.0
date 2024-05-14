import { useRouter } from 'next/router'

import { Catalog } from '@features/Catalog'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout title="Каталог">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Catalog id={id} />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
