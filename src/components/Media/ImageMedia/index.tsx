import React from 'react'
import type { Props as MediaProps } from '../types'
import { getServerSideURL } from '@/utilities/getURL'
import styles from './ImageMedia.module.scss'
// import Head from 'next/head'

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    imgClassName = '',
    priority = false,
    resource,
    size: sizeFromProps,
    loading: loadingFromProps,
    imgClassNameSecond = '',
    fill = false,
  } = props

  if (resource && typeof resource === 'object') {
  } else {
    console.log('Fehler: Folgende Quelle nicht vorhanden', resource)
    return null
  }

  const { alt, url, sizes } = resource!
  const { square, small, medium, large } = sizes!

  const width = 1000
  const height = 600

  const { url: xSmallUrl, width: xSmallUrlWidth } = square!
  const { url: smallUrl, width: smallUrlWidth } = small!
  const { url: mediumUrl, width: mediumUrlWidth } = medium!
  const { url: largeUrl, width: largeUrlWidth } = large!

  const src = `${getServerSideURL()}${url}` // main URL
  const imgXS = `${getServerSideURL()}${xSmallUrl}`
  const imgS = `${getServerSideURL()}${smallUrl}`
  const imgM = `${getServerSideURL()}${mediumUrl}`
  const imgL = `${getServerSideURL()}${largeUrl}`

  const loading = loadingFromProps || 'lazy'

  return (
    <>
      {/* {priority && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={imgL}
            imageSrcSet={`${imgXS} 420w, ${imgS} 600w, ${imgM} 800w, ${imgL} 1000w`}
            imageSizes="100vw"
          />
        </Head>
      )} */}
      <picture
        className={`${styles.mediaPictureContainer} ${styles[imgClassName]} ${styles[imgClassNameSecond]}`}
      >
        <img
          fetchPriority={priority ? 'high' : 'auto'}
          alt={alt || 'Artikel-Bild'}
          loading={loading}
          src={src ? src : ''}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          srcSet={`${imgXS} 420w, ${imgS} 600w, ${imgM} 800w, ${imgL} 1000w`}
          sizes={sizeFromProps || '100vw'}
        />
      </picture>
    </>
  )
}
