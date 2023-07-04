import { useEffect, useRef, useState } from 'react'

export function useHash() {
	const [hash, setHash] = useState('')
	const id = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		function handleHashChange(e: HashChangeEvent) {
			const curHash = e.newURL.match(/(?<=#)\w+/i)
			if (curHash && curHash[0]) {
				if (id.current) {
					clearTimeout(id.current)
					id.current = null
				}
				id.current = setTimeout(() => {
					setHash(curHash[0])
				}, 350)
				setHash(curHash[0])
			}
		}

		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [])

	return hash
}
