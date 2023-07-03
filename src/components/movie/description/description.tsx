import { FC } from 'react'
import cls from './description.module.scss'
import { FullMovie } from '@/kinopoiskDev/autotypes'
import { cut, printCurrency, printDate, printTime } from '@/utils/print'

interface DescriptionProps {
	movie: FullMovie
}

const Description: FC<DescriptionProps> = ({ movie }) => {
	return (
		<div className={cls.container}>
			<div className={cls.name}>
				<h1>
					{movie.name || movie.enName}, <span>{movie.year}</span>
				</h1>
				{movie.alternativeName && <h2>{movie.alternativeName}</h2>}
				<p>{cut(movie.shortDescription || movie.description, 200)}</p>
			</div>
			<div className={cls.description}>
				<h1>О фильме</h1>
				<div className={cls.row}>
					<p>Год выхода</p>
					<p>{movie.year || 'Нет данных'}</p>
				</div>
				<div className={cls.row}>
					<p>Страна</p>
					<p>{movie.countries?.map((country, i) => country.name + (i !== movie.countries.length! - 1 ? ', ' : ''))}</p>
				</div>
				<div className={cls.row}>
					<p>Жанр</p>
					<p>{movie.genres?.map((country, i) => country.name + (i !== movie.genres.length! - 1 ? ', ' : ''))}</p>
				</div>
				<div className={cls.row}>
					<p>Возрастной рейтинг</p>
					<p>{movie.ageRating ? movie.ageRating + '+' : 'Нет данных'}</p>
				</div>
				<div className={cls.row}>
					<p>Время</p>
					<p>{printTime(movie.movieLength)}</p>
				</div>
				<div className={cls.row}>
					<p>Слоган</p>
					<p>{movie.slogan || 'Нет данных'}</p>
				</div>
				{(movie.premiere.world || movie.premiere.russia) && (
					<>
						<h2>Премьера</h2>
						{movie.premiere.world && (
							<div className={cls.row}>
								<p>Мир</p>
								<p>{printDate(movie.premiere.world)}</p>
							</div>
						)}
						{movie.premiere.russia && (
							<div className={cls.row}>
								<p>Россия</p>
								<p>{printDate(movie.premiere.russia)}</p>
							</div>
						)}
					</>
				)}
				<h2>Сборы</h2>
				<div className={cls.row}>
					<p>Мир</p>
					<p>
						{printCurrency(movie.fees?.world?.value)}
						{movie.fees?.world?.currency}
					</p>
				</div>
				<div className={cls.row}>
					<p>Россия</p>
					<p>
						{printCurrency(movie.fees?.russia?.value)}
						{movie.fees?.russia?.currency}
					</p>
				</div>
				<div className={cls.row}>
					<p>США</p>
					<p>
						{printCurrency(movie.fees?.usa?.value)}
						{movie.fees?.usa?.currency}
					</p>
				</div>
				<div className={cls.row}>
					<p>Бюджет</p>
					<p>
						{printCurrency(movie.budget?.value)}
						{movie.budget.currency}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Description
