import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Каталог">
      <Layout.Header />
      <Layout.Content>
        <div className="container">Каталог</div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
