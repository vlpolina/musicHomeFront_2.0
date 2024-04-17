import { useState } from 'react'

import { Button } from '@mui/material'

// import useSession from '@shared/lib/hooks/useSession'
// import { ServerErrorMessage } from '@shared/ui/ServerErrorMessage/ServerErrorMessage'
import cls from './HomePage.module.scss'

export const HomePage = () => {
  //   const { user } = useSession()

  //   const [errorCode, setErrorCode] = useState(null)

  return (
    <>
      {/* {errorCode && <ServerErrorMessage error={errorCode} />} */}
      <div className={cls.wrapper}>HomePage</div>
    </>
  )
}
