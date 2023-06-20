import { FC } from 'react'
import cls from './login.module.scss'
import AuthFormLogin from '@/components/authForm/authFormLogin'
import Image from 'next/image'
import bgImage from '@/assets/img/bg/v.jpg'
import login from '@/assets/img/login.png'

const Login: FC = () => {
	return (
		<div className={cls.container}>
			<Image src={bgImage} alt="background" className={cls.bg} draggable={false} />
			<div className={cls.wrapper}>
				<Image src={login} alt="login" draggable={false} />
				<AuthFormLogin />
			</div>
		</div>
	)
}

export default Login
