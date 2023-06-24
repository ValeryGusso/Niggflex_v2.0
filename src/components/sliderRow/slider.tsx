'use client'
import { FC } from 'react'
import Flickity from 'react-flickity-component'
import Image from 'next/image'
import { ShortStaf } from '@/kinopoiskUnofficial/@types/staff'
import { printProfessin } from '@/utils/print'

interface SliderRowProps {
	title: string
	showRole: boolean
	persons: ShortStaf[]
}

const flickityOptions = {
	initialIndex: 0,
	// wrapAround: true,
	cellAlign: 'left',
	dragThreshold: 5,
	selectedAttraction: 0.1,
}

const SliderRow: FC<SliderRowProps> = ({ title, showRole, persons }) => {
	return (
		<div className="w-full">
			<h1>{title}</h1>
			<Flickity
				className="carousel gap-12 w-full border-none outline-none overflow-hidden select-none cursor-grab"
				elementType={'div'}
				options={flickityOptions}
				disableImagesLoaded={false}
				reloadOnUpdate
				static
			>
				{persons.map((person, i) => (
					<div className="w-24 flex flex-col items-center justify-center mx-2" key={i}>
						<h2 className="h-16 break-normal">{person.nameRu || person.nameEn || 'Нет данных'}</h2>
						<Image src={person.posterUrl || ''} alt={`photo ${person.nameEn}`} width={300} height={400} />
						{showRole && <p>{printProfessin(person.professionText)}</p>}
					</div>
				))}
			</Flickity>
		</div>
	)
}

export default SliderRow
