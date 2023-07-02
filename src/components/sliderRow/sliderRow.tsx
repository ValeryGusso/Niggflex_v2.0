'use client'
import { FC, ReactNode } from 'react'
import cls from './sliderRow.module.scss'
import Flickity, { FlickityOptions } from 'react-flickity-component'

interface SliderRowProps {
	title: string
	length: number
	children: ReactNode
	freeScroll?: boolean
}

const SliderRow: FC<SliderRowProps> = ({ title, length, children, freeScroll }) => {
	const flickityOptions: FlickityOptions = {
		wrapAround: length > 20,
		cellAlign: length > 20 ? 'left' : 'center',
		initialIndex: length > 20 ? 0 : Math.floor(length / 2),
		accessibility: false,
		freeScroll: freeScroll !== undefined ? freeScroll : true,
	}

	return (
		<div className={cls.container}>
			<h1 className={cls.title}>{title}</h1>
			<Flickity
				className={`carousel ${cls.carousel}`}
				elementType={'div'}
				options={flickityOptions}
				disableImagesLoaded={false}
				reloadOnUpdate
				static
			>
				{children}
			</Flickity>
		</div>
	)
}

export default SliderRow
