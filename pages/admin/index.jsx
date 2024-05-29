import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { Admin } from '@features/Admin'
import { ErrorPage } from '@features/ErrorPage'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setIsAdmin(Cookies.get('isAdmin'))
  }, [])

  return (
    <Layout title="Админ">
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          {isAuthorized ? (
            isAdmin ? (
              <Admin />
            ) : (
              <ErrorPage option={'notAdmin'} />
            )
          ) : (
            <ErrorPage option={'notAuth'} />
          )}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
