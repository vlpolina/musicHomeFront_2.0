import { React } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { MyButton } from '@shared/ui/Button/Button'

import cls from './OrderCard.module.scss'

export const OrderCard = ({ sumCost, countToBuy, setModal }) => {
  return (
    <Card className={cls.wrapper}>
      <div className={cls.top}>
        <Typography variant="h6" className={cls.title}>
          Ваш заказ
        </Typography>
      </div>
      <div className={cls.contentWrapper}>
        <Typography variant="body2" color="text.secondary">
          {countToBuy > 0 ? `${countToBuy} товаров к покупке` : '0 товаров к покупке'}
        </Typography>
        {sumCost > 0 ? (
          <Typography className={cls.cost}>Итого: {sumCost} рублей</Typography>
        ) : (
          <Typography className={cls.cost}>Корзина пуста</Typography>
        )}
        <MyButton variant="contained" size="icon" onClick={() => setModal(true)}>
          Продолжить оформление
        </MyButton>
      </div>
    </Card>
  )
}
