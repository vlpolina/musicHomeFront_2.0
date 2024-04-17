import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { ArrowDown } from '@shared/ui/ArrowDown/ArrowDown'
import { Burger } from '@shared/ui/Burger/Burger'
import Button from '@shared/ui/Button/Button'
import { CloseButton } from '@shared/ui/CloseButton/CloseButton'

// import useSession from '@shared/lib/hooks/useSession'
// import { Notification } from '../Notifications'
import cls from './Header.module.scss'

const LOGO = '/img/logo.svg'

const MenuItemsDesktop = ({ menuItems, catalogItems }) => {
  const router = useRouter()
  const [showCatalog, setShowCatalog] = useState(false)

  return (
    <div className="hidden lg:flex lg:gap-x-12">
      <div className={cls.menuItems}>
        <button
          type="button"
          className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-500"
          aria-expanded="false"
          onClick={() => setShowCatalog((m) => !m)}
        >
          Каталог
          <ArrowDown />
        </button>

        {showCatalog && <CatalogMenuDesktop catalogItems={catalogItems} />}
      </div>
      {menuItems.map((i) => (
        <Link key={i.link} href={i.link} className="text-sm font-semibold leading-6 text-gray-500">
          {router.pathname === i.link ? <div className={cls.active}>{i.title}</div> : i.title}
        </Link>
      ))}
      {/* {isAuthorized && isAdmin && ( */}
      <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-500">
        {router.pathname === '/admin' ? <div className={cls.active}>Админ</div> : 'Админ'}
      </Link>
      {/* )} */}
    </div>
  )
}

const MenuItemsMobile = ({ menuItems, catalogItems }) => {
  const [showCatalog, setShowCatalog] = useState(false)
  return (
    <div className="space-y-2 py-6">
      <div className="-mx-3">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          aria-controls="disclosure-1"
          aria-expanded="false"
          onClick={() => setShowCatalog((m) => !m)}
        >
          Каталог
          <ArrowDown />
        </button>

        {showCatalog && <CatalogMenuMobile catalogItems={catalogItems} />}
      </div>
      {menuItems.map((i) => (
        <Link
          href={i.link}
          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          {i.title}
        </Link>
      ))}
      {/* {isAuthorized && isAdmin && ( */}
      <Link
        href="/admin"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        Админ
      </Link>
      {/* )} */}
    </div>
  )
}

const CatalogMenuDesktop = ({ catalogItems }) => {
  return (
    <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-2">
        {catalogItems.map((i) => (
          <div
            key={i.title}
            className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
          >
            <div className="flex-auto">
              <Link href={`/catalog/${i.id}`} className="block font-semibold text-gray-900">
                {i.title}
                <span className="absolute inset-0"></span>
              </Link>
              <p className="mt-1 text-gray-600">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CatalogMenuMobile = ({ catalogItems }) => {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      {catalogItems.map((i) => (
        <Link
          href={`/catalog/${i.id}`}
          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-500 hover:bg-gray-50"
        >
          {i.title}
        </Link>
      ))}
    </div>
  )
}

export const Header = () => {
  //   const { isAuthorized, isLoad, user, access } = useSession()

  const [showMenu, setShowMenu] = useState(false)

  const menuItems = useMemo(
    () => [
      { title: 'Главная', link: '/' },
      { title: 'Поддержка', link: '/support' },
      { title: 'Корзина', link: '/trash' },
      { title: 'Избранное', link: '/liked' },
    ],
    []
  )

  const menuItemsNotAuth = useMemo(
    () => [
      { title: 'Главная', link: '/' },
      { title: 'Поддержка', link: '/support' },
    ],
    []
  )

  const catalogItems = useMemo(
    () => [
      { id: '0', title: 'Все товары', description: 'всё' },
      { id: '1', title: 'Струнные инструменты', description: 'Гитары' },
      { id: '2', title: 'Клавишные инструменты', description: 'Фортепиано' },
      { id: '3', title: 'Духовые инструменты', description: 'Саксафоны' },
    ],
    []
  )

  return (
    <header className={cls.header}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className={cls.logo}>
            <img className="h-10 w-auto" src={LOGO} alt="logo" />
            <span className="py-2 pl-4 text-md font-semibold">MusicHome</span>
          </Link>
        </div>

        {!showMenu && (
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => {
                setShowMenu(true)
              }}
            >
              <span className="sr-only">Главное меню</span>
              <Burger />
            </button>
          </div>
        )}

        {/* <MenuItemsDesktop menuItems={isAuthorized ? menuItems : menuItemsNotAuth} /> */}
        <MenuItemsDesktop menuItems={menuItems} catalogItems={catalogItems} />

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* {isAuthorized ? ( */}
          {/* <Link href="/login" className="text-sm font-semibold leading-6 text-gray-500">
              Войти | Регистрация <span aria-hidden="true">&rarr;</span>
            </Link> */}
          {/* ) : ( */}
          <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-500">
            Личный кабинет <span aria-hidden="true">&rarr;</span>
          </Link>
          {/* )} */}
        </div>
      </nav>

      {showMenu && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-x-1 ">
                <img className="h-8 w-auto" src={LOGO} alt="logo" />
                <span className="pl-6 text-md font-semibold">MusicHome</span>
              </Link>
              <CloseButton setOpen={setShowMenu} />
            </div>

            <MenuItemsMobile menuItems={menuItems} catalogItems={catalogItems} />

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  {/* {isAuthorized ? ( */}
                  {/* <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Войти | Регистрация
                  </Link> */}
                  {/* ) : ( */}
                  <Link
                    href="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Личный кабинет
                  </Link>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
