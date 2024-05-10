import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { Autocomplete, Button, Input, TextField, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { InputImage } from '@shared/ui/InputImage/InputImage'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './AdminProductEditor.module.scss'

export const AdminProductEditor = (id) => {
  const router = useRouter()
  const IMAGE = '/img/logo.svg'
  //   const { user } = useSession()

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [count, setCount] = useState(0)
  const [customer, setCustomer] = useState('')
  const [image, setImage] = useState(IMAGE)

  const categoryOptions = useMemo(
    () => [
      { id: '1', title: 'Струнные инструменты' },
      { id: '2', title: 'Клавишные инструменты' },
      { id: '3', title: 'Духовые инструменты' },
    ],
    []
  ).map((option) => option.title)

  const customerOptions = useMemo(
    () => [
      { id: '1', title: 'YAMAHA' },
      { id: '2', title: 'RockDale' },
      { id: '3', title: 'CASIO' },
    ],
    []
  ).map((option) => option.title)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className={cls.wrapper}>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          {id ? 'Администрирование: редактирование товара' : 'Администрирование: создание товара'}
        </Typography>
        <MyButton
          variant="outlined"
          onClick={() => {
            router.push('/admin')
          }}
        >
          Назад
        </MyButton>
      </div>
      <div className={cls.editorWrapper}>
        <InputImage
          src={image}
          alt="Изображение товара"
          onChange={handleFileChange}
          onDelete={() => {
            setImage(null)
          }}
        />
        <div className={cls.editor}>
          <Autocomplete
            className={cls.input}
            options={categoryOptions}
            value={category}
            onChange={(event, newValue) => {
              setCategory(newValue)
            }}
            renderInput={(params) => (
              <TextField {...params} label="Выберите или введите категорию" />
            )}
            filterOptions={(options, state) => {
              const inputValue = state.inputValue.toLowerCase()
              return options.filter((option) => option.toLowerCase().includes(inputValue))
            }}
            noOptionsText={<Button>Добавить категорию</Button>}
            // noOptionsText={<Button onClick={onAdd}>Добавить категорию</Button>}
          />
          <TextField
            className={cls.input}
            label="Название товара"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={cls.input}
            label="Короткое описание"
            multiline
            maxRows={3}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
          <TextField
            className={cls.input}
            label="Полное описание"
            multiline
            maxRows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            className={cls.input}
            label="Цена товара"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <TextField
            className={cls.input}
            label="Количество товара"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <Autocomplete
            className={cls.input}
            options={customerOptions}
            value={customer}
            onChange={(event, newValue) => {
              setCustomer(newValue)
            }}
            renderInput={(params) => (
              <TextField {...params} label="Выберите или введите поставщика" />
            )}
            filterOptions={(options, state) => {
              const inputValue = state.inputValue.toLowerCase()
              return options.filter((option) => option.toLowerCase().includes(inputValue))
            }}
            noOptionsText={<Button>Добавить поставщика</Button>}
            // noOptionsText={<Button onClick={onAdd}>Добавить категорию</Button>}
          />
          <MyButton variant="contained">Сохранить</MyButton>
        </div>
      </div>
    </div>
  )
}
