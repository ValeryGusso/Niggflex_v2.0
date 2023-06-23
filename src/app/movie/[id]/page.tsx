import { FC } from 'react'
import cls from './movie.module.scss'
import kinopoiskDev from '@/utils/kinopoiskDev'
import Image from 'next/image'
import { printCurrency, printTime } from '@/utils/print'
import Slider from '@/components/slider/slider'
import SliderRow from '@/components/sliderRow/slider'
import kinopoiskUnofficial from '@/utils/kinopoiskUnofficial'
import { ProfessionKey, ShortStaf } from '@/kinopoiskUnofficial/@types/staff'

interface MovieProps {
	params: {
		id: number
	}
	searchParams: Record<string, string>
}

export async function generateMetadata({ params }: MovieProps) {
	const movie = await kinopoiskDev.getMovieById(params.id)

	return {
		title: movie?.data?.name || movie?.data?.enName || 'Niggflex',
	}
}

const Movie: FC<MovieProps> = async ({ params }) => {
	const results = await Promise.allSettled([
		kinopoiskDev.getMovieById(params.id),
		kinopoiskUnofficial.getStaffByMovieId(params.id),
		kinopoiskUnofficial.getFactsByMovieId(params.id),
		kinopoiskUnofficial.getAwardsByMovieId(params.id),
	])

	const movie = results[0].status === 'fulfilled' ? results[0].value : null
	const staff = results[1].status === 'fulfilled' ? results[1].value : null
	const facts = results[2].status === 'fulfilled' ? results[2].value : null
	const awards = results[3].status === 'fulfilled' ? results[3].value : null

	function getPersonsByProfession(staff: ShortStaf[], type: ProfessionKey.Actor | 'staff') {
		const result: ShortStaf[] = []

		if (type === ProfessionKey.Actor) {
			staff.forEach(person => {
				if (person.professionKey === type) {
					result.push(person)
				}
			})
		} else {
			staff.forEach(person => {
				if (person.professionKey !== ProfessionKey.Actor) {
					result.push(person)
				}
			})
		}

		return result
	}

	return (
		<div className="w-full flex flex-col justify-center pl-20 gap-20">
			<div className="flex">
				<div className="flex flex-col w-72">
					<Image
						src={movie?.data?.poster.url || ''}
						alt={movie?.data?.enName || 'movie?'}
						width={667}
						height={1000}
						className="w-full h-fit"
					/>
				</div>

				<div className="flex flex-col">
					<div className="flex">
						<div>
							<p>Кинопоиск</p>
							<p>{movie?.data?.rating.kp ? movie?.data?.rating.kp.toFixed(2) : '---'}</p>
						</div>
						<div>
							<p>IMDB</p>
							<p>{movie?.data?.rating.imdb ? movie?.data?.rating.imdb.toFixed(2) : '---'}</p>
						</div>
						<div>
							<p>TMDB</p>
							<p>{movie?.data?.rating.tmdb ? movie?.data?.rating.tmdb.toFixed(2) : '---'}</p>
						</div>
					</div>
					<div>
						<p>Критики (мир / Россия)</p>
						<p>
							{movie?.data?.rating.filmCritics ? movie?.data?.rating.filmCritics.toFixed(2) : '---'} /{' '}
							{movie?.data?.rating.russianFilmCritics
								? (movie?.data?.rating.russianFilmCritics / 10).toFixed(2)
								: '---'}
						</p>
					</div>
				</div>
			</div>
			<div className={cls.info}>
				<div className={cls.name}>
					<h1>
						{movie?.data?.name || movie?.data?.enName} <span>({movie?.data?.year})</span>
					</h1>
					<p>{movie?.data?.shortDescription || 'Описание отсутствует'}</p>
				</div>
				<div className={cls.description}>
					<h1>О фильме:</h1>
					<div>
						<p>Год выхода:</p>
						<p>{movie?.data?.year || 'Нет данных'}</p>
					</div>
					<div>
						<p>Страна:</p>
						<p>
							{movie?.data?.countries?.map(
								(country, i) => country.name + (i !== movie?.data?.countries.length! - 1 ? ', ' : '')
							)}
						</p>
					</div>
					<div>
						<p>Жанр:</p>
						<p>
							{movie?.data?.genres?.map(
								(country, i) => country.name + (i !== movie?.data?.genres.length! - 1 ? ', ' : '')
							)}
						</p>
					</div>
					<div>
						<p>Возрастной рейтинг:</p>
						<p>{movie?.data?.ageRating ? movie?.data?.ageRating + '+' : 'Нет данных'}</p>
					</div>
					<div>
						<p>Время:</p>
						<p>{printTime(movie?.data?.movieLength)}</p>
					</div>
					<div>
						<p>Слоган:</p>
						<p>{movie?.data?.slogan || 'Нет данных'}</p>
					</div>
					<h2>Сборы</h2>
					<div>
						<p>Мир:</p>
						<p>
							{printCurrency(movie?.data?.fees?.world?.value)} {movie?.data?.fees?.world?.currency}
						</p>
					</div>
					<div>
						<p>Россия:</p>
						<p>
							{printCurrency(movie?.data?.fees?.russia?.value)} {movie?.data?.fees?.russia?.currency}
						</p>
					</div>
					<div>
						<p>США:</p>
						<p>
							{printCurrency(movie?.data?.fees?.usa?.value)} {movie?.data?.fees?.usa?.currency}
						</p>
					</div>
				</div>
			</div>
			<Slider />
			<SliderRow title="Актёры" showRole={false} persons={getPersonsByProfession(staff?.data!, ProfessionKey.Actor)} />
			<SliderRow title="Над фильмом работали" showRole={true} persons={getPersonsByProfession(staff?.data!, 'staff')} />
		</div>
	)
}

export default Movie
