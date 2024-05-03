// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'

import cls from './Liked.module.scss'

export const Liked = () => {
  //   const { user } = useSession()
  const IMAGE = '/img/logo.svg'

  return (
    <div className={cls.wrapper}>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Избранное
        </Typography>
        <MyButton
          className={cls.button}
          variant="outlined"
          size="large"
          onClick={() => {
            //
          }}
        >
          Очистить избранное
        </MyButton>
      </div>
      <div className={cls.contentWrapper}>
        <div className={cls.content}>
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
        </div>
      </div>
    </div>
  )
}
