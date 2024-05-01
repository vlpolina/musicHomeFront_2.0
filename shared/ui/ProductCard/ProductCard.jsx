import { React, useState } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { MyButton } from '@shared/ui/Button/Button'
import { LikedIcon } from '@shared/ui/LikedIcon/LikedIcon'
import { NotLikedIcon } from '@shared/ui/NotLikedIcon/NotLikedIcon'
import { TrashIcon } from '@shared/ui/TrashIcon/TrashIcon'

import cls from './ProductCard.module.scss'

export const ProductCard = ({
  className,
  title,
  content,
  image,
  canLiked,
  canDelete,
  onLiked,
  onDelete,
  liked,
}) => {
  const [likedProduct, setLikedProduct] = useState(liked)

  return (
    <div className={className}>
      <Card sx={{ maxWidth: 345 }} className={cls.wrapper}>
        <div className={cls.imageWrapper}>
          {canLiked && (
            <div className={cls.likedButton}>
              <MyButton
                variant="contained"
                size="icon"
                onClick={() => {
                  setLikedProduct((prev) => !prev)
                  onLiked()
                }}
              >
                {likedProduct ? <LikedIcon /> : <NotLikedIcon />}
              </MyButton>
            </div>
          )}
          {canDelete && (
            <div className={cls.deleteButton}>
              <MyButton variant="contained" size="icon" onClick={onDelete}>
                <TrashIcon />
              </MyButton>
            </div>
          )}
          <CardMedia className={cls.image} component="img" alt={title} height="140" image={image} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={cls.content}>
            {content}
          </Typography>
        </CardContent>
        <CardActions className={cls.buttons}>
          <MyButton variant="contained" className={cls.option}>
            Подробнее
          </MyButton>
          <MyButton variant="outlined" className={cls.option}>
            В корзину
          </MyButton>
        </CardActions>
      </Card>
    </div>
  )
}
