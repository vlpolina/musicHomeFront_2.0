import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'

import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { MyInput } from '@shared/ui/Input/Input'
import { Popup } from '@shared/ui/Popup/Popup'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './CreateOrder.module.scss'

const inputStyles = {
  width: '100%',
  borderRadius: '8px',
  lineHeight: '1.5',
  border: '1.5px solid',
  borderColor: '#d4d3d3',
  borderRadius: '8px',
  padding: '16.5px 14px',

  '&:active': {
    borderColor: '#1561f8',
  },
}

const buttonStyles = {
  borderRadius: '8px 0 0 8px',
}

export const CreateOrder = ({
  products,
  isLoading,
  modal,
  setModal,
  surname,
  setSurname,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  payment,
  setPayment,
  isSuccess,
  createOrder,
  sumTrashCost,
  error,
}) => {
  return (
    <Popup onClose={() => setModal(false)} open={modal} title="Оформление заказа">
      <div className={cls.order}>
        {error && <ServerErrorMessage error={error} />}
        {!isSuccess && (
          <>
            <MyInput
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <MyInput placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <MyInput
              placeholder="Адрес электронной почты"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PhoneInput
              specialLabel="Номер телефона"
              country="ru"
              onlyCountries={['ru']}
              value={phone}
              onChange={(e) => setPhone(e)}
              inputStyle={inputStyles}
              buttonStyle={buttonStyles}
              placeholder="+7 (000) 000-00-00"
            />
            <MyInput
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="label">Способ оплаты</InputLabel>
              <Select
                className={cls.input}
                labelId="label"
                value={payment}
                label="Способ оплаты"
                onChange={(event) => setPayment(event.target.value)}
              >
                <MenuItem value={'card'}>Карта</MenuItem>
                <MenuItem value={'cash'}>Наличные</MenuItem>
              </Select>
            </FormControl>

            <div className={cls.orderContent}>
              <Typography className={cls.orderTitle}>Заказ:</Typography>
              <Typography>
                {products?.filter((i) => Number(i.count) !== 0).length} товаров на сумму{' '}
                {sumTrashCost} рублей:
              </Typography>
              {products?.map(
                (product) =>
                  product.count !== 0 && (
                    <Typography key={product.ID_product}>
                      - {product.name}: {product.count_buy} шт.
                    </Typography>
                  )
              )}
            </div>
            <Typography className={cls.info}>
              Оформляя заказ, Вы соглашаетесь на обработку Ваших персональных данных.
            </Typography>
            <MyButton variant="contained" onClick={createOrder}>
              Оформить заказ
            </MyButton>
          </>
        )}
        {isLoading && <Spinner className={cls.spinner} />}
        {isSuccess && (
          <Typography className={cls.success}>
            Заказ успешно оформлен! Вы можете просматривать его статус в личном кабинете:{' '}
            <Link href="/profile" className={cls.link}>
              Перейти
            </Link>
          </Typography>
        )}
      </div>
    </Popup>
  )
}
