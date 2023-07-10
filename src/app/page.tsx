import { FC } from 'react'
import cls from './home.module.scss'
import PresentRow from '@/components/presentRow/presentRow'
import kinopoiskDev from '@/kinopoiskDev'
import Star from '@/components/UI/star/star'

const Home: FC = async () => {
	const items = await kinopoiskDev.getMovie({
		year: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
		ratingImdb: '6-10',
		ratingKp: '6-10',
		posterUrl: '!null',
		limit: 45,
	})

	return (
		<div className={cls.container}>
			Добро пожаловать на Niggflex, возможно, самый лучший сайт о кино во Вселенной!
			<div className={cls.rows}>
				<PresentRow movies={items.data?.docs.splice(0, 15)!} direction="left" />
				<PresentRow movies={items.data?.docs.splice(0, 15)!} direction="right" />
				<PresentRow movies={items.data?.docs.splice(0, 15)!} direction="left" />
			</div>
			<div>
				<Star size={32} fill={0.5} />
				<Star size={32} fill={0.5} />
				<Star size={32} fill={0.75} />
			</div>
			<div>Лучшие из лучших</div>
			<div>Ожидаемые новинки</div>
			<div>Лучшее за 2023 год</div>
		</div>
	)
}

export default Home
