import { FC } from 'react'
import cls from './footer.module.scss'
import Image from 'next/image'
import logo from '@/assets/img/logo.png'
import Contact from '../UI/contact/contact'
import tg from '@/assets/img/telegram.png'
import discord from '@/assets/img/discord.svg'

const Footer: FC = () => {
	return (
		<div className={cls.container}>
			<div className={cls.logo}>
				<Image src={logo} alt="logo" draggable={false} />
				<p>
					Всё, что ты любишь, <br /> но немного темнее
				</p>
			</div>
			<div className={cls.description}>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex tempora cum eius aspernatur laborum dicta
					nesciunt officiis similique autem? Laudantium ullam voluptatibus numquam veniam sunt consectetur commodi vero,
					repellat adipisci?
				</p>
				<span>© {new Date().getFullYear()} Niggflex</span>
			</div>
			<div className={cls.contacts}>
				<p>
					По всем интересующим <br /> вопросам обращаться:
				</p>
				<div>
					<Contact img={tg} value="@gusso" description="telegram" />
					<Contact img={discord} value="v_gusso" description="discord" />
				</div>
			</div>
		</div>
	)
}

export default Footer
