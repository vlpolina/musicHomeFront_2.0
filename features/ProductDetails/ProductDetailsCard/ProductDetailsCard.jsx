import { React, useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { MyButton } from '@shared/ui/Button/Button'
import { LikedIcon } from '@shared/ui/LikedIcon/LikedIcon'
import { NotLikedIcon } from '@shared/ui/NotLikedIcon/NotLikedIcon'

import cls from './ProductDetailsCard.module.scss'

export const ProductDetailsCard = ({
  className,
  title,
  count,
  content,
  image,
  cost,
  isLiked,
  inTrash,
  onLiked,
}) => {
  const [liked, setLiked] = useState(isLiked)
  const [trash, setTrash] = useState(inTrash)

  return (
    <Card className={cls.wrapper}>
      <CardMedia className={cls.image} component="img" alt={title} image={image} />
      <div className={cls.contentWrapper}>
        <CardContent>
          <div className={cls.top}>
            <div>
              <Typography variant="h5" gutterBottom className={cls.title}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count > 0 ? `В наличии, осталось ${count}` : 'Товар закончился'}
              </Typography>
            </div>
            <div>
              <MyButton
                variant="contained"
                size="icon"
                onClick={() => {
                  setLiked((prev) => !prev)
                  // onLiked()
                }}
              >
                {liked ? <LikedIcon /> : <NotLikedIcon />}
              </MyButton>
            </div>
          </div>

          <Typography className={cls.content} color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions className={cls.bottom}>
          <Typography className={cls.cost}>Цена: {cost} рублей</Typography>
          <MyButton
            className={cls.trashButton}
            variant={trash ? 'contained' : 'outlined'}
            onClick={() => setTrash(!trash)}
          >
            {trash ? 'В корзине' : 'Добавить в корзину'}
          </MyButton>
        </CardActions>
      </div>
    </Card>
  )
}
