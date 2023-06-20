'useclient'
import { CSSProperties, FC } from 'react'
import cls from './validatedInput.module.scss'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { useToggle } from '@/hooks/useToggle'
import { UseFormRegisterReturn } from 'react-hook-form'
import { IconType } from 'react-icons'
import Image from 'next/image'

interface ValidatedInputProps {
	type: 'text' | 'password'
	placeholder: string
	icon: string | IconType
	isEmpty: boolean
	error: boolean
	errorMessage: string
	register: UseFormRegisterReturn
}

const ValidatedInput: FC<ValidatedInputProps> = ({
	type,
	placeholder,
	icon,
	isEmpty,
	error,
	errorMessage,
	register,
}) => {
	const [show, showToggle] = useToggle(false)

	function renderIcon() {
		return typeof icon === 'string' ? (
			<Image src={icon} alt="icon" className={cls.icon} />
		) : (
			icon({ className: cls.icon })
		)
	}

	function renderEye() {
		return show ? (
			<BsEyeFill onClick={() => showToggle()} className={`${cls.icon} ${cls.eye}`} />
		) : (
			<BsEyeSlashFill onClick={() => showToggle()} className={`${cls.icon} ${cls.eye}`} />
		)
	}

	function getType() {
		if (type === 'text') {
			return type
		} else {
			return show ? 'text' : 'password'
		}
	}

	return (
		<div className={cls.container}>
			<label>
				<input type={getType()} {...register} className={type === 'password' ? cls.password : ''} />
				<p className={`${cls.placeholder} ${isEmpty ? '' : cls.focus}`}>
					{placeholder.split('').map((letter, i) => (
						<span style={{ '--delay': `${50 * i}ms` } as CSSProperties} key={i}>
							{letter}
						</span>
					))}
				</p>
				{renderIcon()}
			</label>
			{type === 'password' && renderEye()}
			{error && <p>{errorMessage}</p>}
		</div>
	)
}

export default ValidatedInput
