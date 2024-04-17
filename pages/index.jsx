// import { HomePage } from "@features/HomePage";
// import useSession from "@shared/lib/hooks/useSession";
// import { Spinner } from "@shared/ui/Spinner/Spinner";
import React from 'react'

import { Layout } from '../widgets/Layout/Layout/Layout'

const Home = () => {
  // const session = useSession();
  try {
    return (
      <Layout title="Главная">
        <Layout.Header />
        <Layout.Content>
          <div className="container">{/* {!session.isLoad ? <Spinner /> : <HomePage />} */}</div>
        </Layout.Content>
        <Layout.Footer />
      </Layout>
    )
  } catch (error) {
    console.log('Error to start app')
  }
}

export default Home
