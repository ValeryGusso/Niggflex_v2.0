'use client'
import { FC, useRef, useState } from 'react'
import cls from './search.module.scss'
import { MdManageSearch } from 'react-icons/md'
import { BsRocketTakeoffFill } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im'
import ButtonSubmit from '../UI/buttonSubmit/buttonSubmit'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchProps {
	onClose?: VoidFunction
}

const Search: FC<SearchProps> = ({ onClose }) => {
	const router = useRouter()
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const debounce = useDebounce<string>(setValue, submit, 1000)

	function submit() {
		router.push('/search/result?name=' + value)
		if (onClose) {
			onClose()
		}
	}

	return (
		<>
			<div className={cls.desktop}>
				<input
					ref={inputRef}
					type="text"
					className={cls.desktop__input}
					value={value}
					onChange={e => debounce(e.target.value)}
				/>
				<ImSearch onClick={() => inputRef.current?.focus()} />
			</div>
			<div className={cls.mobile}>
				<h2 className={cls.mobile__title}>
					Что ищем?
					<MdManageSearch />
				</h2>
				<input type="text" className={cls.mobile__input} onChange={e => setValue(e.target.value)} />
				<ButtonSubmit loading={true} onClick={submit} className="flex gap-4 items-center mt-8">
					<p>Найти</p>
					<BsRocketTakeoffFill />
				</ButtonSubmit>
			</div>
		</>
	)
}

export default Search
