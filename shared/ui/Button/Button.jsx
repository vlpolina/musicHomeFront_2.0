import * as React from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})(({ variant, size }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
  padding:
    size === 'small'
      ? '4px 10px'
      : size === 'large'
        ? '8px 24px'
        : size === 'icon'
          ? '8px'
          : '6px 16px',
  border: '1px solid',
  borderRadius: '8px',
  lineHeight: 1.5,
  backgroundColor: variant === 'contained' ? '#1561F8' : '#FFFFFF',
  borderColor: variant === 'contained' ? '#FFFFFF' : '#1561F8',
  color: variant === 'contained' ? '#FFFFFF' : '#1561F8',
  fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
  '&:hover': {
    backgroundColor: variant === 'contained' ? '#0045CF' : '#F2F2F2',
    borderColor: variant === 'contained' ? '#F2F2F2' : '#0045CF',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: variant === 'contained' ? '#0038A7' : '#FFFFFF',
    borderColor: variant === 'contained' ? '#FFFFFF' : '#0038A7',
  },
}))

export const MyButton = ({ className, children, variant, size }) => {
  return (
    <StyledButton className={className} size={size} variant={variant}>
      {children}
    </StyledButton>
  )
}
