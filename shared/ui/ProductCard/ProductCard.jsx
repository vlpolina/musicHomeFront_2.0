import { useRouter } from 'next/router'
import { React, useEffect, useState } from 'react'

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
  id,
  title,
  content,
  image,
  slug,
  cost,
  changeStatus,
  status,
  isCatalog,
  isAuthorized,
  isAdmin,
}) => {
  const router = useRouter()

  const [isLiked, setIsLiked] = useState()
  const [inTrash, setInTrash] = useState()

  useEffect(() => {
    if (status) {
      setIsLiked(status.liked)
      setInTrash(status.trash)
    }
  }, [status])

  return (
    <div className={className}>
      <Card sx={{ maxWidth: 345 }} className={cls.wrapper}>
        <div className={cls.imageWrapper}>
          {isCatalog && isAuthorized && (
            <div className={cls.actionButton}>
              <MyButton
                variant="contained"
                size="icon"
                onClick={() => {
                  setIsLiked((prev) => !prev)
                  changeStatus({
                    productId: Number(id),
                    productCost: Number(cost),
                    option: 'toLike',
                  })
                }}
              >
                {isLiked ? <LikedIcon /> : <NotLikedIcon />}
              </MyButton>
            </div>
          )}
          {isAdmin && isAuthorized && !isCatalog && (
            <div className={cls.actionButton}>
              <MyButton variant="contained" size="icon" onClick={onDelete}>
                <TrashIcon />
              </MyButton>
            </div>
          )}
          <CardMedia className={cls.image} component="img" alt={title} height="140" image={image} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className={cls.title}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" className={cls.cost}>
            {cost} руб.
          </Typography>
          <Typography variant="body2" color="text.secondary" className={cls.content}>
            {content}
          </Typography>
        </CardContent>
        <CardActions className={cls.buttons}>
          {isAdmin && !isCatalog ? (
            <>
              {isAuthorized && (
                <MyButton
                  variant="contained"
                  className={cls.option}
                  onClick={() => router.push(`admin/product/${slug}`)}
                >
                  Редактировать
                </MyButton>
              )}
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
              {isAuthorized &&
                (!inTrash ? (
                  <MyButton
                    variant="outlined"
                    className={cls.option}
                    onClick={() =>
                      changeStatus({
                        productId: Number(id),
                        productCost: Number(cost),
                        option: 'toBuy',
                      })
                    }
                  >
                    В корзину
                  </MyButton>
                ) : (
                  <MyButton
                    variant="contained"
                    className={cls.option}
                    onClick={() =>
                      changeStatus({
                        productId: Number(id),
                        productCost: Number(cost),
                        option: 'toBuy',
                      })
                    }
                  >
                    В корзине
                  </MyButton>
                ))}
            </>
          )}
        </CardActions>
      </Card>
    </div>
  )
}
