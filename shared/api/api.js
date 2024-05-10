import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import Cookies from 'js-cookie'

import { refreshToken } from './useRefreshToken'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Cache-Control': 'no-cache',
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
  }),
  timeout: 22000,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && Cookies.get('accessToken')) {
    config.headers.Authorization = 'Bearer ' + Cookies.get('accessToken')
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      const newAccessToken = await refreshToken()
      Cookies.set('accessToken', newAccessToken)
      config.headers.Authorization = 'Bearer ' + Cookies.get('accessToken')
      return privateApi
    }
    return Promise.reject(error)
  }
)

export const isApiError = (error) => axios.isAxiosError(error)
