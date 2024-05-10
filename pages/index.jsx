import React from 'react'

import { HomePage } from '@features/HomePage'
import { Layout } from '@widgets/Layout/Layout/Layout'

const Home = () => {
  return (
    <Layout title="Главная">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          {' '}
          <HomePage />{' '}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}

export default Home
