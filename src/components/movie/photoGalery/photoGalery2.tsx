'use client'
import { FC, useState } from 'react'
import cls from './photoGalery.module.scss'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import defaultImage from '@/assets/img/noimage.png'
import SafeImage from '@/components/UI/safeImage/safeImage'
import { Image } from '@/kinopoiskDev/@types/images'
import React from 'react'
import { useToggle } from '@/hooks/useToggle'

interface R {
	items: Image[]
}

const PhotoGalery2: FC<R> = ({ items }) => {
	function onError(e: any) {
		// if (e.target) {
		// 	console.log(e)
		// 	e.target.src = defaultImage.src
		// }
	}

	const data = items.map(img => ({
		original: img.url,
		thumbnail: img.previewUrl,
		originalAlt: img.type,
		thumbnailAlt: img.type,
		renderItem(e: ReactImageGalleryItem) {
			return (
				<div className="h-[55vh]">
					<SafeImage
						src={e.original}
						errorImage={defaultImage}
						alt={e.originalAlt!}
						fill
						className="object-scale-down"
					/>
				</div>
			)
		},
		renderThumbInner(e: ReactImageGalleryItem) {
			return (
				<span className="flex h-16 image-gallery-thumbnail-inner">
					<SafeImage
						src={e.thumbnail!}
						errorImage={defaultImage}
						alt={e.thumbnailAlt!}
						fill
						className="object-scale-down image-gallery-thumbnail-image"
					/>
				</span>
			)
		},
	}))

	const [fullScreen, fullScreenToggle] = useToggle(false)
	function changeMode(e: boolean) {
		fullScreenToggle(e)
	}

	return (
		<div className={`${cls.container}${fullScreen ? ' ' + cls.fullscreen : ''}`}>
			<ImageGallery
				// showBullets
				onScreenChange={changeMode}
				showIndex
				thumbnailPosition="left"
				onErrorImageURL={defaultImage.src}
				items={data}
				onThumbnailError={onError}
				onImageError={onError}
			/>
		</div>
	)
}

export default PhotoGalery2

{
	/* <button type="button" tabindex="0" aria-pressed="true" aria-label="Go to Slide 1" class="image-gallery-thumbnail active"><span class="image-gallery-thumbnail-inner"><img class="image-gallery-thumbnail-image" src="https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/da6e695e-19e4-4d1c-a877-0577dfd5e412/360" alt="promo"></span></button>
<span class="image-gallery-thumbnail-inner"><img class="image-gallery-thumbnail-image" src="https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/da6e695e-19e4-4d1c-a877-0577dfd5e412/360" alt="promo"></span>
<img class="image-gallery-thumbnail-image" src="https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/da6e695e-19e4-4d1c-a877-0577dfd5e412/360" alt="promo"></img> */
}
