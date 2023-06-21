'use client'
import { FC } from 'react'
import cls from './header.module.scss'

import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'

import Menu from '../menu/menu'
import logo from '@/assets/img/logo.png'
import { useToggle } from '@/hooks/useToggle'
import MobileModal from '../UI/mobileModal/mobileModal'
import Search from '../search/search'
import UserMenu from './userMenu/userMenu'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Header: FC = () => {
	const router = useRouter()

	const [showDesktopMenu, desktopMenuToggle] = useToggle(false)

	const [showMobileMenu, mobileMenuToggle] = useToggle(false)
	const [showMobileSearch, mobileSearchToggle] = useToggle(false)

	function renderDesktopButton() {
		return showDesktopMenu ? (
			<TfiClose onClick={() => desktopMenuToggle()} />
		) : (
			<TfiMenuAlt onClick={() => desktopMenuToggle()} />
		)
	}

	/* DESCTOP */
	function renderDesktopMenuButton() {
		return showDesktopMenu ? (
			<div className={cls.desktop__menu__container}>
				<Menu.Desktop onClose={() => desktopMenuToggle(false)} />
			</div>
		) : null
	}

	/* MOBILE */
	function renderMobileMenuButton() {
		return showMobileMenu ? (
			<TfiClose onClick={menuToggle} className={cls.mobile__icon} />
		) : (
			<GiHamburgerMenu onClick={menuToggle} className={cls.mobile__icon} />
		)
	}

	function renderMobileMenu() {
		return showMobileMenu ? (
			<MobileModal onClose={() => mobileMenuToggle()}>
				<Menu.Mobile onClose={() => mobileMenuToggle()} />
			</MobileModal>
		) : null
	}

	function renderMobileSearch() {
		return showMobileSearch ? (
			<MobileModal onClose={() => mobileSearchToggle()}>
				<Search onClose={() => mobileSearchToggle()} />
			</MobileModal>
		) : null
	}

	function menuToggle() {
		mobileMenuToggle()
		if (showMobileSearch) {
			mobileSearchToggle()
		}
	}

	function searchToggle() {
		mobileSearchToggle()
		if (showMobileMenu) {
			mobileMenuToggle()
		}
	}

	return (
		<>
			<div className={cls.desctop}>
				<div className={cls.desktop__menu}>
					{renderDesktopButton()}
					<Image
						src={logo}
						alt="logo"
						className={cls.logo}
						draggable={false}
						onClick={() => router.push('/')}
						priority
					/>
					{renderDesktopMenuButton()}
				</div>
				<Search />
				<UserMenu />
			</div>
			<div className={cls.mobile}>
				<Image src={logo} alt="logo" className={cls.logo} onClick={() => router.push('/')} />
				<ImSearch className={cls.mobile__icon} onClick={searchToggle} />
				<FaUserCircle className={cls.mobile__icon} />
				{renderMobileMenuButton()}
				{renderMobileMenu()}
				{renderMobileSearch()}
			</div>
		</>
	)
}

export default Header
