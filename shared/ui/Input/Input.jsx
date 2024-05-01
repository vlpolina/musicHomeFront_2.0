import { OutlinedInput } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledInput = styled(OutlinedInput)({
  boxShadow: 'none',
  textTransform: 'none',
  border: '1px solid',
  borderRadius: '8px',
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

export const MyInput = ({ className, size, value, onChange, placeholder }) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      size={size}
      inputProps={{ style: { borderColor: '#1561f8' } }}
      fullWidth
    />
  )
}
