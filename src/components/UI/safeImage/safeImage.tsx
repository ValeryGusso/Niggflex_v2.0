'use client'
import { FC } from 'react'
import { useToggle } from '@/hooks/useToggle'
import Image, { ImageProps, StaticImageData } from 'next/image'
import defaultImg from '@/assets/img/noimage.png'
import React from 'react'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
	errorImage?: string | StaticImageData
}

const SafeImage: FC<SafeImageProps> = React.memo(props => {
	const [isError, isErrorToggle] = useToggle(false)

	function getSrc() {
		if (isError) {
			return props.errorImage ? props.errorImage : defaultImg
		} else {
			return props.src
		}
	}

	return <Image {...props} onLoad={() => isErrorToggle(false)} onError={() => isErrorToggle(true)} src={getSrc()} />
})

export default SafeImage
