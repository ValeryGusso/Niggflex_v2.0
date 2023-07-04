import { Dispatch, SetStateAction, useCallback, useRef } from 'react'

export function useDebounce<T>(setValue: Dispatch<SetStateAction<T>>, cb: VoidFunction, delay: number) {
	const id = useRef<ReturnType<typeof setTimeout> | null>(null)

	const update = useCallback(
		(value: T) => {
			setValue(value)
			if (id.current) {
				clearTimeout(id.current)
			}

			id.current = setTimeout(cb, delay)
		},
		[setValue, cb, delay]
	)

	return update
}
