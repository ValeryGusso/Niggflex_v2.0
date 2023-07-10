'use client'
import { CSSProperties, FC } from 'react'
import cls from './star.module.scss'

interface StarProps {
	size: number
	fill: number
}

const Star: FC<StarProps> = ({ size, fill }) => {
	return <div className={cls.container} style={{ '--size': size + 'px', '--fill': fill } as CSSProperties}></div>
}

export default Star
