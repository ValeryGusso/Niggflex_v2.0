'use client'
import { FC } from 'react'
import cls from './leftbar.module.scss'

const Leftbar: FC = () => {
	function scroll() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return <div className={cls.bar} onClick={scroll}></div>
}

export default Leftbar
