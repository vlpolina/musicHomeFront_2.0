import { useEffect, useState } from 'react'

import { Button, List, Typography } from '@mui/material'

import { api } from '@shared/api/api'
import { ArrowLeft } from '@shared/ui/ArrowLeft/ArrowLeft'
import { ArrowRight } from '@shared/ui/ArrowRight/ArrowRight'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import { Customers } from '../Customers/Customers'
import { MyMap } from '../Map/Map'
import { Questions } from '../Questions/Questions'

import cls from './HomePage.module.scss'

export const HomePage = () => {
  const images = [
    '/img/casio_logo.svg',
    '/img/fender_logo.svg',
    '/img/ibanez_logo.svg',
    '/img/yamaha_logo.svg',
  ]

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState()

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    api
      .get(`catalog/elektrogitara-ibanez-gsa60-bkn/`)
      .then(({ data }) => {
        setProduct(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Главная
        </Typography>
        {error && <ServerErrorMessage error={error} />}
        {isLoading && <Spinner className={cls.spinner} />}
        <Typography className={cls.info}>
          Добро пожаловать в MusicHome! Здесь Вы можете выбрать и заказать любой музыкальный
          инструмент, ознакомиться с его характеристиками, найти ближайший магазин и не только!
        </Typography>

        <Typography className={cls.recomendationtTitle}>Часто заказывают</Typography>
        <div className={cls.carusel}>
          <Button className={cls.arrows}>
            <ArrowLeft />
          </Button>
          <ProductCard
            id={product?.order.ID_product}
            title={product?.product.name}
            content={product?.product.short_desc}
            image={`http://localhost:8000/${product?.product.photo}`}
            slug={product?.product.slug}
            cost={product?.product.cost}
            isCatalog
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
          <Typography className={cls.recomendationtTitle}>Наши места</Typography>
          <MyMap />
          <Typography className={cls.recomendationtTitle}>Часто спрашивают</Typography>
          <List>
            <Questions
              question="Как оформить заказ?"
              answer={`Для оформления заказа нужно зарегистрироваться на сайте и войти в свой аккаунт. После этого можно добавить желаемые товары в корзину. Затем нужно перейти в раздел "Корзина" и выбрать "Продолжить оформление". В открывшемся окне проверьте или укажите Ваши данные и нажмите "Оформить заказ".`}
            />
            <Questions
              question="Где можно задавать вопросы?"
              answer={`По всем интересующим Вас вопросам можно обратиться в техническую поддержку магазина в разделе "Поддержка".`}
            />
            <Questions
              question="Могу ли я отменить заказ?"
              answer="Нет, данная функция еще в разработке, поэтому Вы не сможете самостоятельно отменить заказ. Но Вы можете обратиться в техническую поддержку магазина, и тогда администратор отменит нежелательный заказ."
            />
            <Questions
              question="От чего зависит срок доставки?"
              answer="Срок доставки зависит от удаленности Вашего адреса от наших складов и загруженности курьеров. Среднее время доставки - 2-15 дней."
            />
            <Questions
              question="Сколько стоит доставка?"
              answer="Доставка бесплатная, так как все издержки на неё уже включены в стоимость товара."
            />
            <Questions
              question="В какие города можно оформить заказ?"
              answer="В любые города России."
            />
            <Questions
              question="У вас бывают скидки на товары?"
              answer="У нас нет скидок на товары, но цены на них рассчитаны таким образом, чтобы удовлетворять запросам покупателей."
            />
            <Questions
              question="Как отслеживать статус заказа?"
              answer={`Отслеживать статус товара можно в Вашем личном кабинете. После оформления заказа там Вы увидите его основную информацию и текущий статус. Всего есть 4 статуса заказа: "Оформлен" - заказ на рассмотрении у администратора магазина; "Доставляется" - заказ в пути, но ещё не в Вашем городе; "Уже почти у Вас" - заказ в Вашем городе, курьер свяжется с Вами в течение рабочего дня; "Доставлен и оплачен" - Вы получили и оплатили свой заказ. Вы точно всегда будете в курсе происходящего, так как при каждой смене статуса заказа на Вашу электронную почту отправляется письмо с информацией о Вашем заказе.`}
            />
            <Questions
              question="Как оплатить заказ?"
              answer="Заказ оплачивается при получении картой или наличными (зависит от того, какой способ оплаты Вы выбрали при оформлении заказа)."
            />
          </List>
          <Typography className={cls.recomendationtTitle}>Политика конфиденциальности</Typography>
          <List>
            <Questions question="Основные положения" conf />
            <Questions question="Обработка персональных данных" conf />
            <Questions question="Дополнительная информация" conf />
          </List>
        </div>
      </div>
    </>
  )
}
