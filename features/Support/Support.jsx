import { Typography } from '@mui/material'

// import useSession from '@shared/lib/hooks/useSession'
import cls from './Support.module.scss'

export const Support = () => {
  //   const { user } = useSession()

  return (
    <div className={cls.wrapper}>
      <Typography className={cls.info}>
        При возникновении проблем при работе с сайтом Вы можете обратиться в нашу тех. поддержку,
        заполнив данную форму:
      </Typography>
      <Typography className={cls.formText}>
        {'(в случае некорректного отображения формы, вы можете заполнить ее'}{' '}
        <a href="https://forms.yandex.ru/cloud/6631f2d97c1515e8e45e3240/" target="_blank">
          {'по этой ссылке)'}
        </a>
      </Typography>
      <script src="https://yastatic.net/s3/frontend/forms/_/embed.js" />
      <iframe
        className={cls.supportForm}
        src="https://forms.yandex.ru/cloud/6631f2d97c1515e8e45e3240/?iframe=1"
        name="ya-form-6631f2d97c1515e8e45e3240"
        width="100%"
        height="100%"
      />

      <div className={cls.form}></div>
    </div>
  )
}
