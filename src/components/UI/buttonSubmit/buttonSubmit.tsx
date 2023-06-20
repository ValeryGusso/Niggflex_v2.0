import { FC, ReactNode } from 'react'
import cls from './buttonSubmit.module.scss'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'

interface SubmitButtonProps {
	onClick: VoidFunction
	loading: boolean
	children: ReactNode
	className?: string
}

const ButtonSubmit: FC<SubmitButtonProps> = ({ onClick, loading, children, className }) => {
	return (
		<div className={cls.container}>
			<button
				className={`${cls.button}${className ? ' ' + className : ''}${loading ? ' ' + cls.loading : ''}`}
				onClick={onClick}
			>
				{children}
			</button>
			<ImArrowLeft className={cls.arrow} />
			<ImArrowRight className={cls.arrow} />
		</div>
	)
}

export default ButtonSubmit
