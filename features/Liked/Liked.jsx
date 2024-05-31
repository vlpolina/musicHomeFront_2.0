import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { Notification } from '@features/Notification/Notification'
import { changeProductStatus } from '@helpers/changeProductStatus'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './Liked.module.scss'

export const Liked = () => {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState([])
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notifReset, setNotifReset] = useState(false)

  const changeStatus = ({ productId, productCost, option }) => {
    changeProductStatus({ productId, productCost, option, status, setStatus })
    if (option === 'toBuy') {
      setProducts(products.filter((i) => i.ID_product !== productId))
    }
  }

  const resetLiked = () => {
    setError(null)
    setIsLoading(true)

    api
      .put('liked/reset/')
      .then(() => {
        setProducts([])
        setNotifReset(true)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setIsAdmin(Cookies.get('isAdmin'))
  }, [])

  useEffect(() => {
    setError(null)
    setIsLoading(true)

    api
      .get('catalog/getStatuses/')
      .then(({ data }) => {
        setStatus(data)
      })
      .catch((e) => {
        console.log(e)
      })

    api
      .get('liked/')
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
          Избранное
        </Typography>
        <MyButton
          className={cls.button}
          variant="outlined"
          size="large"
          onClick={() => {
            resetLiked()
          }}
        >
          Очистить избранное
        </MyButton>
      </div>
      {isLoading && <Spinner className={cls.spinner} />}
      {products?.length !== 0 ? (
        <>
          <Typography gutterBottom>
            Всего товаров: {products?.filter((i) => Number(i.count) !== 0).length}
          </Typography>

          <div className={cls.contentWrapper}>
            <div className={cls.content}>
              {products?.map(
                (product) =>
                  product.count !== 0 && (
                    <ProductCard
                      key={product.ID_product}
                      id={product.ID_product}
                      title={product.name}
                      content={product.short_desc}
                      image={product.photo}
                      slug={product.slug}
                      cost={product.cost}
                      isCatalog
                      changeStatus={changeStatus}
                      isAuthorized={isAuthorized}
                      isAdmin={isAdmin}
                      status={status.find(
                        (item) => Number(item.product_id) === Number(product.ID_product)
                      )}
                    />
                  )
              )}
            </div>
          </div>
        </>
      ) : (
        <Typography variant="h6">Пока что в "Избранном" пусто</Typography>
      )}
      {notifReset && (
        <Notification
          text="Избранное очищено!"
          type="success"
          onClose={() => setNotifReset(false)}
        />
      )}
    </div>
  )
}
