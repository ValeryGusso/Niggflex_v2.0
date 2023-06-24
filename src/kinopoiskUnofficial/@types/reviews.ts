export interface Revievs {
	total: number
	totalPages: number
	totalPositiveReviews: number
	totalNegativeReviews: number
	totalNeutralReviews: number
	items: Review[]
}

export interface Review {
	kinopoiskId: number
	type: Type
	date: Date
	positiveRating: number | null
	negativeRating: number | null
	author: string | null
	title: null | string
	description: string | null
}

export enum Type {
	negative = 'NEGATIVE',
	neutral = 'NEUTRAL',
	positive = 'POSITIVE',
}
