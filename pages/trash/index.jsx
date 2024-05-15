import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { ErrorPage } from '@features/ErrorPage'
import { Trash } from '@features/Trash'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
  }, [])
  return (
    <Layout title="Корзина">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          {isAuthorized ? <Trash /> : <ErrorPage option={'notAuth'} />}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
