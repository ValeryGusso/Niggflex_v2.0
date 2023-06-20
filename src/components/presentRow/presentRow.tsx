'use client'
import { FC } from 'react'
import cls from './presentRow.module.scss'
import { ShortMovie } from '@/kinopoisk/autotypes'
import SafeImage from '../UI/safeImage/safeImage'
import defaultImg from '@/assets/img/noimage.png'
import Image from 'next/image'

interface PresentRowProps {
	movies: ShortMovie[]
}

const PresentRow: FC<PresentRowProps> = ({ movies }) => {
	const renderData = [...movies, ...movies]
	console.log(renderData.length)
	return (
		<ul className={cls.container}>
			{renderData.map((movie, i) => (
				<li key={i} className="relative w-2/12 h-fit flex items-center justify-center overflow-hidden">
					<SafeImage
						src={movie.poster.previewUrl!}
						defaultImg={defaultImg}
						description={movie.enName || 'movie'}
						draggable={false}
						width={112}
						height={176}
						className="rounded-xl"
					/>
				</li>
			))}
		</ul>
	)
}

export default PresentRow
