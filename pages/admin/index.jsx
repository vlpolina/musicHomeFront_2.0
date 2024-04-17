import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  return (
    <Layout title="Админ">
      <Layout.Header />
      <Layout.Content>
        <div className="container">Администрирование</div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
