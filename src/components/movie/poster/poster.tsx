import { FC } from 'react'
import Image from 'next/image'
import cls from './poster.module.scss'
import { FullMovie } from '@/kinopoiskDev/autotypes'
import kpLogo from '@/assets/img/kp_logo.png'
import imdbLogo from '@/assets/img/imdb_logo.png'
import tmdbLogo from '@/assets/img/tmdb_logo.png'
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client'

interface PosterProps {
	movie: MovieDtoV13
}

const Poster: FC<PosterProps> = ({ movie }) => {
	return (
		<div className={cls.container}>
			<div className={cls.poster}>
				<Image
					src={movie.poster?.url || ''}
					alt={movie.enName || 'movie?'}
					width={667}
					height={1000}
					className={cls.poster__image}
					draggable={false}
				/>
			</div>

			<div className={cls.rating}>
				<div className={cls.rating__row}>
					{movie.rating?.kp && (
						<div className={cls.rating__item}>
							<Image src={kpLogo} alt="kinopois logo" draggable={false} className={cls.rating__image} />
							<div className={cls.rating__description}>
								<p>Кинопоиск</p>
								<p>{movie.rating.kp.toFixed(2)}</p>
							</div>
						</div>
					)}
					{movie.rating?.imdb && (
						<div className={cls.rating__item}>
							<Image src={imdbLogo} alt="imdb logo" draggable={false} className={cls.rating__image + ' scale-150'} />
							<div className={cls.rating__description}>
								<p>IMDB</p>
								<p>{movie.rating.imdb.toFixed(2)}</p>
							</div>
						</div>
					)}
					{movie.rating?.tmdb && (
						<div className={cls.rating__item}>
							<Image src={tmdbLogo} alt="tmdb logo" draggable={false} className={cls.rating__image} />
							<div className={cls.rating__description}>
								<p>TMDB</p>
								<p>{movie.rating.tmdb.toFixed(2)}</p>
							</div>
						</div>
					)}
				</div>
				{(movie.rating?.filmCritics || movie.rating?.russianFilmCritics) && (
					<div className={cls.rating__row}>
						<div className={cls.rating__description}>
							<p>Критики (Мир / Россия)</p>
							<p>
								{movie.rating.filmCritics ? movie.rating.filmCritics.toFixed(2) : '---'} /{' '}
								{movie.rating.russianFilmCritics ? (movie.rating.russianFilmCritics / 10).toFixed(2) : '---'}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Poster
