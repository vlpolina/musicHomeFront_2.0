import { useRouter } from 'next/router'

import { Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'

import cls from './ErrorPage.module.scss'

export const ErrorPage = ({ option }) => {
  const router = useRouter()
  return (
    <div className={cls.wrapper}>
      <Typography className={cls.pageTitle} variant="h5">
        Страница не доступна
      </Typography>
      <div className={cls.contentWrapper}>
        {option === 'notAuth' ? (
          <div className={cls.login}>
            <Typography variant="h6">
              Чтобы получить доступ к данной странице, необходимо авторизоваться
            </Typography>
            <MyButton
              variant="contained"
              size="large"
              className={cls.button}
              onClick={() => {
                router.push('/login')
              }}
            >
              Войти
            </MyButton>
          </div>
        ) : (
          <Typography variant="h6">
            Чтобы получить доступ к данной странице, необходимы права администратора
          </Typography>
        )}
      </div>
    </div>
  )
}
