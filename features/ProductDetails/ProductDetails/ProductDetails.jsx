import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import { ProductDetailsCard } from '../ProductDetailsCard/ProductDetailsCard'

import cls from './ProductDetails.module.scss'

export const ProductDetails = ({ slug }) => {
  const router = useRouter()

  const [product, setProduct] = useState()
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLiked, setIsLiked] = useState()
  const [inTrash, setInTrash] = useState()

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    slug !== undefined &&
      api
        .get(`catalog/${slug}/`)
        .then(({ data }) => {
          setProduct(data)
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
  }, [slug])

  return (
    <div className={cls.wrapper}>
      {error && <ServerErrorMessage error={error} />}
      {isLoading && <Spinner className={cls.spinner} />}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Описание товара: {product?.product.name}
        </Typography>
        <MyButton
          className={cls.button}
          variant="outlined"
          size="large"
          onClick={() => {
            router.push('/catalog/0')
          }}
        >
          В каталог
        </MyButton>
      </div>
      <ProductDetailsCard
        id={product?.product.id}
        title={product?.product.name}
        count={product?.product.count}
        content={product?.product.long_desc}
        image={product?.product.photo}
        cost={product?.product.cost}
        customer={customers.find((i) => product?.product.custom_name === i.id)?.name}
        isLiked={product?.order?.in_liked}
        inTrash={product?.order?.in_trash}
        orderId={product?.order?.id}
      />
    </div>
  )
}
