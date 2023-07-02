import { FC, useRef } from 'react'
import cls from './menu.module.scss'

import Link from 'next/link'

import { BsTriangleFill } from 'react-icons/bs'
import { FaUserCog } from 'react-icons/fa'

import { MenuListItem, menuList } from '@/assets/constants/const'
import { useToggle } from '@/hooks/useToggle'

interface MenuProps {
	onClose: VoidFunction
}

type IMenu = FC & { Desktop: FC<MenuProps>; Mobile: FC<MenuProps> }

type TimerId = ReturnType<typeof setTimeout>

interface Timers {
	menu: TimerId | null
	category: TimerId | null
}

const Menu: IMenu = () => {
	return null
}

Menu.Desktop = function Desktop({ onClose }) {
	const [showCategory, categoryToggle] = useToggle(false)
	const id = useRef<Timers>({ menu: null, category: null })

	function mouseLeave(type: 'menu' | 'category') {
		switch (type) {
			case 'menu':
				id.current.menu = setTimeout(() => {
					onClose()
				}, 2000)
				break
			case 'category':
				id.current.category = setTimeout(() => {
					categoryToggle(false)
				}, 1000)
				break
		}
	}

	function mouseEnter(type: 'menu' | 'category') {
		switch (type) {
			case 'menu':
				if (id.current.menu) {
					clearTimeout(id.current.menu)
					id.current.menu = null
				}
				break
			case 'category':
				if (id.current.category) {
					clearTimeout(id.current.category)
					id.current.category = null
				}
				categoryToggle(true)
				break
		}
	}

	function renderCategories(list: MenuListItem[]) {
		return (
			<ul className={cls.menu__desktop__categories} onMouseLeave={() => mouseLeave('category')}>
				{list.map(item => (
					<li key={item.title} className={cls.menu__desktop__item}>
						<Link href={item.path} className={cls.menu__desktop__item__link}>
							{item.icon({ size: '1em' })}
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		)
	}

	return (
		<ul className={cls.menu__desktop} onMouseLeave={() => mouseLeave('menu')} onMouseEnter={() => mouseEnter('menu')}>
			{menuList.map(item => (
				<li key={item.path} className={cls.menu__desktop__item}>
					{item.children ? (
						<p className={cls.menu__desktop__item__link} onMouseEnter={() => mouseEnter('category')}>
							{item.icon({ className: cls.menu__desktop__item__icon })}
							{item.title}
							<BsTriangleFill className={cls.menu__desktop__item__arrow} />
						</p>
					) : (
						<Link
							href={item.path}
							className={cls.menu__desktop__item__link}
							onMouseEnter={() => categoryToggle(false)}
							onClick={onClose}
						>
							{item.icon({ className: cls.menu__desktop__item__icon })}
							{item.title}
						</Link>
					)}
					{item.children && showCategory && renderCategories(item.children)}
				</li>
			))}
		</ul>
	)
}

Menu.Mobile = function Mobile({ onClose }) {
	const [showCategory, categoryToggle] = useToggle(false)

	function renderCategories(list: MenuListItem[]) {
		return (
			<ul className={cls.menu__mobile}>
				{list.map(item => (
					<li key={item.title} className={cls.menu__mobile__item}>
						<Link href={item.path} className={cls.menu__mobile__item__link} onClick={onClose}>
							{item.icon({ className: cls.menu__desktop__item__icon })}
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		)
	}

	return (
		<ul className={cls.menu__mobile}>
			{menuList.map(item => (
				<li key={item.title}>
					<div className={cls.menu__mobile__item}>
						{item.children ? (
							<p className={cls.menu__mobile__item__link} onClick={() => categoryToggle()}>
								{item.icon({ className: cls.menu__mobile__item__icon })}
								{item.title}
								<BsTriangleFill
									className={`${cls.menu__mobile__item__arrow} ${showCategory ? 'rotate-180' : 'transform-none'} `}
								/>
							</p>
						) : (
							<Link href={item.path} className={cls.menu__mobile__item__link} onClick={onClose}>
								{item.icon({ className: cls.menu__mobile__item__icon })}
								{item.title}
							</Link>
						)}
					</div>
					{item.children && showCategory && renderCategories(item.children)}
				</li>
			))}
			<li className={cls.menu__mobile__item}>
				<Link href="#" className={cls.menu__mobile__item__link} onClick={onClose}>
					<FaUserCog className={cls.menu__mobile__item__icon} /> Мой профиль
				</Link>
			</li>
		</ul>
	)
}

export default Menu
