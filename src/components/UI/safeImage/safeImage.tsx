import { FC } from 'react'
import { useToggle } from '@/hooks/useToggle'
import Image, { StaticImageData } from 'next/image'
import defaultImg from '@/assets/img/noimage.png'

interface SafeImageProps {
	src: string | null
	defaultImg: StaticImageData
	description: string
	className?: string
	fill?: boolean
	width?: number
	height?: number
	draggable?: boolean
}

const SafeImage: FC<SafeImageProps> = ({ src, defaultImg, description, className, fill, width, height, draggable }) => {
	const [isError, isErrorToggle] = useToggle(false)

	return (
		<Image
			src={src && !isError ? src : defaultImg}
			alt={description}
			className={className || ''}
			onError={() => {
				console.log('error')
				isErrorToggle()
			}}
			fill={fill}
			width={width}
			height={height}
			draggable={draggable}
			priority
		/>
	)
}

export default SafeImage
