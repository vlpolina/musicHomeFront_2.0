import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { ErrorPage } from '@features/ErrorPage'
import { Liked } from '@features/Liked'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
  }, [])

  return (
    <Layout title="Избранное">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          {isAuthorized ? <Liked /> : <ErrorPage option={'notAuth'} />}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
