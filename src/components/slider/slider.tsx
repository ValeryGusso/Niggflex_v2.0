'use client'
import { FC } from 'react'
import AwesomeSlider, { AwesomeSliderProps } from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'

interface SliderProps extends AwesomeSliderProps {}

const Slider: FC<SliderProps> = ({ children, className }) => {
	return <AwesomeSlider className={className}>{children}</AwesomeSlider>
}

export default Slider
