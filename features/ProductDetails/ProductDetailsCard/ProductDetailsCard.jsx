import { React, useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { LikedIcon } from '@shared/ui/LikedIcon/LikedIcon'
import { NotLikedIcon } from '@shared/ui/NotLikedIcon/NotLikedIcon'

import cls from './ProductDetailsCard.module.scss'

export const ProductDetailsCard = ({
  id,
  title,
  count,
  content,
  image,
  cost,
  customer,
  isLiked,
  inTrash,
  orderId,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [liked, setLiked] = useState()
  const [trash, setTrash] = useState()
  const [order, setOrder] = useState()

  const like = ({ id, cost }) => {
    if (!liked) {
      api
        .post('likedAdd/', {
          ID_product: id,
          count: 1,
          sum_cost: cost,
        })
        .then(({ data }) => {
          setLiked((prev) => !prev)
          setOrder(data.id)
        })
        .catch((e) => {
          console.log(e)
        })
    } else if (liked) {
      api
        .delete(orderId ? `likedDelete/${Number(orderId)}/` : `likedDelete/${Number(order)}/`)
        .then(() => {
          setLiked((prev) => !prev)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const putTrash = ({ id, cost }) => {
    if (!trash) {
      api
        .post('trashAdd/', {
          ID_product: id,
          count: 1,
          sum_cost: cost,
        })
        .then(({ data }) => {
          setTrash((prev) => !prev)
          setOrder(data.id)
        })
        .catch((e) => {
          console.log(e)
        })
    } else if (trash) {
      api
        .delete(orderId ? `trashDelete/${Number(orderId)}/` : `trashDelete/${Number(order)}/`)
        .then(() => {
          setTrash((prev) => !prev)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  useEffect(() => {
    setIsAuthorized(Cookies.get('isAuthorized'))
    setLiked(isLiked)
    setTrash(inTrash)
  }, [isLiked, inTrash])

  return (
    <Card className={cls.wrapper}>
      <CardMedia
        className={cls.image}
        component="img"
        alt={title}
        image={`http://localhost:8000${image}`}
      />
      <div className={cls.contentWrapper}>
        <CardContent>
          <div className={cls.top}>
            <div>
              <Typography variant="h5" gutterBottom className={cls.title}>
                {title}
              </Typography>
              <Typography variant="h6">Поставщик: {customer}</Typography>
              <Typography variant="body2" color="text.secondary">
                {count > 0 ? `В наличии, осталось ${count}` : 'Товар закончился'}
              </Typography>
            </div>
            {isAuthorized && (
              <div>
                <MyButton
                  variant="contained"
                  size="icon"
                  onClick={() => {
                    like({ id, cost })
                  }}
                >
                  {liked ? <LikedIcon /> : <NotLikedIcon />}
                </MyButton>
              </div>
            )}
          </div>

          <Typography className={cls.content} color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions className={cls.bottom}>
          <Typography className={cls.cost}>Цена: {cost} рублей</Typography>
          {isAuthorized && (
            <MyButton
              className={cls.trashButton}
              variant={trash ? 'contained' : 'outlined'}
              onClick={() => putTrash({ id, cost })}
            >
              {trash ? 'В корзине' : 'Добавить в корзину'}
            </MyButton>
          )}
        </CardActions>
      </div>
    </Card>
  )
}
