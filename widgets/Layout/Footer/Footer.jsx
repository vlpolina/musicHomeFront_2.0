import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'
import Cookies from 'js-cookie'

import cls from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={cls.footer}>
      {Cookies.get('isAuthorized') && !Cookies.get('cookie') && (
        <Alert
          severity="info"
          onClose={() => {
            Cookies.set('cookie', true)
          }}
        >
          Мы используем куки, чтобы обеспечить лучшее взаимодействие с сайтом.
        </Alert>
      )}
    </footer>
  )
}

export default Footer
