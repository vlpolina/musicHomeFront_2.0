import { MyButton } from '../Button/Button'
import { NonImage } from '../NonImage/NonImage'

import cls from './InputImage.module.scss'

export const InputImage = ({ className, src, alt, onChange, onDelete }) => {
  return (
    <div className={className}>
      <div className={cls.imageWrapper}>
        {src ? <img src={src} alt={alt} className={cls.image} /> : <NonImage />}
      </div>
      {src ? (
        <MyButton className={cls.button} variant="outlined" onClick={onDelete}>
          Удалить фото
        </MyButton>
      ) : (
        <MyButton className={cls.button} variant="outlined">
          Добавить фото
          <input type="file" hidden onChange={onChange} />
        </MyButton>
      )}
    </div>
  )
}
