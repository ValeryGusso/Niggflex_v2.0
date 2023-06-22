'use client'
import { FC } from 'react'
import Flickity from 'react-flickity-component'
import cls from './sliderRow.module.scss'

const flickityOptions = {
	initialIndex: 1,
	wrapAround: true,
	cellAlign: 'left',
	dragThreshold: 5,
	selectedAttraction: 0.1,
}

const SliderRow: FC = () => {
	return (
		<div className="w-full bg-slate-500">
			<h1>АКТЁРЫ</h1>
			<Flickity
				className="carousel gap-12 w-full border-none outline-none overflow-hidden select-none cursor-grab"
				elementType={'div'}
				options={flickityOptions}
				disableImagesLoaded={false}
				reloadOnUpdate
				static
			>
				{Array(50)
					.fill(null)
					.map((_, i) => (
						<>
							<img
								className="mx-6 w-24"
								src="https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg"
							/>
							<h1>{i}</h1>
						</>
					))}
			</Flickity>
		</div>
	)
}

export default SliderRow
