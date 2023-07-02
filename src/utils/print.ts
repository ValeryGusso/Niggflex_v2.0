import { months } from '@/assets/constants/const'

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

export function printProfessin(value?: string) {
	return value ? value.replace(/\w*(ы|и$)/i, '') : 'Нет данных'
}

export function printDate(time: Date | number | string) {
	const date = new Date(time)

	return `${date.getDay()}-го ${months[date.getMonth()]} ${date.getFullYear()}г.`
}

export function cut(str: string | null, length: number) {
	if (!str) {
		return 'Нет данных'
	}

	if (str.length < length) {
		return str
	}

	return str.match(new RegExp(`(\\w|\\W){${length}}`))![0] + '...'
}
