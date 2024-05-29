import { useState } from 'react'

import { Alert } from '@mui/material'

import cls from './Notification.module.scss'

export const Notification = ({ text, type, onClose }) => {
  return (
    <div className={cls.alert}>
      <Alert severity={type} onClose={onClose}>
        {text}
      </Alert>
    </div>
  )
}
