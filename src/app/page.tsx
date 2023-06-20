import { FC } from 'react'
import cls from './home.module.scss'
import kinopoiskDev from '@/utils/kinopoiskDev'
import PresentRow from '@/components/presentRow/presentRow'

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
			<PresentRow movies={items.data?.docs.splice(0, 15)!} />
			{/* <PresentRow movies={items.data?.docs.splice(0, 15)!} />
			<PresentRow movies={items.data?.docs.splice(0, 15)!} /> */}
		</div>
	)
}

export default Home
