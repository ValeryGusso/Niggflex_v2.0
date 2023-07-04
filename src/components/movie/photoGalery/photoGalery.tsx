'use client'
import React, { FC, useCallback, useRef, useState } from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import cls from './photoGalery.module.scss'
import defaultImage from '@/assets/img/noimage.png'
import SafeImage from '@/components/UI/safeImage/safeImage'
// import { Image } from '@/kinopoiskDev/@types/images'
import { useToggle } from '@/hooks/useToggle'
import { Image } from '@openmoviedb/kinopoiskdev_client'

interface PhotoGaleryProps {
	items: Image[]
	total: number
	movieId: number
}

interface PageStatus {
	page: number
	loading: boolean
	curIndex: number
}

const PhotoGalery: FC<PhotoGaleryProps> = ({ items, total, movieId }) => {
	const [photo, setPhoto] = useState<Image[]>([...items])
	const [fullScreen, fullScreenToggle] = useToggle(false)
	const pageStatus = useRef<PageStatus>({ page: 2, loading: false, curIndex: 0 })

	const changeMode = useCallback((e: boolean) => {
		fullScreenToggle(e)
	}, [])

	const onSlide = useCallback(
		async (i: number) => {
			pageStatus.current.curIndex = i

			if (i > photo.length - 5 && pageStatus.current.page * 30 < total && !pageStatus.current.loading) {
				pageStatus.current.loading = true
				const res = await fetch('/api/movie/updateImage', {
					method: 'POST',
					body: JSON.stringify({ id: movieId, page: pageStatus.current.page }),
				})

				const data: { images: Image[] } = await res.json()

				if (data.images.length) {
					setPhoto(prev => [...prev, ...data.images])
					pageStatus.current.page++
				}
				pageStatus.current.loading = false
			}
		},
		[photo]
	)

	const data: ReactImageGalleryItem[] = photo.map(img => ({
		original: img.url || '',
		thumbnail: img.previewUrl,
		originalAlt: img.type,
		thumbnailAlt: img.type,
		renderItem(e: ReactImageGalleryItem) {
			return (
				<div className={`${fullScreen ? 'h-[100vh]' : 'h-[calc(100vh-120px)]'}`}>
					<SafeImage
						src={e.original}
						errorImage={defaultImage}
						alt={e.originalAlt || 'poster'}
						fill
						className="object-scale-down"
					/>
				</div>
			)
		},
		renderThumbInner(e: ReactImageGalleryItem) {
			return (
				<div className={cls.thumb + ' image-gallery-thumbnail-inner'}>
					<SafeImage
						src={e.thumbnail}
						errorImage={defaultImage}
						alt={e.thumbnailAlt || 'poster'}
						fill
						className="object-scale-down image-gallery-thumbnail-image"
					/>
				</div>
			)
		},
	}))

	return (
		<div className={cls.container}>
			<ImageGallery
				onScreenChange={changeMode}
				onSlide={onSlide}
				showIndex
				startIndex={pageStatus.current.curIndex}
				thumbnailPosition="left"
				onErrorImageURL={defaultImage.src}
				items={data}
			/>
			<div className={cls.total}>
				<h2>Всего найдено</h2>
				<h3> {total}</h3>
			</div>
			<h2 className={cls.loaded}>загружено</h2>
		</div>
	)
}

export default PhotoGalery
