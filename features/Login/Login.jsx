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

import cls from './Login.module.scss'

export const Login = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const login = useCallback(() => {
    setError(null)

    if (!username) return setError('Введите username!')
    if (!password) return setError('Введите пароль!')

    setIsLoading(true)

    api
      .post('token/', { username: username.trim(), password })
      .then(({ data }) => {
        Cookies.set('accessToken', data.access)
        Cookies.set('refreshToken', data.refresh)
        Cookies.set('isAuthorized', true)
        setIsSuccess(true)
      })
      .catch((e) => {
        console.log(e)
        e.response?.status === 401
          ? setError('Ошибка входа, неверный username или пароль!')
          : setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))

    setIsLoading(true)
  }, [username, password, setIsSuccess])

  useEffect(() => {
    if (isSuccess) {
      api
        .get('getUserId/')
        .then(({ data }) => {
          Cookies.set('userId', data.id)
        })
        .catch((e) => {
          console.log(e)
          setError('Ошибка! Что-то пошло не так... ')
        })

      api
        .get('checkAdmin/')
        .then(({ data }) => {
          if (data.is_staff || data.is_superuser) {
            Cookies.set('isAdmin', true)
          }
          router.push('/')
        })
        .catch((e) => {
          console.log(e)
          setError('Ошибка! Что-то пошло не так... ')
        })
        .finally(() => setIsLoading(false))
    }
  }, [isSuccess])

  return (
    <>
      {error && <ServerErrorMessage error={error} />}
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Вход
        </Typography>
        <div className={cls.form}>
          <MyInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <OutlinedInput
            className={cls.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {isLoading && <Spinner className={cls.spinner} />}
          <div className={cls.buttons}>
            <MyButton className={cls.button} variant="contained" size="large" onClick={login}>
              Войти
            </MyButton>
            <MyButton
              className={cls.button}
              variant="outlined"
              size="large"
              onClick={() => router.push('/signup')}
            >
              Зарегистрироваться
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
