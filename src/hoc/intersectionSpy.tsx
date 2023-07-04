'use client'
import { FC, ReactNode, useEffect, useRef } from 'react'

interface IntersectionSpyProps {
	children: ReactNode
	id?: string
}

const IntersectionSpy: FC<IntersectionSpyProps> = ({ children, id }) => {
	const div = useRef<HTMLDivElement>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		if (div.current) {
			const observer = new IntersectionObserver(
				e => {
					if (e[0] && e[0].isIntersecting) {
						if (timer.current) {
							clearTimeout(timer.current)
							timer.current = null
						}

						timer.current = setTimeout(() => {
							window.location.hash = id || 'header'
						}, 300)
					}

					if (e[0] && !e[0].isIntersecting) {
						if (timer.current) {
							clearTimeout(timer.current)
							timer.current = null
						}
					}
				},
				{ threshold: 0.75 }
			)

			observer.observe(div.current)

			return () => {
				observer.disconnect()
			}
		}
	}, [])

	return (
		<div ref={div} id={id}>
			{children}
		</div>
	)
}

export default IntersectionSpy
