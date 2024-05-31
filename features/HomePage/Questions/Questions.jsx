import { useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoIcon from '@mui/icons-material/Info'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import cls from './Questions.module.scss'

export const Questions = ({ question, answer, conf }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {conf ? <InfoIcon className={cls.icon} /> : <HelpOutlineIcon className={cls.icon} />}
        </ListItemIcon>
        <ListItemText primary={question} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <InfoIcon className={cls.icon} />
            </ListItemIcon>
            <ListItemText primary={answer} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}
