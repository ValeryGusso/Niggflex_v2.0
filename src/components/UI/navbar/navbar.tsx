'use client'
import { FC, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import cls from './navbar.module.scss'

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
	const [current, setCurrent] = useState(0)

	return (
		<div className={cls.container}>
			<ul className={cls.content}>
				{items.map((item, i) => (
					<a href={`#${item.href}`} key={item.href} onClick={() => setCurrent(i)}>
						<Image src={item.image} alt={item.href} width={52} height={52} />
					</a>
				))}
			</ul>
		</div>
	)
}

export default Navbar
