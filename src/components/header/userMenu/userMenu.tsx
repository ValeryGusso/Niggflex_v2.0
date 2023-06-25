import { FC } from 'react'
import cls from './userMenu.module.scss'

import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'

const UserMenu: FC = () => {
	const isAuth = false
	const name = 'Иван Диван'

	return (
		<div className={cls.container}>
			{isAuth ? (
				<>
					<p>{name}</p>
					<p>Logout</p>
				</>
			) : (
				<Link href="/auth/login">
					<FaUserCircle />
					<p>Войти</p>
				</Link>
			)}
		</div>
	)
}

export default UserMenu
