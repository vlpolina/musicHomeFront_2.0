import React, { ReactNode } from 'react'

import cls from './Button.module.scss'

export const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = ButtonVariants.PRIMARY,
  Icon,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={
        (variant === ButtonVariants.PRIMARY && cls.primary) ||
        (variant === ButtonVariants.PRIMARYNARROW && cls.primaryNarrow) ||
        (variant === ButtonVariants.SECONDARY && cls.secondary) ||
        (variant === ButtonVariants.SECONDARYNARROW && cls.secondaryNarrow)
      }
    >
      {Icon && <Icon />}
      {children}
    </button>
  )
}

export default Button
