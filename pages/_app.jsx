import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { ThemeProvider } from '@mui/material/styles'
import Cookies from 'js-cookie'

import { theme } from '@styles/theme'

import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  console.log(Cookies.get())
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  )
}

export default MyApp
