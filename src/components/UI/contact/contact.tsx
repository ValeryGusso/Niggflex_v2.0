'use client'
import { FC } from 'react'
import cls from './contact.module.scss'
import Image, { StaticImageData } from 'next/image'
import { useToggle } from '@/hooks/useToggle'
import success from '@/assets/img/check.png'

interface ContactProps {
	img: StaticImageData
	value: string
	description: string
}

const Contact: FC<ContactProps> = ({ img, value, description }) => {
	const [isCopied, isCopiedToggle] = useToggle(false)

	function copy() {
		navigator.clipboard.writeText(value)

		if (!isCopied) {
			isCopiedToggle()

			setTimeout(isCopiedToggle, 3000)
		}
	}

	return (
		<div className={cls.container} onClick={copy}>
			<Image src={isCopied ? success : img} alt={description} draggable={false} />
			<p>{isCopied ? 'Скопировано!' : value}</p>
		</div>
	)
}

export default Contact
