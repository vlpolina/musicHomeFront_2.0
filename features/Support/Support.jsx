import { Typography } from '@mui/material'

// import useSession from '@shared/lib/hooks/useSession'
import cls from './Support.module.scss'

export const Support = () => {
  //   const { user } = useSession()

  return (
    <div className={cls.wrapper}>
      <Typography className={cls.info}>
        При возникновении проблем при работе с сайтом Вы можете обратиться в нашу тех. поддержку,
        заполнив данную форму:
      </Typography>

      <div className={cls.form}></div>
    </div>
  )
}
