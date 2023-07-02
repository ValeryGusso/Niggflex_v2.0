import { FC } from 'react'
import cls from './movieCard.module.scss'
import { Similar } from '@/kinopoiskUnofficial/@types/similar'
import SafeImage from '@/components/UI/safeImage/safeImage'
import { SequelsAndPrequels } from '@/kinopoiskUnofficial/@types/sequelsAndPrequels'
import Link from 'next/link'

interface MovieCardProps {
	movie: Similar | SequelsAndPrequels
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
	return (
		<div className={cls.container}>
			<div className={cls.title}>
				<Link href="#" className={cls.link}>
					{movie.nameRu || movie.nameEn || movie.nameOriginal}
				</Link>
			</div>
			<div className={cls.image}>
				<SafeImage
					src={movie.posterUrl}
					blurDataURL={movie.posterUrlPreview || undefined}
					alt={movie.nameEn || 'poster'}
					className="object-cover"
					draggable={false}
					fill
				/>
			</div>
		</div>
	)
}

export default MovieCard
