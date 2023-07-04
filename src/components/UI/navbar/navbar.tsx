'use client'
import { CSSProperties, FC } from 'react'
import Image, { StaticImageData } from 'next/image'
import cls from './navbar.module.scss'
import { useHash } from '@/hooks/useHash'

export interface NavbarItem {
	id: number
	title: string
	image: string | StaticImageData
	href: string
}

interface NavbarProps {
	items: NavbarItem[]
}

const Navbar: FC<NavbarProps> = ({ items }) => {
	const hash = useHash()

	const indexes = items.map(item => item.href)

	return (
		<div className={cls.container}>
			<ul className={cls.content}>
				{items.map((item, i) => (
					<a href={`#${item.href}`} key={item.id}>
						<Image src={item.image} alt={item.href} width={52} height={52} />
					</a>
				))}
				<li
					className={cls.highlight}
					style={{ '--y': (hash ? indexes.indexOf(hash) * 100 : 0) + 'px' } as CSSProperties}
				></li>
			</ul>
		</div>
	)
}

export default Navbar
