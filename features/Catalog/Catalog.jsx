import { useState } from 'react'

import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { FilterIcon } from '@shared/ui/FilterIcon/FilterICon'
import { MyInput } from '@shared/ui/Input/Input'
import { Popup } from '@shared/ui/Popup/Popup'
import { ProductCard } from '@shared/ui/ProductCard/ProductCard'
import { Search } from '@shared/ui/Search/Search'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './Catalog.module.scss'

export const Catalog = () => {
  const IMAGE = '/img/logo.svg'
  const images = [
    '/img/casio_logo.svg',
    '/img/fender_logo.svg',
    '/img/ibanez_logo.svg',
    '/img/yamaha_logo.svg',
  ]
  //   const { user } = useSession()

  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [minCost, setMinCost] = useState()
  const [maxCost, setMaxCost] = useState()
  const [customers, setCustomers] = useState(['Yamaha', 'CASIO', 'RockDale'])
  const [errorCode, setErrorCode] = useState(null)

  const category = 'Гитары'
  return (
    <div className={cls.wrapper}>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <Typography className={cls.pageTitle} variant="h5">
        Каталог: {category}
      </Typography>

      <div className={cls.filters}>
        <Search
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cls.search}
        />
        <MyButton
          variant="contained"
          size="large"
          className={cls.filterButton}
          onClick={() => {
            setModal(true)
          }}
        >
          Фильтры <FilterIcon />
        </MyButton>
      </div>
      <div className={cls.productsWrapper}>
        <div className={cls.products}>
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
          <ProductCard
            title={'Гитара'}
            content={
              ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, temporibus. Fugit temporibus perferendis cum, enim ratione consequuntur nesciunt explicabo officiis veniam, nulla animi harum. Blanditiis velit veniam perferendis iste recusandae!'
            }
            image={IMAGE}
          />
        </div>
      </div>

      {modal && (
        <Popup onClose={() => setModal(false)} open={modal} title="Фильтры товаров">
          <div className={cls.filtersContent}>
            <MyInput
              placeholder="Цена от"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value)}
            />
            <MyInput
              placeholder="Цена до"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
            />
            <div className={cls.customers}>
              <Typography className={cls.customersTitle}>Производители</Typography>
              {customers.map((i) => (
                <FormControlLabel key={i} control={<Checkbox defaultChecked />} label={i} />
              ))}
            </div>
            <MyButton variant="contained">Применить</MyButton>
          </div>
        </Popup>
      )}
    </div>
  )
}
