import React from 'react'

import { Typography } from '@mui/material'
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultMarker,
  YMapDefaultSchemeLayer,
  YMapGeolocationControl,
  YMapMarker,
  YMapZoomControl,
} from 'ymap3-components'

import cls from './Map.module.scss'

export const MyMap = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.map}>
        <YMapComponentsProvider apiKey="2eb44e7c-aa56-4e61-8420-1168b0da4c5d" lang="ru_RU">
          <YMap location={{ center: [84.9688, 56.471651], zoom: 13 }} showScaleInCopyrights={true}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            <YMapDefaultMarker coordinates={[84.9788, 56.461651]} />
            <YMapMarker coordinates={[84.9788, 56.461651]}>
              <Typography className={cls.markTitle}>Главный офис</Typography>
            </YMapMarker>
            <YMapDefaultMarker coordinates={[84.966882, 56.477628]} />
            <YMapMarker coordinates={[84.966882, 56.477628]}>
              <Typography className={cls.markTitle}>Склад №1</Typography>
            </YMapMarker>
            <YMapDefaultMarker coordinates={[84.942787, 56.475407]} />
            <YMapMarker coordinates={[84.942787, 56.475407]}>
              <Typography className={cls.markTitle}>Склад №2</Typography>
            </YMapMarker>
          </YMap>
        </YMapComponentsProvider>
      </div>
    </div>
  )
}
