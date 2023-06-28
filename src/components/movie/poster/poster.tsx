import { FC } from 'react'
import Image from 'next/image'
import cls from './poster.module.scss'
import { FullMovie } from '@/kinopoiskDev/autotypes'
import kpLogo from '@/assets/img/kp_logo.png'
import imdbLogo from '@/assets/img/imdb_logo.png'
import tmdbLogo from '@/assets/img/tmdb_logo.png'

interface PosterProps {
	movie: FullMovie
}

const Poster: FC<PosterProps> = ({ movie }) => {
	return (
		<div className="flex flex-col w-1/5">
			<div className="flex flex-col w-full">
				<Image
					src={movie.poster.url || ''}
					alt={movie.enName || 'movie?'}
					width={667}
					height={1000}
					className="w-full h-fit rounded-md"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex w-full justify-around">
					<div className="flex justify-center items-center gap-2">
						<Image src={kpLogo} alt="kinopois logo" draggable={false} className="w-8 h-fit" />
						<div className="flex flex-col items-center justify-center">
							<p>Кинопоиск</p>
							<p>{movie.rating.kp ? movie.rating.kp.toFixed(2) : '---'}</p>
						</div>
					</div>
					<div className="flex justify-center items-center gap-2">
						<Image src={imdbLogo} alt="imdb logo" draggable={false} className="w-8 h-fit scale-150" />
						<div className="flex flex-col items-center justify-center">
							<p>IMDB</p>
							<p>{movie.rating.imdb ? movie.rating.imdb.toFixed(2) : '---'}</p>
						</div>
					</div>
					<div className="flex justify-center items-center gap-2">
						<Image src={tmdbLogo} alt="tmdb logo" draggable={false} className="w-8 h-fit" />
						<div className="flex flex-col items-center justify-center">
							<p>TMDB</p>
							<p>{movie.rating.tmdb ? movie.rating.tmdb.toFixed(2) : '---'}</p>
						</div>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<div className="flex flex-col justify-center items-center">
						<p>Критики (Мир / Россия)</p>
						<p>
							{movie.rating.filmCritics ? movie.rating.filmCritics.toFixed(2) : '---'} /{' '}
							{movie.rating.russianFilmCritics ? (movie.rating.russianFilmCritics / 10).toFixed(2) : '---'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Poster
