'use client'
import { FC, useRef, useState } from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { Image as ImageType } from '@/kinopoiskDev/@types/images'
import SafeImage from '@/components/UI/safeImage/safeImage'

interface PhotoGaleryProps {
	images: ImageType[]
}

const PhotoGalery: FC<PhotoGaleryProps> = ({ images }) => {
	const timestamp = useRef(0)
	const [selected, setSelected] = useState(0)

	function click(i: number) {
		if (Date.now() - timestamp.current < 200) {
			setSelected(i)
		}
	}

	return (
		<div className="w-[50vw] h-[50vh] overflow-hidden">
			<CarouselProvider
				naturalSlideWidth={100}
				naturalSlideHeight={125}
				totalSlides={30}
				orientation="vertical"
				visibleSlides={10}
				className="flex w-full h-full gap-4"
			>
				<div className="w-20 h-full overflow-hidden">
					<Slider preventVerticalScrollOnTouch className="h-full cursor-pointer">
						{images.map((img, i) => (
							<Slide
								index={i}
								className="w-full h-fit p-2 flex items-center justify-center border-2 border-transparent hover:border-sky-300"
								onPointerDown={() => (timestamp.current = Date.now())}
								onPointerUp={() => click(i)}
								tag="div"
							>
								<SafeImage src={img.url} alt={img.type} width={img.width} height={img.height} draggable={false} />
							</Slide>
						))}
					</Slider>
				</div>
				<div className="relative w-full h-full flex items-center justify-center">
					<div className="absolute top-1/2 left-4">
						<ButtonBack>
							<p>Предыдущая</p>
						</ButtonBack>
					</div>
					<div className="absolute top-1/2 right-4">
						<ButtonNext>
							<p>Следующая</p>
						</ButtonNext>
					</div>
					<SafeImage
						src={images[selected].url}
						alt={images[selected].type}
						width={images[selected].width}
						height={images[selected].height}
						draggable={false}
						className="conta"
					/>
				</div>
			</CarouselProvider>
		</div>
	)
}

export default PhotoGalery
