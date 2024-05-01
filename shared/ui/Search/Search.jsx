import { Button, OutlinedInput } from '@mui/material'
import { styled } from '@mui/material/styles'

import cls from './Search.module.scss'

const StyledInput = styled(OutlinedInput)({
  boxShadow: 'none',
  textTransform: 'none',
  border: '1px solid',
  borderRadius: '8px 0 0 8px',
  lineHeight: 1.5,
  borderColor: '#d4d3d3',
  fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
  '&:focus': {
    cursor: 'text',
  },
  '&:active': {
    borderColor: '#1561f8',
  },
})

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '16px',
  padding: '0 32px',
  border: '1px solid',
  borderRadius: '0 8px 8px 0',
  lineHeight: 1.5,
  backgroundColor: '#d4d3d3',
  borderColor: '#d4d3d3',
  color: '#000000',
  fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
  '&:hover': {
    backgroundColor: '#F2F2F2',
    borderColor: '#000000',
    boxShadow: 'none',
  },
})

export const Search = ({ className, size, value, onChange, placeholder, onClick }) => {
  return (
    <div className={className}>
      <div className={cls.search}>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          size={size}
          inputProps={{ style: { borderColor: '#1561f8' } }}
          fullWidth
        />
        <StyledButton onClick={onClick}>Найти</StyledButton>
      </div>
    </div>
  )
}
