import { Typography } from '@mui/material'

import cls from './ServerErrorMessage.module.scss'

export const ServerErrorMessage = ({ className, error }) => {
  return (
    <div className={className}>
      <Typography className={cls.text}>{error}</Typography>
    </div>
  )
}
