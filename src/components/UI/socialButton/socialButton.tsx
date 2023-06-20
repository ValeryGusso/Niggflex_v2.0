import { CSSProperties, FC } from 'react'
import cls from './socialButton.module.scss'
import Image from 'next/image'

interface SocialButtonProps {
	img: string
	title: string
	color: string
}

const SocialButton: FC<SocialButtonProps> = ({ img, title, color }) => {
	return (
		<div className={cls.container} style={{ '--color': color } as CSSProperties}>
			<Image src={img} alt={title} draggable={false} />
			<p>{title}</p>
		</div>
	)
}

export default SocialButton
