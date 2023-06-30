'use client'
import { FC } from 'react'
import cls from './sliderRow.module.scss'
import Flickity from 'react-flickity-component'
import { ShortStaf } from '@/kinopoiskUnofficial/@types/staff'
import { cut, printProfessin } from '@/utils/print'
import Link from 'next/link'
import SafeImage from '../UI/safeImage/safeImage'

interface SliderRowProps {
	title: string
	showRole: boolean
	persons: ShortStaf[]
}

const SliderRow: FC<SliderRowProps> = ({ title, showRole, persons }) => {
	const flickityOptions = {
		wrapAround: persons.length > 20,
		cellAlign: persons.length > 20 ? 'left' : 'center',
		initialIndex: persons.length > 20 ? 0 : Math.floor(persons.length / 2),
		accessibility: false,
		freeScroll: true,
	}

	return (
		<div className={cls.container}>
			<h1 className={cls.title}>{title}</h1>
			<Flickity
				className={`carousel ${cls.carousel}`}
				elementType={'div'}
				options={flickityOptions}
				disableImagesLoaded={false}
				reloadOnUpdate
				static
			>
				{persons.map((person, i) => (
					<div className={cls.card} key={i}>
						<div className={cls.card__title__container}>
							<Link href={'#' /* `name/${person.staffId}` */} className={cls.card__title}>
								{cut(person.nameRu || person.nameEn || 'Нет данных', 20)}
							</Link>
						</div>
						<div className={cls.card__imagebox}>
							<SafeImage src={person.posterUrl} alt={`photo ${person.nameEn}`} width={300} height={400} />
						</div>
						{showRole && <p className={cls.card__role}>{printProfessin(person.professionText)}</p>}
					</div>
				))}
			</Flickity>
		</div>
	)
}

export default SliderRow
