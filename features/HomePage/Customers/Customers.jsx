import { React } from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

import cls from './Customers.module.scss'

export const Customers = ({ className, image }) => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }} className={cls.wrapper}>
        <div className={cls.imageWrapper}>
          <CardMedia className={cls.image} component="img" image={image} />
        </div>
      </Card>
    </div>
  )
}
