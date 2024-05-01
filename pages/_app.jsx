import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from '@styles/theme'

import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  )
}

export default MyApp
