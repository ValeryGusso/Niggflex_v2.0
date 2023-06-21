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

const Menu: IMenu = () => {
	return null
}

Menu.Desktop = function Desktop({ onClose }) {
	const [showCateroy, categoryToggle] = useToggle(false)
	const id = useRef<ReturnType<typeof setTimeout> | null>(null)

	function mouseLeave() {
		id.current = setTimeout(() => {
			onClose()
		}, 2000)
	}

	function mouseEnter() {
		categoryToggle(true)
		if (id.current) {
			clearTimeout(id.current)
			id.current = null
		}
	}

	function renderCategories(list: MenuListItem[]) {
		return (
			<ul className={cls.menu__desktop__categories} onMouseLeave={() => categoryToggle(false)}>
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
		<ul className={cls.menu__desktop} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter}>
			{menuList.map(item => (
				<li key={item.path} className={cls.menu__desktop__item}>
					{item.children ? (
						<p className={cls.menu__desktop__item__link} onMouseEnter={mouseEnter}>
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
					{item.children && showCateroy && renderCategories(item.children)}
				</li>
			))}
		</ul>
	)
}

Menu.Mobile = function Mobile({ onClose }) {
	const [showCateroy, categoryToggle] = useToggle(false)

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
									className={`${cls.menu__mobile__item__arrow} ${showCateroy ? 'rotate-180' : 'transform-none'} `}
								/>
							</p>
						) : (
							<Link href={item.path} className={cls.menu__mobile__item__link} onClick={onClose}>
								{item.icon({ className: cls.menu__mobile__item__icon })}
								{item.title}
							</Link>
						)}
					</div>
					{item.children && showCateroy && renderCategories(item.children)}
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
