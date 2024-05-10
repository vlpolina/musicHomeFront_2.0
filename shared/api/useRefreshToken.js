import Cookies from 'js-cookie'

import { api } from '@shared/api/api'

export const refreshToken = () => {
  api
    .post('token/refresh/', { refresh: Cookies.get('refreshToken') })
    .then(({ data }) => {
      Cookies.set('accessToken', data.access)
    })
    .catch((e) => {
      console.log(e)
    })

  return Cookies.get('accessToken')
}
