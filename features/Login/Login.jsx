import { useRouter } from 'next/router'
import { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { MyInput } from '@shared/ui/Input/Input'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './Login.module.scss'

export const Login = () => {
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
          Вход
        </Typography>
        <div className={cls.form}>
          <MyInput
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <div className={cls.buttons}>
            <MyButton className={cls.button} variant="contained" size="large">
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
