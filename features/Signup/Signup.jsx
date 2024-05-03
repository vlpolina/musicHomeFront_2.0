import { useRouter } from 'next/router'
import { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { MyInput } from '@shared/ui/Input/Input'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './Signup.module.scss'

export const Signup = () => {
  //   const { user } = useSession()
  const router = useRouter()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  //   const [errorCode, setErrorCode] = useState(null)

  return (
    <>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.wrapper}>
        <Typography className={cls.pageTitle} variant="h5">
          Регистрация
        </Typography>
        <div className={cls.form}>
          <div className={cls.name}>
            <MyInput placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <MyInput
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <MyInput
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <OutlinedInput
            className={cls.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Придумайте пароль"
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
            placeholder="Повторите пароль"
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
          <div className={cls.buttons}>
            <MyButton variant="contained" size="large">
              Зарегистрироваться
            </MyButton>
            <MyButton variant="outlined" size="large" onClick={() => router.push('/login')}>
              Уже зарегистрирован, войти
            </MyButton>
          </div>
        </div>
      </div>
    </>
  )
}
