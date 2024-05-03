import { useRouter } from 'next/router'

import { Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'

import { OrderCard } from '../OrderCard/OrderCard'
import { TrashProductCard } from '../TrashProductCard/TrashProductCard'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './Trash.module.scss'

export const Trash = () => {
  const IMAGE = '/img/logo.svg'

  //   const { user } = useSession()

  return (
    <div className={cls.wrapper}>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Корзина
        </Typography>
        <MyButton
          className={cls.button}
          variant="outlined"
          size="large"
          onClick={() => {
            //
          }}
        >
          Очистить корзину
        </MyButton>
      </div>
      <div className={cls.content}>
        <div className={cls.cards}>
          <TrashProductCard title={'Гитара'} count={0} image={IMAGE} cost={10000} />
          <TrashProductCard title={'Гитара'} count={5} image={IMAGE} cost={10000} />
          <TrashProductCard title={'Гитара'} count={5} image={IMAGE} cost={10000} />
        </div>
        <div>
          <OrderCard />
        </div>
      </div>
    </div>
  )
}
