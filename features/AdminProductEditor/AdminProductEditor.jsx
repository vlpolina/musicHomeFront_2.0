import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Autocomplete, Button, TextField, Typography } from '@mui/material'

import { Notification } from '@features/Notification/Notification'

import { api } from '@shared/api/api'
import { MyButton } from '@shared/ui/Button/Button'
import { InputImage } from '@shared/ui/InputImage/InputImage'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import cls from './AdminProductEditor.module.scss'

export const AdminProductEditor = ({ slug }) => {
  const router = useRouter()

  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [count, setCount] = useState(0)
  const [customer, setCustomer] = useState('')
  const [customers, setCustomers] = useState([])
  const [image, setImage] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [published, setPublished] = useState(false)
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [notif, setNotif] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const update = useCallback(() => {
    setError(null)

    if (!title.trim()) setError('Укажите название товара!')
    if (!shortDesc.trim()) setError('Укажите короткое описание товара!')
    if (cost === 0) setError('Укажите цену товара!')
    if (count === 0) setError('Укажите количество товара!')

    setIsLoading(true)

    slug &&
      api
        .put(`crudAdminProducts/${slug}/`, {
          cat: Number(categories.find((i) => i.name === category).id),
          name: String(title.trim()),
          cost: Number(cost),
          count: Number(count),
          custom_name: Number(customers.find((i) => i.name === customer).id),
          long_desc: String(description.trim()),
          short_desc: String(shortDesc.trim()),
        })
        .then(() => {
          // push
        })
        .catch((e) => {
          console.log(e)
          // setError('Ошибка! Что-то пошло не так...')
          setNotif(true)
        })
        .finally(() => setIsLoading(false))
  }, [category, title, shortDesc, description, cost, count, customer, image])

  const publicate = useCallback(() => {}, [published])

  useEffect(() => {
    setError(null)
    setIsLoading(true)

    slug &&
      api
        .get(`crudAdminProducts/${slug}/`)
        .then(({ data }) => {
          setCategory(categories.find((i) => i.id === data.cat).name)
          setTitle(data.name)
          setShortDesc(data.short_desc)
          setDescription(data.long_desc)
          setCost(data.cost)
          setCount(data.count)
          setCustomer(customers.find((i) => i.id === data.custom_name).name)
          setImage(data.photo)
          setPublished(data.is_published)
          setCreatedAt(data.time_create)
          setUpdatedAt(data.time_update)
        })
        .catch((e) => {
          console.log(e)
          setError('Ошибка! Что-то пошло не так...')
        })

    api
      .get('catalog/cats/')
      .then(({ data }) => {
        setCategories(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })

    api
      .get('catalog/customers/')
      .then(({ data }) => {
        setCustomers(data)
      })
      .catch((e) => {
        console.log(e)
        setError('Ошибка! Что-то пошло не так...')
      })
      .finally(() => setIsLoading(false))
  }, [slug])

  return (
    <div className={cls.wrapper}>
      {error && <ServerErrorMessage error={error} />}
      <div className={cls.top}>
        <Typography className={cls.pageTitle} variant="h5">
          {slug ? 'Администрирование: редактирование товара' : 'Администрирование: создание товара'}
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
        <div className={cls.column}>
          <InputImage
            src={image}
            alt="Изображение товара"
            onChange={handleFileChange}
            onDelete={() => {
              setImage(null)
            }}
          />
          <Typography>Товар добавлен: {createdAt.slice(0, 19).replace('T', ' в ')}</Typography>
          <Typography>
            Последнее обновление: {updatedAt.slice(0, 19).replace('T', ' в ')}
          </Typography>
        </div>
        <div className={cls.editor}>
          <Autocomplete
            className={cls.input}
            options={categories.map((i) => i.name)}
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
            disabled={slug !== undefined}
          />
          <Autocomplete
            className={cls.input}
            disabled={slug !== undefined}
            options={customers.map((i) => i.name)}
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
          />
          <MyButton variant="contained" onClick={update}>
            Сохранить
          </MyButton>
          {published ? (
            <MyButton variant="contained">Опубликовано</MyButton>
          ) : (
            <MyButton variant="outlined">Опубликовать</MyButton>
          )}
          {isLoading && <Spinner className={cls.spinner} />}
        </div>
      </div>
      {notif && (
        <Notification
          text="Данные товара успешно обновлены!"
          type="success"
          onClose={() => setNotif(false)}
        />
      )}
    </div>
  )
}
