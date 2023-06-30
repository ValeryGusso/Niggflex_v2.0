'use client'
import React, { FC } from 'react'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { useToggle } from '@/hooks/useToggle'
import defaultImg from '@/assets/img/noimage.png'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoad' | 'src'> {
	errorImage?: string | StaticImageData
	src: string | StaticImageData | null
}

const SafeImage: FC<SafeImageProps> = React.memo(props => {
	const [isError, isErrorToggle] = useToggle(false)

	function getSrc() {
		if (isError) {
			return props.errorImage ? props.errorImage : defaultImg
		} else {
			return props.src || props.errorImage || defaultImg
		}
	}

	return <Image {...props} onLoad={() => isErrorToggle(false)} onError={() => isErrorToggle(true)} src={getSrc()} />
})

SafeImage.displayName = 'SafeImage'
export default SafeImage
