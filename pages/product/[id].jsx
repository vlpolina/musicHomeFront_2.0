import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Товар">
      <Layout.Header />
      <Layout.Content>
        <div className="container">Просмотр товара</div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
