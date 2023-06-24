import { FC } from 'react'
import cls from './select.module.scss'
import { useToggle } from '@/hooks/useToggle'

interface SelectProps {}

const Select: FC<SelectProps> = () => {
	const [isOpen, isOpenToggle] = useToggle(false)
	return (
		<div>
			<div></div>
			<ul></ul>
		</div>
	)
}

export default Select
