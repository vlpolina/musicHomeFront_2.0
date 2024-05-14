import { useEffect, useState } from 'react'

import cls from './Footer.module.scss'

const Footer = () => {
  const [displayCookie, setDisplayCookie] = useState(true)

  const hideCookie = () => {
    localStorage.setItem('checkedCookie', 'true')
    setDisplayCookie(false)
  }

  // useEffect(() => {
  //   const accessCookie = localStorage.getItem('checkedCookie')

  //   if (accessCookie) {
  //     setDisplayCookie(false)
  //   }

  //   window.addEventListener('storage', (e) => {
  //     if (e.key === 'checkedCookie' && e.newValue === 'true') {
  //       setDisplayCookie(false)
  //     }
  //   })
  // }, [])

  if (!displayCookie) {
    return null
  }
  return (
    <footer className={cls.footer}>
      <div>
        Мы используем куки, чтобы обеспечить лучшее взаимодействие с сайтом
        <button onClick={hideCookie}>Ок, соглашаюсь, больше не показывать</button>
      </div>
    </footer>
  )
}

export default Footer
