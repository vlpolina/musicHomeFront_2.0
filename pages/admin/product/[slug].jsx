import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { AdminProductEditor } from '@features/AdminProductEditor'
import { ErrorPage } from '@features/ErrorPage'
import { Layout } from '@widgets/Layout/Layout/Layout'

export default function () {
  const router = useRouter()
  const { slug } = router.query

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
              <AdminProductEditor slug={slug} />
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
