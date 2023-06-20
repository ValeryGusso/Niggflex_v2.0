'use client'
import { FC, useEffect, useState } from 'react'
import cls from './authForm.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import ValidatedInput from '../UI/input/validatedInput'
import ButtonSubmit from '../UI/buttonSubmit/buttonSubmit'
import { FaUser, FaLock } from 'react-icons/fa'
import google from '@/assets/img/google.svg'
import github from '@/assets/img/github.svg'
import SocialButton from '../UI/socialButton/socialButton'
import Link from 'next/link'

type Inputs = {
	email: string
	password: string
	confirm: string
	code: string
}

type ErrorState = {
	email: { error: boolean; message: string }
	password: { error: boolean; message: string }
	confirm: { error: boolean; message: string }
	code: { error: boolean; message: string }
}

const AuthFormRegistration: FC = () => {
	const { register, handleSubmit, watch, formState } = useForm<Inputs>()
	const [step, setStep] = useState<'registration' | 'confirm'>('registration')
	const [errors, setErrors] = useState<ErrorState>({
		email: { error: false, message: '' },
		password: { error: false, message: '' },
		confirm: { error: false, message: '' },
		code: { error: false, message: '' },
	})

	const onSubmit: SubmitHandler<Inputs> = async data => {
		await new Promise(res => setTimeout(res, 2000))
	}

	const email = watch('email')
	const password = watch('password')
	const confirm = watch('confirm')

	return (
		<div className={cls.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={cls.inputs}>
					<ValidatedInput
						type="text"
						placeholder="email"
						icon={FaUser}
						isEmpty={!email}
						error={errors.email.error}
						errorMessage={errors.email.message}
						register={register('email')}
					/>
					<ValidatedInput
						type="password"
						placeholder="password"
						icon={FaLock}
						isEmpty={!password}
						error={errors.password.error}
						errorMessage={errors.password.message}
						register={register('password')}
					/>
					<ValidatedInput
						type="password"
						placeholder="confirm"
						icon={FaLock}
						isEmpty={!confirm}
						error={errors.confirm.error}
						errorMessage={errors.confirm.message}
						register={register('confirm')}
					/>
				</div>
				<ButtonSubmit onClick={handleSubmit(onSubmit)} loading={false}>
					<p>Зарегистрироваться!</p>
				</ButtonSubmit>
				<div className={cls.links}>
					<p>
						Уже есть аккаунт{' '}
						<Link href="/auth/login" className={cls.link}>
							Войти!
						</Link>
					</p>
				</div>
			</form>
			<p className={cls.division}>Или</p>
			<div className={cls.socials}>
				<p>Быстрая регистрация</p>
				<div>
					<SocialButton img={google} title="google" color="#059669" />
					<SocialButton img={github} title="github" color="#fbbf24" />
				</div>
			</div>
		</div>
	)
}

export default AuthFormRegistration
