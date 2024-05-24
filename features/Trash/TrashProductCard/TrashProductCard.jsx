import { React, useEffect, useState } from 'react'

import { TextField } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { MyButton } from '@shared/ui/Button/Button'
import { LikedIcon } from '@shared/ui/LikedIcon/LikedIcon'
import { NotLikedIcon } from '@shared/ui/NotLikedIcon/NotLikedIcon'
import { TrashIcon } from '@shared/ui/TrashIcon/TrashIcon'

import cls from './TrashProductCard.module.scss'

export const TrashProductCard = ({
  id,
  title,
  count,
  products,
  setProducts,
  image,
  cost,
  status,
  changeStatus,
}) => {
  const [isLiked, setIsLiked] = useState()
  const [inTrash, setInTrash] = useState()
  const [countToBuy, setCountToBuy] = useState(1)

  useEffect(() => {
    if (status) {
      setIsLiked(status.liked)
      setInTrash(status.trash)
    }
  }, [status])

  useEffect(() => {
    setCountToBuy(products.find((i) => i.ID_product === id).count_buy)
  }, [products])

  useEffect(() => {
    setProducts(
      products.map((i) => {
        if (i.ID_product === id) {
          return { ...i, count_buy: countToBuy === '' ? 0 : Number(countToBuy) }
        }
        return i
      })
    )
  }, [countToBuy])

  return (
    <Card className={cls.wrapper}>
      <CardMedia className={cls.image} component="img" alt={title} image={image} />
      <CardContent className={cls.contentWrapper}>
        <div className={cls.top}>
          <div>
            <Typography variant="h6" gutterBottom className={cls.title}>
              {title}
            </Typography>
          </div>
          <div className={cls.buttons}>
            <MyButton
              variant="contained"
              size="icon"
              onClick={() => {
                changeStatus({
                  productId: Number(id),
                  productCost: Number(cost),
                  option: 'toLike',
                })
              }}
            >
              {isLiked ? <LikedIcon /> : <NotLikedIcon />}
            </MyButton>
            <MyButton
              variant="contained"
              size="icon"
              onClick={() =>
                changeStatus({
                  productId: Number(id),
                  productCost: Number(cost),
                  option: 'toBuy',
                })
              }
            >
              <TrashIcon />
            </MyButton>
          </div>
        </div>
        <Typography variant="body2" color="text.secondary">
          {count > 0 ? `В наличии, осталось ${count}` : 'Товар закончился'}
        </Typography>
        <TextField
          className={cls.input}
          label="Количество к покупке"
          type="number"
          value={Number(countToBuy)}
          onChange={(e) => setCountToBuy(e.target.value, id)}
        />
        {count > 0 ? (
          <Typography className={cls.cost}>Итого: {cost * countToBuy} рублей</Typography>
        ) : (
          <Typography className={cls.cost}>Товар закончился, его нельзя заказать</Typography>
        )}
      </CardContent>
    </Card>
  )
}
