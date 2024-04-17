import Footer from '../Footer/Footer'
import { Header } from '../Header/Header'

import cls from './Layout.module.scss'

const Content = ({ children }) => {
  return <div className={cls.Content}>{children}</div>
}

export const Layout = ({ children }) => {
  return <div className={cls.layout}>{children}</div>
}

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content
