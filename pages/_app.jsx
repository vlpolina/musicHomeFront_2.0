import React from 'react'
import { useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from '@styles/theme'

import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Включить профилировщик
    if (process.env.NODE_ENV === 'development') {
      const profiling = window.ReactProfiler?.startProfiling()
      return () => profiling.stop()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider>
  )
}

export default MyApp
