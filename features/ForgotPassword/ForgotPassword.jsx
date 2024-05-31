import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { MyInput } from '@shared/ui/Input/Input'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './ForgotPassword.module.scss'

export const ForgotPassword = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const resetPassword = useCallback(() => {
    setError(null)

    if (!username) return setError('Введите логин!')
    if (!email) return setError('Введите адрес электронной почты!')

    setIsLoading(true)

    api
      .post('token/forgotPassword/', { email: email.trim() })
      .then(({ data }) => {
        setIsSuccess(true)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))

    setIsLoading(true)
  }, [username, email])

  return (
    <>
      {error && <ServerErrorMessage error={error} />}
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Восстановление пароля
        </Typography>
        <Typography className={cls.text}>
          Укажите логин и адрес электронной почты, указанные в Вашей учетной записи. На указанную
          почту будет выслано письмо с ссылкой на страницу восстановления пароля.
        </Typography>
        <div className={cls.form}>
          <MyInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MyInput
            placeholder="Адрес электронной почты"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isLoading && <Spinner className={cls.spinner} />}
          <div className={cls.buttons}>
            <MyButton
              className={cls.button}
              variant="contained"
              size="large"
              onClick={resetPassword}
            >
              Отправить
            </MyButton>
            <MyButton
              className={cls.button}
              variant="outlined"
              size="large"
              onClick={() => router.push('/login')}
            >
              Вернуться
            </MyButton>
          </div>
          {isSuccess && (
            <Typography className={cls.success}>
              Письмо с ссылкой на страницу сброса пароля отправлено на {email}.
            </Typography>
          )}
        </div>
      </div>
    </>
  )
}
