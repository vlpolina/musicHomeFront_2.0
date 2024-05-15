import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { changeProductStatus } from '@helpers/changeProductStatus'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import { OrderCard } from '../OrderCard/OrderCard'
import { TrashProductCard } from '../TrashProductCard/TrashProductCard'

import cls from './Trash.module.scss'

export const Trash = () => {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState([])
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const changeStatus = ({ productId, productCost, option }) => {
    changeProductStatus({ productId, productCost, option, status, setStatus })
    if (option === 'toBuy') {
      setProducts(products.filter((i) => i.ID_product !== productId))
    }
  }

  const setCountToBuy = (number, productId) => {
    console.log('productId: ', productId)
    console.log('number: ', number)

    setProducts(
      products.map((item) => {
        if (Number(item.product_id) === Number(productId)) {
          return { ...item, count_buy: Number(number) }
        }
        return item
      })
    )
  }

  const resetTrash = () => {
    setError(null)
    setIsLoading(true)

    api
      .put('trashReset/')
      .then(() => {
        setProducts([])
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  const sumTrashCost = () => {
    let sum = 0
    products.forEach((element) => {
      sum = sum + Number(element.cost)
    })
    return sum
  }

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setIsAdmin(Cookies.get('isAdmin'))
  }, [])

  useEffect(() => {
    setError(null)
    setIsLoading(true)

    api
      .get('getStatusesForCatalog/')
      .then(({ data }) => {
        setStatus(data)
      })
      .catch((e) => {
        console.log(e)
      })

    api
      .get('trash/')
      .then(({ data }) => {
        setProducts(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={cls.wrapper}>
      {error && <ServerErrorMessage error={error} />}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Корзина
        </Typography>
        <MyButton
          className={cls.button}
          variant="outlined"
          size="large"
          onClick={() => {
            resetTrash()
          }}
        >
          Очистить корзину
        </MyButton>
      </div>
      <div className={cls.content}>
        {isLoading && <Spinner className={cls.spinner} />}
        {products?.length !== 0 ? (
          <div className={cls.cards}>
            <Typography gutterBottom>
              Всего товаров: {products?.filter((i) => Number(i.count) !== 0).length}
            </Typography>
            {products?.map(
              (product) =>
                product.count !== 0 && (
                  <TrashProductCard
                    key={product.ID_product}
                    id={product.ID_product}
                    title={product.name}
                    count={product.count}
                    countToBuy={product.count_buy}
                    setCountToBuy={setCountToBuy}
                    image={product.photo}
                    cost={product.cost}
                    status={status.find(
                      (item) => Number(item.product_id) === Number(product.ID_product)
                    )}
                    changeStatus={changeStatus}
                  />
                )
            )}
          </div>
        ) : (
          <Typography variant="h6">Пока что корзина пуста</Typography>
        )}
        <div>
          <OrderCard
            sumCost={sumTrashCost()}
            countToBuy={products?.filter((i) => Number(i.count) !== 0).length}
          />
        </div>
      </div>
    </div>
  )
}
