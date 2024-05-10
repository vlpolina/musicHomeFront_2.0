import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'

import { isValidEmail, isValidPassword, isValidUsername } from '@helpers/validateUserData'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { MyInput } from '@shared/ui/Input/Input'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './Signup.module.scss'

export const Signup = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSucess] = useState(false)

  const signup = useCallback(() => {
    setError(null)

    if (!username) return setError('Поле "Username" обязательно для заполнения!')
    if (!isValidUsername(username)) return setError('Некорректный формат Username!')
    if (!email) return setError('Поле "Email" обязательно для заполнения!')
    if (!isValidEmail(email)) return setError('Некорректный формат Email!')
    if (!password) return setError('Поле "Придумайте пароль" обязательно для заполнения!')
    if (!isValidPassword(password))
      return setError(
        'Пароль должен содержать от 8 до 24 символов и хотя бы один специальный символ, одну строчную и заглавную букву'
      )
    if (!repeatPassword) return setError('Поле "Повторите пароль" обязательно для заполнения!')
    if (password !== repeatPassword) return setError('Пароли не совпадают!')

    setIsLoading(true)

    api
      .post('signup/', { username: username.trim(), email: email.trim(), password })
      .then(() => setIsSucess(true))
      .catch((e) => {
        console.log(e)
        e.response.status === 400
          ? setError('Пользователь с таким адресом электронной почты уже существует!')
          : setError('Ошибка! Что-то пошло не так... Попробуйте другое имя пользователя')
      })
      .finally(() => setIsLoading(false))
  }, [username, email, password, repeatPassword])

  return (
    <>
      {error && <ServerErrorMessage error={error} />}
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Регистрация
        </Typography>
        <div className={cls.form}>
          <MyInput
            placeholder="Username *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MyInput
            placeholder="Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <OutlinedInput
            className={cls.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Придумайте пароль *"
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
          <OutlinedInput
            className={cls.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Повторите пароль *"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
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
            <MyButton variant="contained" size="large" onClick={signup}>
              Зарегистрироваться
            </MyButton>
            <MyButton variant="outlined" size="large" onClick={() => router.push('/login')}>
              Уже зарегистрирован, войти
            </MyButton>
          </div>
          {isSuccess && (
            <Typography className={cls.success}>
              Регистрация прошла успешно! Вы можете войти в аккаунт на странице входа.
            </Typography>
          )}
        </div>
      </div>
    </>
  )
}
