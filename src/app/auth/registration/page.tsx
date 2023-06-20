import { FC } from 'react'
import cls from './registration.module.scss'
import AuthFormRegistration from '@/components/authForm/authFormRegistration'
import Image from 'next/image'
import bgImage from '@/assets/img/bg/v.jpg'
import registration from '@/assets/img/registration.png'

const Registration: FC = () => {
	return (
		<div className={cls.container}>
			<Image src={bgImage} alt="background" className={cls.bg} draggable={false} />
			<div className={cls.wrapper}>
				<Image src={registration} alt="registration" draggable={false} />
				<AuthFormRegistration />
			</div>
		</div>
	)
}

export default Registration
