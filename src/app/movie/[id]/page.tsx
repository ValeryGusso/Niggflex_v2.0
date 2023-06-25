import { FC } from 'react'
import cls from './movie.module.scss'
import Slider from '@/components/slider/slider'
import SliderRow from '@/components/sliderRow/slider'
import { ProfessionKey, ShortStaf } from '@/kinopoiskUnofficial/@types/staff'
import kinopoiskUnofficial from '@/kinopoiskUnofficial'
import kinopoiskDev from '@/kinopoiskDev'
import Poster from '@/components/movie/poster/poster'
import Description from '@/components/movie/description/description'
import VideoPlayer from '@/components/movie/videoPlayer/videoPlayer'
import { getParsedFact } from '@/utils/get'
import Link from 'next/link'
import Fact from '@/components/movie/fact/fact'

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
		kinopoiskUnofficial.getReviewsByMovieId(params.id, { page: 5, opder: 'USER_NEGATIVE_RATING_ASC' }),
	])
	const movie = results[0].status === 'fulfilled' ? results[0].value : null
	const staff = results[1].status === 'fulfilled' ? results[1].value : null
	const facts = results[2].status === 'fulfilled' && results[2].value.success ? results[2].value : null
	const awards = results[3].status === 'fulfilled' ? results[3].value : null
	const reviews = results[4].status === 'fulfilled' ? results[4].value : null

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
		<div className={cls.movie}>
			<div className={cls.logo}>
				<Poster movie={movie?.data!} />
				<Description movie={movie?.data!} />
			</div>

			<Slider className="w-full h-1/5">
				<div className="w-full h-full">
					<h1>Описание</h1>
					<p>{movie?.data?.description}</p>
				</div>
				<div className="w-full h-full">
					<h1>Интересные факты:</h1>
					<ul>
						{movie?.data?.facts.map((fact, i) => (
							<li key={i}>
								<Fact fact={fact} />
							</li>
						))}
					</ul>
				</div>
				<div className="w-full h-full">
					<h1>Гелерея</h1>
				</div>
				<div className="w-full h-full">
					<h1>Трейлеры</h1>
					<VideoPlayer videos={movie?.data?.videos.trailers!} />
				</div>
			</Slider>

			<SliderRow title="Актёры" showRole={false} persons={getPersonsByProfession(staff?.data!, ProfessionKey.Actor)} />
			<SliderRow title="Над фильмом работали" showRole={true} persons={getPersonsByProfession(staff?.data!, 'staff')} />
		</div>
	)
}

export default Movie
