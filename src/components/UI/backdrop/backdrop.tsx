'use client'
import { FC } from 'react'
import cls from './backdrop.module.scss'
import SafeImage from '../safeImage/safeImage'
import { StaticImageData } from 'next/image'

interface BackdropProps {
	src: string | StaticImageData
	defaultSrc?: string | StaticImageData
	alt?: string | null
}

const Backdrop: FC<BackdropProps> = ({ src, alt, defaultSrc }) => {
	return (
		<div className={cls.container}>
			<SafeImage src={src} alt={alt || 'background'} errorImage={defaultSrc} fill />
		</div>
	)
}

export default Backdrop
