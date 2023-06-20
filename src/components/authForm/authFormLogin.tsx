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
}

type ErrorState = {
	email: { error: boolean; message: string }
	password: { error: boolean; message: string }
}

const AuthFormLogin: FC = () => {
	const { register, handleSubmit, watch, formState } = useForm<Inputs>()
	const [errors, setErrors] = useState<ErrorState>({
		email: { error: false, message: '' },
		password: { error: false, message: '' },
	})

	const onSubmit: SubmitHandler<Inputs> = async data => {
		await new Promise(res => setTimeout(res, 2000))
	}

	const email = watch('email')
	const password = watch('password')

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
				</div>
				<ButtonSubmit onClick={handleSubmit(onSubmit)} loading={false}>
					<p>Войти</p>
				</ButtonSubmit>
				<div className={cls.links}>
					<p>
						Ещё нет аккаунта?{' '}
						<Link href="/auth/registration" className={cls.link}>
							Зарегистрироваться!
						</Link>
					</p>
					<p>
						Забыл пароль?{' '}
						<Link href="/auth/reset" className={cls.link}>
							Восстановить!
						</Link>
					</p>
				</div>
			</form>
			<p className={cls.division}>Или</p>
			<div className={cls.socials}>
				<p>Войти с помощью:</p>
				<div>
					<SocialButton img={google} title="google" color="#059669" />
					<SocialButton img={github} title="github" color="#fbbf24" />
				</div>
			</div>
		</div>
	)
}

export default AuthFormLogin
