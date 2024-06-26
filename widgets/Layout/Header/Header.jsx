import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import Cookies from 'js-cookie'

import { api } from '@shared/api/api'
import { ArrowDown } from '@shared/ui/ArrowDown/ArrowDown'
import { Burger } from '@shared/ui/Burger/Burger'
import { CloseButton } from '@shared/ui/CloseButton/CloseButton'

import cls from './Header.module.scss'

const LOGO = '/img/logo.svg'

const MenuItemsDesktop = ({ menuItems, catalogItems, isAuthorized, isAdmin }) => {
  const router = useRouter()
  const [showCatalog, setShowCatalog] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.catalog-menu')) {
        setShowCatalog(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [showCatalog])

  return (
    <div className="hidden lg:flex lg:gap-x-12">
      <div className={cls.menuItems}>
        <button
          type="button"
          className="catalog-menu flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-500"
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
      {isAuthorized && isAdmin && (
        <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-500">
          {router.pathname === '/admin' ? <div className={cls.active}>Админ</div> : 'Админ'}
        </Link>
      )}
    </div>
  )
}

const MenuItemsMobile = ({ menuItems, catalogItems, isAuthorized, isAdmin }) => {
  const [showCatalog, setShowCatalog] = useState(false)
  return (
    <div className="space-y-2 py-6">
      <div className="-mx-3">
        <button
          type="button"
          className="catalog-menu flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          aria-controls="disclosure-1"
          aria-expanded="false"
          onClick={() => setShowCatalog((m) => !m)}
        >
          Каталог
          <ArrowDown />
        </button>

        {showCatalog && (
          <CatalogMenuMobile catalogItems={catalogItems} setShowCatalog={setShowCatalog} />
        )}
      </div>
      {menuItems.map((i) => (
        <Link
          key={i.link}
          href={i.link}
          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          {i.title}
        </Link>
      ))}
      {isAuthorized && isAdmin && (
        <Link
          href="/admin"
          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          Админ
        </Link>
      )}
    </div>
  )
}

const CatalogMenuDesktop = ({ catalogItems }) => {
  return (
    <div className="catalog-menu absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
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

const CatalogMenuMobile = ({ catalogItems, setShowCatalog }) => {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      {catalogItems.map((i) => (
        <Link
          key={i.id}
          href={`/catalog/${i.id}`}
          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-500 hover:bg-gray-50"
          // onClick={setShowCatalog(false)}
        >
          {i.title}
        </Link>
      ))}
    </div>
  )
}

export const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [categories, setCategories] = useState(null)

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

  const catalogItems = useMemo(() => {
    if (!categories) {
      return []
    }
    const updatedCatalogItems = categories.map((category) => {
      return {
        id: category.id.toString(),
        title: category.name,
        description: '',
      }
    })

    updatedCatalogItems.unshift({
      id: '0',
      title: 'Все товары',
      description: 'Все товары',
    })

    return updatedCatalogItems
  }, [categories])

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setIsAdmin(Cookies.get('isAdmin'))
  }, [])

  useEffect(() => {
    api
      .get('catalog/cats/')
      .then(({ data }) => {
        setCategories(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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

        <MenuItemsDesktop
          isAdmin={isAdmin}
          isAuthorized={isAuthorized}
          menuItems={isAuthorized ? menuItems : menuItemsNotAuth}
          catalogItems={catalogItems}
        />

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthorized ? (
            <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-500">
              Личный кабинет <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-500">
              Войти | Регистрация <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
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

            <MenuItemsMobile
              isAdmin={isAdmin}
              isAuthorized={isAuthorized}
              menuItems={isAuthorized ? menuItems : menuItemsNotAuth}
              catalogItems={catalogItems}
            />

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  {isAuthorized ? (
                    <Link
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Войти | Регистрация
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
