import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import PhoneInput from 'react-phone-input-2'

import { TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'

import cls from './Profile.module.scss'

const inputStyles = {
  width: '100%',
  borderRadius: '8px',
  lineHeight: '1.5',
  border: '1.5px solid',
  borderColor: '#d4d3d3',
  borderRadius: '8px',
  padding: '16.5px 14px',

  '&:active': {
    borderColor: '#1561f8',
  },
}

const buttonStyles = {
  borderRadius: '8px 0 0 8px',
}

export const Profile = (id) => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const logout = useCallback(() => {
    setError(null)
    setIsLoading(true)

    api
      .post('user/logout/')
      .then(() => {
        Cookies.remove('isAuthorized')
        Cookies.remove('isAdmin')
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        router.push('/')
      })
      .catch((e) => {
        console.log(e)
        if (e.response?.status === 401) {
          Cookies.remove('isAuthorized')
          Cookies.remove('isAdmin')
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          router.push('/')
        } else setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={cls.wrapper}>
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          Мой профиль
        </Typography>
        <div className={cls.buttons}>
          <MyButton
            variant="contained"
            size="large"
            // onClick={() => {

            // }}
          >
            Сохранить изменения
          </MyButton>
          <MyButton
            variant="outlined"
            size="large"
            onClick={() => {
              router.push('/')
            }}
          >
            На главную
          </MyButton>
        </div>
      </div>

      <div className={cls.editor}>
        <TextField
          className={cls.input}
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={cls.input}
          label="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          className={cls.input}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={cls.input}
          label="Адрес доставки"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />

        <PhoneInput
          specialLabel="Номер телефона"
          country="ru"
          onlyCountries={['ru']}
          value={phone}
          onChange={(e) => setPhone(e)}
          inputStyle={inputStyles}
          buttonStyle={buttonStyles}
          placeholder="+7 (000) 000-00-00"
        />

        <MyButton variant="contained" size="large" onClick={logout}>
          Выйти из аккаунта
        </MyButton>
      </div>
    </div>
  )
}
