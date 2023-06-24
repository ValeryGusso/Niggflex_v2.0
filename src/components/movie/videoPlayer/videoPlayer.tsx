'use client'
import { FC, useEffect, useRef, useState } from 'react'
import cls from './videoPlayer.module.scss'
import { Video } from '@/kinopoiskDev/autotypes'
import { getYoutybeVideoSrc } from '@/utils/get'

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

	function switchCurIndex(type: 'inc' | 'dec') {
		setCurrentIndex(prev => {
			if (type === 'inc') {
				return prev < videos.length - 1 ? prev + 1 : prev
			} else {
				return prev > 0 ? prev - 1 : prev
			}
		})
	}

	return (
		<div className="flex w-full justify-center">
			<iframe
				width={width.current}
				height={width.current / 1.5}
				src={getYoutybeVideoSrc(videos[currentIndex].url!)}
			></iframe>
			<button onClick={() => switchCurIndex('dec')}>dec</button>
			<button onClick={() => switchCurIndex('inc')}>inc</button>
		</div>
	)
}

export default VideoPlayer
