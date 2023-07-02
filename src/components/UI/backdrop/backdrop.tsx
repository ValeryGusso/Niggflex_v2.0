'use client'
import { FC } from 'react'
import cls from './backdrop.module.scss'
import SafeImage from '../safeImage/safeImage'
import defaultImage from '@/assets/img/bg/default_bg.webp'

interface BackdropProps {
	src?: string | null
	alt?: string | null
}

const Backdrop: FC<BackdropProps> = ({ src, alt }) => {
	return (
		<div className={cls.container}>
			<SafeImage src={src || defaultImage} alt={alt || 'background'} errorImage={defaultImage} fill />
		</div>
	)
}

export default Backdrop
