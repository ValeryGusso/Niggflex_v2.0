import { CSSProperties, FC, ReactNode, useCallback, useEffect, useState, useRef } from 'react'
import cls from './mobileModal.module.scss'

interface MobileModalProps {
	children: ReactNode
	onClose: VoidFunction
}

const MobileModal: FC<MobileModalProps> = ({ children, onClose }) => {
	const [bottom, setBottom] = useState(0)
	const startY = useRef(0)
	const timeStamp = useRef(0)

	const pointerMove = useCallback((e: any) => {
		const y = e.targetTouches[0].pageY

		setBottom(startY.current - y)
	}, [])

	useEffect(() => {
		window.addEventListener('touchmove', pointerMove)
		window.addEventListener('touchend', touchUp)
		window.addEventListener('touchstart', touchDown)
		document.body.style.overflow = 'hidden'

		return () => {
			window.removeEventListener('touchmove', pointerMove)
			window.removeEventListener('touchend', touchUp)
			window.removeEventListener('touchstart', touchDown)
			document.body.style.overflow = 'auto'
		}
	}, [])

	const touchDown = useCallback((e: any) => {
		startY.current = +e.touches[0].clientY
		timeStamp.current = Date.now()
	}, [])

	const touchUp = useCallback((e: any) => {
		if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
			return
		}

		if (Date.now() - timeStamp.current < 150) {
			return
		}

		const y = e.changedTouches[0].clientY

		if (window.innerHeight / 2.5 > startY.current - y) {
			setBottom(0)
		} else {
			onClose()
		}
	}, [])

	return (
		<div className={cls.modal} style={{ '--bottom': bottom + 'px' } as CSSProperties}>
			{children}
		</div>
	)
}

export default MobileModal
