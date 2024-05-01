import { Button, Dialog, DialogTitle } from '@mui/material'

import { CloseIcon } from '@shared/ui/CloseIcon/CloseIcon'

import cls from './Popup.module.scss'

export const Popup = ({ title, children, onClose, open }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <div className={cls.top}>
        <DialogTitle>{title}</DialogTitle>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      <div className={cls.content}>{children}</div>
    </Dialog>
  )
}
