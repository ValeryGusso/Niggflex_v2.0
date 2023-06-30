import { FC } from 'react'
import Image from 'next/image'
import cls from './movie.module.scss'
import Slider from '@/components/slider/slider'
import SliderRow from '@/components/sliderRow/sliderRow'
import { ProfessionKey, ShortStaf } from '@/kinopoiskUnofficial/@types/staff'
import kinopoiskUnofficial from '@/kinopoiskUnofficial'
import kinopoiskDev from '@/kinopoiskDev'
import Poster from '@/components/movie/poster/poster'
import Description from '@/components/movie/description/description'
import VideoPlayer from '@/components/movie/videoPlayer/videoPlayer'
import Fact from '@/components/movie/fact/fact'
import PhotoGalery from '@/components/movie/photoGalery/photoGalery'
import Backdrop from '@/components/UI/backdrop/backdrop'
import nothingFound from '@/assets/img/nothingFound.png'
import Awards from '@/components/movie/awards/awards'

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
		kinopoiskDev.getImagesByMovieId(params.id),
	])

	const movie = results[0].status === 'fulfilled' ? results[0].value : null
	const staff = results[1].status === 'fulfilled' && results[1].value.success ? results[1].value.data : null
	const facts = results[2].status === 'fulfilled' && results[2].value.success ? results[2].value.data : null
	const awards = results[3].status === 'fulfilled' && results[3].value.success ? results[3].value.data : null
	const reviews = results[4].status === 'fulfilled' && results[4].value.success ? results[4].value.data : null
	const images = results[5].status === 'fulfilled' ? results[5].value : null

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

	console.log(awards?.items)
	return (
		<div className={cls.movie}>
			<Backdrop src={movie?.data?.poster.url!} alt={movie?.data?.enName} />
			<div className={cls.logo}>
				<Poster movie={movie?.data!} />
				<Description movie={movie?.data!} />
			</div>
			{awards?.items.length && <Awards awards={awards.items} />}
			<Slider
				titles={['Описание', 'Интересные факты', 'Гелерея', 'Трейлеры']}
				className="h-[calc(60vh+110px)] flex flex-col gap-4 items-center"
			>
				<div className="w-full h-full flex items-center px-32 cursor-default">
					{movie?.data?.description ? (
						<p className="mt-6 px-12 text-2xl text-center">{movie?.data?.description}</p>
					) : (
						<div className="w-fit h-52">
							<Image src={nothingFound} alt="no data" fill className="object-scale-down" />
						</div>
					)}
				</div>
				<div className="w-full h-full px-32">
					{movie?.data?.facts?.length ? (
						<ul className="h-full flex flex-col gap-6 mt-4 pl-12 pb-12 overflow-auto">
							{movie?.data?.facts?.map((fact, i) => (
								<li key={i}>
									<Fact fact={fact} />
								</li>
							))}
						</ul>
					) : (
						<div className="w-fit h-52">
							<Image src={nothingFound} alt="no data" fill className="object-scale-down" />
						</div>
					)}
				</div>
				<div className="w-full h-full flex justify-center px-32">
					{images?.data?.docs?.length ? (
						<div className="w-[50vw] h-fit">
							<PhotoGalery items={images?.data?.docs!} />
						</div>
					) : (
						<div className="w-fit h-52">
							<Image src={nothingFound} alt="no data" fill className="object-scale-down" />
						</div>
					)}
				</div>
				<div className="w-full h-full flex justify-center px-32">
					{movie?.data?.videos?.trailers?.length ? (
						<VideoPlayer videos={movie?.data?.videos.trailers!} />
					) : (
						<div className="w-fit h-52">
							<Image src={nothingFound} alt="no data" fill className="object-scale-down" />
						</div>
					)}
				</div>
			</Slider>
			{staff && (
				<>
					<SliderRow title="Актёры" showRole={false} persons={getPersonsByProfession(staff, ProfessionKey.Actor)} />
					<SliderRow title="Над фильмом работали" showRole={true} persons={getPersonsByProfession(staff, 'staff')} />
				</>
			)}
		</div>
	)
}

export default Movie
