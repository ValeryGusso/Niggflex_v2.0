'use client'
import React, { FC } from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import cls from './photoGalery.module.scss'
import defaultImage from '@/assets/img/noimage.png'
import SafeImage from '@/components/UI/safeImage/safeImage'
import { Image } from '@/kinopoiskDev/@types/images'
import { useToggle } from '@/hooks/useToggle'

interface PhotoGaleryProps {
	items: Image[]
}

const PhotoGalery2: FC<PhotoGaleryProps> = ({ items }) => {
	const [fullScreen, fullScreenToggle] = useToggle(false)

	function changeMode(e: boolean) {
		fullScreenToggle(e)
	}

	const data = items.map(img => ({
		original: img.url,
		thumbnail: img.previewUrl,
		originalAlt: img.type,
		thumbnailAlt: img.type,
		renderItem(e: ReactImageGalleryItem) {
			return (
				<div className={`${fullScreen ? 'h-[100vh]' : 'h-[60vh]'}`}>
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

	return (
		<div className={cls.container}>
			<ImageGallery
				onScreenChange={changeMode}
				showIndex
				thumbnailPosition="left"
				onErrorImageURL={defaultImage.src}
				items={data}
			/>
		</div>
	)
}

export default PhotoGalery2
