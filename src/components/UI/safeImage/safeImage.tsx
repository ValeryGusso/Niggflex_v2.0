'use client'
import React, { FC } from 'react'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { useToggle } from '@/hooks/useToggle'
import defaultImg from '@/assets/img/noimage.png'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoad' | 'src'> {
	errorImage?: string | StaticImageData
	src?: string | StaticImageData | null
}

const SafeImage: FC<SafeImageProps> = React.memo(({ errorImage, src, ...props }) => {
	const [isError, isErrorToggle] = useToggle(false)

	function getSrc() {
		if (isError) {
			return errorImage ? errorImage : defaultImg
		} else {
			return src || errorImage || defaultImg
		}
	}

	return <Image {...props} src={getSrc()} onLoad={() => isErrorToggle(false)} onError={() => isErrorToggle(true)} />
})

SafeImage.displayName = 'SafeImage'
export default SafeImage
