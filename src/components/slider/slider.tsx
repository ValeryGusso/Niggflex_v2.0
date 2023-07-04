'use client'
import { CSSProperties, FC, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import AwesomeSlider, { AwesomeSliderProps, AwesomeSliderRequestEventArgs } from 'react-awesome-slider'
import cls from './slider.module.scss'
import 'react-awesome-slider/dist/styles.css'

interface SliderProps extends AwesomeSliderProps {
	titles: string[]
}

const Slider: FC<SliderProps> = ({ children, className, titles }) => {
	const [active, setActive] = useState(0)
	const [hovered, setHovered] = useState(0)
	const disable = useRef(false)

	function swipe(e: AwesomeSliderRequestEventArgs) {
		setActive(e.nextIndex)
	}

	function click(i: number) {
		if (!disable.current && i !== active) {
			setActive(i)
		}
	}

	return (
		<div className={className}>
			<ul className={cls.menu}>
				{titles.map((title, i) => (
					<li
						key={i}
						className={`${active === i ? 'text-orange-500 ' : ''}${cls.menu__item}`}
						onClick={() => click(i)}
						onMouseEnter={() => setHovered(i)}
					>
						{active === i && <FaArrowRight size={24} fill="rgb(249,115,22)" />}
						{title}
						{active === i && <FaArrowLeft size={24} fill="rgb(249,115,22)" />}
					</li>
				))}
				<li className={cls.background} style={{ '--x': hovered * 288 + 'px' } as CSSProperties}></li>
			</ul>
			<AwesomeSlider
				onTransitionEnd={() => setTimeout(() => (disable.current = false), 500)}
				onTransitionStart={() => (disable.current = true)}
				selected={active}
				onTransitionRequest={swipe}
				className={`${cls.redefineBg} h-[calc(100vh-120px)]`}
			>
				{children}
			</AwesomeSlider>
		</div>
	)
}

export default Slider
