'use client'
import { FC } from 'react'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import cls from './sider.module.css'

const Slider: FC = () => {
	return (
		<AwesomeSlider>
			<div className="w-full h-full bg-rose-200">
				<h1>Описание</h1>
			</div>
			<div className="w-full h-full bg-rose-300">
				<h1>Интересные факты:</h1>
			</div>
			<div className="w-full h-full bg-rose-400">
				<h1>Над филь</h1>
			</div>
			<div className="w-full h-full bg-rose-500">
				<h1>3афафа ф</h1>
			</div>
			<div className="w-full h-full bg-rose-600">
				<h1>афаф афыа</h1>
			</div>
		</AwesomeSlider>
	)
}

export default Slider
