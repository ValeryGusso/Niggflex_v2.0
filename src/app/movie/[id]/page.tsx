import { FC, ReactNode } from 'react'
import Image from 'next/image'
import cls from './movie.module.scss'
import { ProfessionKey, Staf } from '@/kinopoiskUnofficial/@types/staff'
import kinopoiskUnofficial from '@/kinopoiskUnofficial'
import kinopoiskDev from '@/kinopoiskDev'
import Slider from '@/components/slider/slider'
import SliderRow from '@/components/sliderRow/sliderRow'
import Poster from '@/components/movie/poster/poster'
import Description from '@/components/movie/description/description'
import VideoPlayer from '@/components/movie/videoPlayer/videoPlayer'
import Fact from '@/components/movie/fact/fact'
import PhotoGalery from '@/components/movie/photoGalery/photoGalery'
import Backdrop from '@/components/UI/backdrop/backdrop'
import nothingFound from '@/assets/img/nothingFound.png'
import Awards from '@/components/movie/awards/awards'
import StaffCard from '@/components/sliderRow/cards/staff/staffCard'
import MovieCard from '@/components/sliderRow/cards/movie/movieCard'
import Reviews from '@/components/movie/reviews/reviews'
import Navbar from '@/components/UI/navbar/navbar'
import { navbarItams } from '@/assets/constants/const'

interface MovieProps {
	params: {
		id: number
	}
	searchParams: Record<string, string>
}

export async function generateMetadata({ params }: MovieProps) {
	const movie = await kinopoiskDev.getMovieById(params.id)

	return {
		title: movie?.data?.name + ' | Niggfex' || movie?.data?.enName + ' | Niggfex' || 'Niggflex',
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
		kinopoiskUnofficial.getSimilarsByMovieId(params.id),
		kinopoiskUnofficial.getSequelsAndPrequelsByMovieId(params.id),
	])

	const movie = results[0].status === 'fulfilled' ? results[0].value : null
	const staff = results[1].status === 'fulfilled' && results[1].value.success ? results[1].value.data : null
	const facts = results[2].status === 'fulfilled' && results[2].value.success ? results[2].value.data : null
	const awards = results[3].status === 'fulfilled' && results[3].value.success ? results[3].value.data : null
	const reviews = results[4].status === 'fulfilled' && results[4].value.success ? results[4].value.data : null
	const images = results[5].status === 'fulfilled' ? results[5].value : null
	const similars = results[6].status === 'fulfilled' && results[6].value.success ? results[6].value.data : null
	const sequelsAndPrequels =
		results[7].status === 'fulfilled' && results[7].value.success ? results[7].value.data : null

	const actorsList = getPersonsByProfession(staff || [], ProfessionKey.Actor)
	const staffList = getPersonsByProfession(staff || [], 'staff')

	function getPersonsByProfession(staff: Staf[], type: ProfessionKey.Actor | 'staff') {
		const result: Staf[] = []

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

	function renderMovies() {
		if (!similars?.items.length && !sequelsAndPrequels?.length) return null

		return (
			<>
				<div id="movies">
					{similars?.items.length && (
						<SliderRow title={'Фильмы, похожие на "' + movie?.data?.name + '"'} length={similars.items.length}>
							{similars.items.map(movie => (
								<MovieCard movie={movie} key={movie.filmId} />
							))}
						</SliderRow>
					)}
					{sequelsAndPrequels?.length && (
						<SliderRow title={'Сиквелы и преквелы к "' + movie?.data?.name + '"'} length={sequelsAndPrequels.length}>
							{sequelsAndPrequels.map(movie => (
								<MovieCard movie={movie} key={movie.filmId} />
							))}
						</SliderRow>
					)}
				</div>
				<div className={cls.break} />
			</>
		)
	}

	function renderStaff() {
		if (!staff) return null

		return (
			<div id="staff">
				<SliderRow title="Актёры" length={actorsList.length}>
					{actorsList.map((person, i) => (
						<StaffCard person={person} key={i} />
					))}
				</SliderRow>
				<SliderRow title="Над фильмом работали" length={staffList.length}>
					{staffList.map((person, i) => (
						<StaffCard person={person} key={i} />
					))}
				</SliderRow>
				<div className={cls.break} />
			</div>
		)
	}

	function renderSlider() {
		return (
			<>
				<Slider
					titles={['Описание', 'Интересные факты', 'Гелерея', 'Награды', 'Трейлеры']}
					className={cls.slider}
					id="slider"
				>
					{renderSlide(
						!!movie?.data?.description,
						<div className={cls.slider__description}>
							{movie?.data?.logo.url && (
								<Image
									src={movie?.data?.logo.url}
									alt={`logo ${movie.data.alternativeName}`}
									width={400}
									height={100}
									className="rotate-[-15deg]"
								/>
							)}
							<p>{movie?.data?.description}</p>
						</div>,
						'flex justify-center items-center cursor-default'
					)}
					{renderSlide(
						!!movie?.data?.facts?.length,
						<ul className={cls.slider__facts}>
							{movie?.data?.facts?.map((fact, i) => (
								<li key={i}>
									<Fact fact={fact} />
								</li>
							))}
						</ul>
					)}
					{renderSlide(
						!!images?.data?.docs?.length,
						<div className="w-[50vw] h-fit">
							<PhotoGalery items={images?.data?.docs!} total={images?.data?.total!} movieId={params.id} />
						</div>,
						'flex justify-center'
					)}
					{renderSlide(!!awards?.items.length, <Awards awards={awards?.items!} />, 'flex justify-start')}
					{renderSlide(
						!!movie?.data?.videos?.trailers?.length,
						<VideoPlayer videos={movie?.data?.videos.trailers!} />,
						'flex justify-center'
					)}
				</Slider>
				<div className={cls.break} />
			</>
		)
	}

	function renderSlide(condition: boolean, element: ReactNode, className?: string) {
		return (
			<div className={cls.slider__container + (className ? ' ' + className : '')}>
				{condition ? (
					<>{element}</>
				) : (
					<div className="w-fit h-52">
						<Image src={nothingFound} alt="no data" fill className="object-scale-down" draggable={false} />
					</div>
				)}
			</div>
		)
	}

	return (
		<div className={cls.container}>
			<Navbar items={navbarItams} />
			<div className={cls.content}>
				<div className="flex flex-col">
					<Backdrop src={movie?.data?.poster.url} alt={movie?.data?.enName} />
					<div className={cls.logo} id="logo">
						<Poster movie={movie?.data!} />
						<Description movie={movie?.data!} />
					</div>
					<div className={cls.break} />
					{renderStaff()}
					{renderSlider()}
					{renderMovies()}
				</div>
				{reviews && <Reviews data={reviews} />}
				<div className={cls.break} />
			</div>
		</div>
	)
}

export default Movie
