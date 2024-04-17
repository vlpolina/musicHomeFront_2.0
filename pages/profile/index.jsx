import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Профиль">
      <Layout.Header />
      <Layout.Content>
        <div className="container">Профиль</div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
