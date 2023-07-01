'use client'
import { FC, useEffect, useRef, useState } from 'react'
import cls from './videoPlayer.module.scss'
import { Video } from '@/kinopoiskDev/autotypes'
import { getYoutubeVideoSrc } from '@/utils/get'
import Select, { IOption } from '@/components/UI/select/select'

interface VideoPlayerProps {
	videos: Video[]
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videos }) => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const width = useRef(0)

	useEffect(() => {
		const { innerWidth } = window
		width.current = Math.floor(innerWidth / 2)
		setCurrentIndex(0)
	}, [])

	const options: IOption[] = []

	videos.forEach((video, i) => {
		if (video.name && video.url) {
			options.push({ id: i, title: video.name, value: i })
		}
	})

	return (
		<div className={cls.container}>
			<div className={cls.title}>
				<h1>Трейлеры</h1>
				<Select options={options} onChange={setCurrentIndex} selected={currentIndex} width={350} />
			</div>
			{width.current > 0 && (
				<iframe width={width.current} height={width.current / 1.5} src={getYoutubeVideoSrc(videos[currentIndex].url!)}>
					К сожалению, твой браузер не поддерживает это :(
				</iframe>
			)}
		</div>
	)
}

export default VideoPlayer
