import { Button, Typography } from '@mui/material'

import { ArrowLeft } from '@shared/ui/ArrowLeft/ArrowLeft'
import { ArrowRight } from '@shared/ui/ArrowRight/ArrowRight'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'

import { Customers } from '../Customers/Customers'
import { MyMap } from '../Map/Map'

import cls from './HomePage.module.scss'

export const HomePage = () => {
  const IMAGE = '/img/logo.svg'
  const images = [
    '/img/casio_logo.svg',
    '/img/fender_logo.svg',
    '/img/ibanez_logo.svg',
    '/img/yamaha_logo.svg',
  ]

  return (
    <>
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Главная
        </Typography>

        <Typography className={cls.info}>
          Добро пожаловать в MusicHome! Здесь Вы можете выбрать и заказать любой музыкальный
          инструмент, ознакомиться с его характеристиками, найти ближайший магазин и не только!
        </Typography>

        <Typography className={cls.recomendationtTitle}>Наши товары</Typography>
        <div className={cls.carusel}>
          <Button className={cls.arrows}>
            <ArrowLeft />
          </Button>
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <Button className={cls.arrows}>
            <ArrowRight />
          </Button>
        </div>
        <br />
        <Typography className={cls.recomendationtTitle}>Наши партнёры</Typography>
        <div className={cls.carusel}>
          <Button className={cls.arrows}>
            <ArrowLeft />
          </Button>
          <div className={cls.customers}>
            {images.map((i) => (
              <Customers key={i} image={i} />
            ))}
          </div>
          <Button className={cls.arrows}>
            <ArrowRight />
          </Button>
        </div>
        <div>
          <Typography className={cls.recomendationtTitle}>Наше местоположение</Typography>
          <MyMap />
        </div>
      </div>
    </>
  )
}
