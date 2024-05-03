import { useRouter } from 'next/router'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'

import { ProductDetailsCard } from '../ProductDetailsCard/ProductDetailsCard'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './ProductDetails.module.scss'

export const ProductDetails = () => {
  const router = useRouter()
  const IMAGE = '/img/logo.svg'

  //   const { user } = useSession()

  const product = 'Гитара'
  return (
    <div className={cls.wrapper}>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Описание товара: {product}
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
        title={'Гитараdddddd d dddd'}
        count={5}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis itaque nulla quas beatae tempore consequuntur, incidunt consectetur vero autem, qui animi debitis, ea veniam vel in asperiores aspernatur earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis itaque nulla quas beatae tempore consequuntur, incidunt consectetur vero autem, qui animi debitis, ea veniam vel in asperiores aspernatur earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis itaque nulla quas beatae tempore consequuntur, incidunt consectetur vero autem, qui animi debitis, ea veniam vel in asperiores aspernatur earum?'
        }
        image={IMAGE}
        cost={10000}
      />
    </div>
  )
}
