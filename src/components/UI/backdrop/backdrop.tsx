'use client'
import { FC /* useEffect, useRef  */ } from 'react'
import cls from './backdrop.module.scss'
import SafeImage from '../safeImage/safeImage'
import defaultImage from '@/assets/img/bg/default_bg.webp'

interface BackdropProps {
	src?: string | null
	alt?: string | null
}

const Backdrop: FC<BackdropProps> = ({ src, alt }) => {
	// const sizes = useRef({ width: 0, height: 0 })

	// useEffect(() => {
	// 	sizes.current = { width: window.innerWidth, height: window.innerHeight }
	// }, [])

	return (
		<div className={cls.container}>
			<SafeImage
				src={src || defaultImage}
				alt={alt || 'background'}
				errorImage={defaultImage}
				// width={sizes.current.width}
				// height={sizes.current.height}
				fill
			/>
		</div>
	)
}

export default Backdrop
