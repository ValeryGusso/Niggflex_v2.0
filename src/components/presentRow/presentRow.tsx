'use client'
import { FC, useEffect, useRef } from 'react'
import cls from './presentRow.module.scss'
import { ShortMovie } from '@/kinopoiskDev/autotypes'
import SafeImage from '../UI/safeImage/safeImage'
import defaultImg from '@/assets/img/noimage.png'
import Image from 'next/image'
import { useToggle } from '@/hooks/useToggle'

interface PresentRowProps {
	movies: ShortMovie[]
}

const PresentRow: FC<PresentRowProps> = ({ movies }) => {
	// const [showDescriptions, showDescriptionsToggle] = useToggle(false)
	const renderData = [...movies, ...movies]
	const ulRef = useRef<HTMLUListElement>(null)

	// useEffect(() => {
	// 	console.log(ulRef.current?.clientWidth)
	// }, [])
	return (
		<ul ref={ulRef} className={cls.container}>
			{renderData.map((movie, i) => (
				<li
					key={i}
					// onMouseEnter={() => showDescriptionsToggle()}
					// onMouseLeave={() => showDescriptionsToggle()}
				>
					<SafeImage
						src={movie.poster.previewUrl!}
						defaultImg={defaultImg}
						description={movie.enName || 'movie'}
						draggable={false}
						width={360}
						height={533}
					/>
					{/* {showDescriptions && (
						<div className="absolute z-50">
							<h2>{movie.name && movie.enName}</h2>
							<h2>{movie.year}</h2>
							<p>{movie.shortDescription}</p>
						</div>
					)} */}
				</li>
			))}
		</ul>
	)
}

export default PresentRow
