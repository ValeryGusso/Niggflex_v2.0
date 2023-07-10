'use client'
import { FC, useRef } from 'react'
import cls from './presentRow.module.scss'
import { ShortMovie } from '@/kinopoiskDev/autotypes'
import SafeImage from '../UI/safeImage/safeImage'
import defaultImg from '@/assets/img/noimage.png'

interface PresentRowProps {
	movies: ShortMovie[]
	direction: 'left' | 'right'
}

const PresentRow: FC<PresentRowProps> = ({ movies, direction }) => {
	const renderData = [...movies, ...movies]
	const ulRef = useRef<HTMLUListElement>(null)

	return (
		<ul ref={ulRef} className={cls.container}>
			{renderData.map((movie, i) => (
				<li key={i} className="select-none" style={{ animationDirection: direction === 'left' ? 'normal' : 'reverse' }}>
					<SafeImage
						src={movie.poster.previewUrl!}
						errorImage={defaultImg}
						alt={movie.enName || 'movie'}
						draggable={false}
						width={360}
						height={533}
					/>
				</li>
			))}
		</ul>
	)
}

export default PresentRow
