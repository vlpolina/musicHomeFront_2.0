import { useRouter } from 'next/router'
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
  onLiked,
  onDelete,
  liked,
  isAdmin,
}) => {
  const router = useRouter()
  const [likedProduct, setLikedProduct] = useState(liked)
  const slug = 'guitar'

  return (
    <div className={className}>
      <Card sx={{ maxWidth: 345 }} className={cls.wrapper}>
        <div className={cls.imageWrapper}>
          {!isAdmin && (
            <div className={cls.actionButton}>
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
          {isAdmin && (
            <div className={cls.actionButton}>
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
          {isAdmin ? (
            <>
              <MyButton
                variant="contained"
                className={cls.option}
                onClick={() => router.push(`admin/product/${slug}`)}
              >
                Редактировать
              </MyButton>
              <MyButton
                variant="outlined"
                className={cls.option}
                onClick={() => router.push(`/product/${slug}`)}
              >
                Подробнее
              </MyButton>
            </>
          ) : (
            <>
              <MyButton
                variant="contained"
                className={cls.option}
                onClick={() => router.push(`/product/${slug}`)}
              >
                Подробнее
              </MyButton>
              <MyButton variant="outlined" className={cls.option}>
                В корзину
              </MyButton>
            </>
          )}
        </CardActions>
      </Card>
    </div>
  )
}
