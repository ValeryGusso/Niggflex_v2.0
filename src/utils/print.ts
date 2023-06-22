export function printCurrency(value?: number | null) {
	if (!value) {
		return '---'
	}

	const res = value.toString().split('')

	for (let i = res.length - 2; i > 0; i -= 3) {
		res.splice(i - 1, 0, ' ')
	}

	return res.join('')
}

export function printTime(value?: number | null) {
	if (!value) {
		return 'Нет данных'
	}

	return `${value}мин. (${Math.floor(value / 60)}ч. ${value % 60}мин.)`
}
