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
	const [currentIndex, setCurrentIndex] = useState(0)
	const width = useRef(0)

	useEffect(() => {
		const { innerWidth } = window
		width.current = Math.floor(innerWidth / 3)
	}, [])

	const options: IOption[] = []

	videos.forEach((video, i) => {
		options.push({ id: i, title: video.name!, value: i })
	})

	return (
		<div className="flex w-full items-center">
			<Select options={options} onChange={setCurrentIndex} selected={currentIndex} />
			<iframe
				width={width.current}
				height={width.current / 1.5}
				src={getYoutubeVideoSrc(videos[currentIndex].url!)}
			></iframe>
		</div>
	)
}

export default VideoPlayer
