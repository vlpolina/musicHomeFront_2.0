import { useCallback, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { Filters } from '@features/Filters'
import { changeProductStatus } from '@helpers/changeProductStatus'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { FilterIcon } from '@shared/ui/FilterIcon/FilterICon'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'
import { Search } from '@shared/ui/Search/Search'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './Catalog.module.scss'

export const Catalog = ({ id }) => {
  const [catalog, setCatalog] = useState(null)
  const [initialCatalog, setInitialCatalog] = useState(null)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [minCost, setMinCost] = useState(0)
  const [maxCost, setMaxCost] = useState(0)
  const [customers, setCustomers] = useState([])
  const [customerFilter, setCustomerFilter] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortIncreaseCost, setSortIncreaseCost] = useState(false)
  const [sortDecreaseCost, setSortDecreaseCost] = useState(false)
  const [popupError, setPopupError] = useState(null)
  const [status, setStatus] = useState([])
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const findProducts = useCallback(() => {
    search.length !== 0
      ? setCatalog(
          [...initialCatalog].filter((i) =>
            i.name.toLowerCase().trim().includes(search.toLocaleLowerCase().trim())
          )
        )
      : setCatalog(initialCatalog)
  }, [search, catalog])

  const applyFilters = useCallback(() => {
    setPopupError(null)

    if (Number(minCost) < 0 || Number(maxCost) < 0) {
      return setPopupError('Цена не может быть отрицительной!')
    }
    if (Number(minCost) !== 0 && Number(maxCost) !== 0 && Number(maxCost) < Number(minCost)) {
      return setPopupError('Значение цены "до" не может быть меньше значения "от"!')
    }
    if (sortDecreaseCost) {
      setCatalog([...catalog].sort((a, b) => b.cost - a.cost))
    } else if (sortIncreaseCost) {
      setCatalog([...catalog].sort((a, b) => a.cost - b.cost))
    } else setCatalog(initialCatalog)

    if (Number(minCost) > 0 && Number(maxCost) > 0) {
      setCatalog([...catalog].filter((i) => Number(maxCost) > i.cost && i.cost > Number(minCost)))
    }

    if (customerFilter.length > 0) {
      setCatalog([...catalog].filter((i) => customerFilter.some((item) => item.id === i.id)))
    }
  }, [
    catalog,
    initialCatalog,
    sortDecreaseCost,
    sortIncreaseCost,
    minCost,
    maxCost,
    customerFilter,
  ])

  const resetFilters = useCallback(() => {
    setSortDecreaseCost(false)
    setSortIncreaseCost(false)
    setMinCost(0)
    setMaxCost(0)
    setCustomerFilter([])
    setCatalog(initialCatalog)
  }, [catalog, initialCatalog])

  const changeStatus = ({ productId, productCost, option }) => {
    changeProductStatus({ productId, productCost, option, status, setStatus })
  }

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setIsAdmin(Cookies.get('isAdmin'))
  }, [])

  useEffect(() => {
    setError(null)
    setIsLoading(true)

    isAuthorized &&
      api
        .get('getStatusesForCatalog/')
        .then(({ data }) => {
          setStatus(data)
        })
        .catch((e) => {
          console.log(e)
        })

    api
      .get('catalogCats/')
      .then(({ data }) => {
        setCategory(
          Number(id) === 0 ? 'Все товары' : data.find((category) => category.id === Number(id)).name
        )
      })
      .catch((e) => {
        console.log(e)
      })

    api
      .get(Number(id) === 0 || id === undefined ? 'catalogAll/' : `catalog/${id}/`)
      .then(({ data }) => {
        setCatalog(data)
        setInitialCatalog(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })

    api
      .get('customersForCat/')
      .then(({ data }) => {
        setCustomers(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <div className={cls.wrapper}>
      {error && <ServerErrorMessage error={error} />}

      <Typography className={cls.pageTitle} variant="h5">
        Каталог: {category}
      </Typography>

      <div className={cls.filters}>
        <Search
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cls.search}
          onClick={findProducts}
        />
        <MyButton
          variant="contained"
          size="large"
          className={cls.filterButton}
          onClick={() => {
            setModal(true)
          }}
        >
          Фильтры <FilterIcon />
        </MyButton>
      </div>
      {isLoading && <Spinner className={cls.spinner} />}
      {catalog?.length !== 0 && (
        <Typography gutterBottom>
          Всего товаров: {catalog?.filter((i) => Number(i.count) !== 0).length}
        </Typography>
      )}
      {catalog?.length === 0 && (
        <Typography variant="h6" className={cls.notFound}>
          По Вашему запросу ничего не найдено!
        </Typography>
      )}
      <div className={cls.productsWrapper}>
        <div className={cls.products}>
          {catalog?.map(
            (product) =>
              product.count !== 0 && (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  content={product.short_desc}
                  image={product.photo}
                  slug={product.slug}
                  cost={product.cost}
                  isCatalog
                  changeStatus={changeStatus}
                  isAuthorized={isAuthorized}
                  isAdmin={isAdmin}
                  status={status.find((item) => Number(item.product_id) === Number(product.id))}
                />
              )
          )}
        </div>
      </div>

      {modal && (
        <Filters
          modal={modal}
          setModal={setModal}
          popupError={popupError}
          sortIncreaseCost={sortIncreaseCost}
          setSortIncreaseCost={setSortIncreaseCost}
          sortDecreaseCost={sortDecreaseCost}
          setSortDecreaseCost={setSortDecreaseCost}
          minCost={minCost}
          setMinCost={setMinCost}
          maxCost={maxCost}
          setMaxCost={setMaxCost}
          customers={customers}
          customerFilter={customerFilter}
          setCustomerFilter={setCustomerFilter}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      )}
    </div>
  )
}
