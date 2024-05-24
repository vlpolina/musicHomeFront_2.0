import { React, useState } from 'react'

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { MyButton } from '@shared/ui/Button/Button'

import cls from './Orders.module.scss'

export const Orders = ({ orders }) => {
  const [filter, setFilter] = useState('')
  return (
    <>
      <Card className={cls.wrapper}>
        <div className={cls.top}>
          <Typography variant="h6" className={cls.title}>
            Ваши заказы
          </Typography>
        </div>
        <div className={cls.contentWrapper}>
          {orders.length !== 0 && (
            <FormControl fullWidth>
              <InputLabel id="label">Фильтровать по:</InputLabel>
              <Select
                className={cls.input}
                labelId="label"
                value={filter}
                label="Фильтровать по:"
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value={'all'}>Все</MenuItem>
                <MenuItem value={'applying'}>Оформлен</MenuItem>
                <MenuItem value={'delivering'}>Доставляется</MenuItem>
                <MenuItem value={'delivered'}>Уже почти у Вас</MenuItem>
                <MenuItem value={'payed'}>Получен и оплачен</MenuItem>
              </Select>
            </FormControl>
          )}
          {orders.length === 0 ? (
            <Typography>Пока что заказов нет</Typography>
          ) : (
            orders
              .filter((i) => {
                switch (filter) {
                  case 'all':
                    return true
                  case 'applying':
                    return i.applying && !i.delivering && !i.delivered && !i.payed
                  case 'delivering':
                    return i.delivering && !i.delivered && !i.payed
                  case 'delivered':
                    return i.delivered && !i.payed
                  case 'payed':
                    return i.payed
                  default:
                    return true
                }
              })
              .map((item) => (
                <div className={cls.order}>
                  <div className={cls.orderContent}>
                    <Typography className={cls.title}>Заказ №{item.id}</Typography>
                    <Typography>{item.name}</Typography>
                    <Typography>Сумма заказа: {item.sumCost} руб.</Typography>
                  </div>
                  <MyButton variant={item.payed ? 'contained' : 'outlined'}>
                    {item.applying &&
                      !item.delivering &&
                      !item.delivered &&
                      !item.payed &&
                      'Оформлен'}
                    {item.delivering && !item.delivered && !item.payed && 'Доставляется'}
                    {item.delivered && !item.payed && 'Уже почти у Вас'}
                    {item.payed && 'Получен и оплачен'}
                  </MyButton>
                </div>
              ))
          )}
        </div>
      </Card>
    </>
  )
}
