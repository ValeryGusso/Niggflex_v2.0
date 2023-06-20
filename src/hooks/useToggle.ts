import { useState } from 'react'

export function useToggle(initialState: boolean) {
	const [val, setVal] = useState(initialState)

	function toggle(newVal?: boolean) {
		if (newVal !== undefined) {
			setVal(newVal)
		} else {
			setVal(prev => !prev)
		}
	}

	return [val, toggle] as const
}
