import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'

import { MyButton } from '@shared/ui/Button/Button'
import { Popup } from '@shared/ui/Popup/Popup'
import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'

import cls from './Filters.module.scss'

export const Filters = ({
  modal,
  setModal,
  popupError,
  sortIncreaseCost,
  setSortIncreaseCost,
  sortDecreaseCost,
  setSortDecreaseCost,
  minCost,
  setMinCost,
  maxCost,
  setMaxCost,
  customers,
  customerFilter,
  setCustomerFilter,
  applyFilters,
  resetFilters,
}) => {
  return (
    <Popup onClose={() => setModal(false)} open={modal} title="Фильтры товаров">
      {popupError && <ServerErrorMessage error={popupError} />}
      <div className={cls.filtersContent}>
        <FormControlLabel
          label="Сортировать по возрастанию цены"
          control={
            <Checkbox
              checked={sortIncreaseCost}
              onChange={() => {
                setSortIncreaseCost(!sortIncreaseCost)
                setSortDecreaseCost(false)
              }}
              disabled={sortDecreaseCost}
            />
          }
        />
        <FormControlLabel
          label="Сортировать по убыванию цены"
          control={
            <Checkbox
              checked={sortDecreaseCost}
              onChange={() => {
                setSortDecreaseCost(!sortDecreaseCost)
                setSortIncreaseCost(false)
              }}
              disabled={sortIncreaseCost}
            />
          }
        />
        <TextField
          className={cls.input}
          label="Цена от"
          type="number"
          value={minCost}
          onChange={(e) => setMinCost(e.target.value)}
        />
        <TextField
          className={cls.input}
          label="Цена до"
          type="number"
          value={maxCost}
          onChange={(e) => setMaxCost(e.target.value)}
        />

        <div className={cls.customers}>
          <Typography className={cls.customersTitle}>Производители</Typography>
          {customers.map((i) => (
            <FormControlLabel
              key={i.id}
              control={
                <Checkbox
                  checked={customerFilter.some((item) => item.id === i.id)}
                  onChange={() =>
                    setCustomerFilter(
                      customerFilter.some((item) => item.id === i.id)
                        ? customerFilter.filter((item) => item.id !== i.id)
                        : [...customerFilter, i]
                    )
                  }
                />
              }
              label={i.name}
            />
          ))}
        </div>
        <MyButton variant="contained" onClick={applyFilters}>
          Применить
        </MyButton>
        <MyButton variant="outlined" onClick={resetFilters}>
          Сбросить фильтры
        </MyButton>
      </div>
    </Popup>
  )
}
