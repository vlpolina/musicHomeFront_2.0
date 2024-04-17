import React from 'react'
import { CookiesProvider } from 'react-cookie'

import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
