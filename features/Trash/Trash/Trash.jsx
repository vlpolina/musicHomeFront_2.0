import { useCallback, useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { Notification } from '@features/Notification/Notification'
import { changeProductStatus } from '@helpers/changeProductStatus'
import { isValidEmail } from '@helpers/validateUserData'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import { CreateOrder } from '../CreateOrder/CreateOrder'
import { OrderCard } from '../OrderCard/OrderCard'
import { TrashProductCard } from '../TrashProductCard/TrashProductCard'

import cls from './Trash.module.scss'

export const Trash = () => {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderError, setOrderError] = useState(null)
  const [modal, setModal] = useState(false)
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [notifReset, setNotifReset] = useState(false)
  const [notifOrder, setNotifOrder] = useState(false)

  const changeStatus = ({ productId, productCost, option }) => {
    changeProductStatus({ productId, productCost, option, status, setStatus })
    if (option === 'toBuy') {
      setProducts(products.filter((i) => i.ID_product !== productId))
    }
  }

  const resetTrash = () => {
    setError(null)
    setIsLoading(true)

    api
      .put('trash/reset/')
      .then(() => {
        setProducts([])
        setNotifReset(true)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  const sumTrashCost = () => {
    let sum = 0
    products.forEach((element) => {
      sum = sum + Number(element.cost) * Number(element.count_buy)
    })
    return sum
  }

  const createOrder = useCallback(() => {
    setError(null)
    setOrderError(null)

    if (!name) return setOrderError('Укажите своё имя!')
    if (!surname) return setOrderError('Укажите свою фамилию!')
    if (!email)
      return setOrderError(
        'Укажите адрес электронной почты, чтобы получать письма с информацией о заказе!'
      )
    if (!isValidEmail(email)) return setOrderError('Некорректный формат Email!')
    if (!phone) return setOrderError('Укажите номер телефона, чтобы мы могли связаться с Вами!')
    if (!address) return setOrderError('Укажите адрес доставки!')
    if (!payment) return setOrderError('Укажите способ оплаты заказа!')

    setIsLoading(true)

    const order = products.map((product) => ({
      ...product,
      sum_cost: product.cost * product.count_buy,
      count: product.count_buy,
    }))

    api
      .put('orders/create/', {
        products: order,
        address,
        client_phone: phone,
        payment,
        ID_client: Cookies.get('userId'),
      })
      .then(() => {
        setProducts([])
      })
      .catch((e) => {
        console.log(e)
        setOrderError('Ошибка! Что-то пошло не так...')
      })

    api
      .put('user/update/', { email, last_name: surname, first_name: name })
      .then(() => {
        setNotifOrder(true)
      })
      .catch((e) => {
        console.log(e)
        setOrderError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => {
        setIsLoading(false)
        setIsSuccess(true)
      })
  }, [email, name, surname, phone, address, payment, products])

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
      .get('user/')
      .then(({ data }) => {
        setSurname(data.last_name)
        setName(data.first_name)
        setEmail(data.email)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
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
                    products={products}
                    setProducts={setProducts}
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
            setModal={setModal}
          />
        </div>
      </div>
      {modal && (
        <CreateOrder
          products={products}
          isLoading={isLoading}
          modal={modal}
          setModal={setModal}
          surname={surname}
          setSurname={setSurname}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          payment={payment}
          setPayment={setPayment}
          isSuccess={isSuccess}
          createOrder={createOrder}
          sumTrashCost={sumTrashCost()}
          error={orderError}
        />
      )}
      {notifReset && (
        <Notification text="Корзина очищена!" type="success" onClose={() => setNotifReset(false)} />
      )}
      {notifOrder && (
        <Notification
          text="Заказ успешно оформлен!"
          type="success"
          onClose={() => setNotifOrder(false)}
        />
      )}
    </div>
  )
}
