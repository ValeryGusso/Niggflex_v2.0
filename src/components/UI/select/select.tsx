'use client'
import { CSSProperties, Dispatch, FC, SetStateAction } from 'react'
import Image from 'next/image'
import cls from './select.module.scss'
import { useToggle } from '@/hooks/useToggle'
import arrow from '@/assets/img/arror_down.svg'

export interface IOption {
	id: number
	title: string
	value: number
}

interface SelectProps {
	options: IOption[]
	selected: number
	onChange: Dispatch<SetStateAction<number>>
}

const Select: FC<SelectProps> = ({ options, selected, onChange }) => {
	const [isOpen, isOpenToggle] = useToggle(false)

	function click(value: number) {
		onChange(value)
		isOpenToggle()
	}

	return (
		<div className={cls.container}>
			<div className={cls.title} onClick={() => isOpenToggle()}>
				<p>{options[selected].title}</p>
				<div>
					<Image
						src={arrow}
						alt="arrow"
						width={32}
						height={32}
						style={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
					/>
				</div>
			</div>
			<ul
				className={isOpen ? cls.open : ''}
				style={
					{
						'--w': (options.length < 8 ? 24 * options.length : 192) + 'px',
						overflow: options.length < 8 ? 'hidden' : 'auto',
					} as CSSProperties
				}
			>
				{options.map(el => (
					<li className={isOpen ? cls.show : ''} key={el.id} onClick={() => click(el.value)}>
						{el.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Select
