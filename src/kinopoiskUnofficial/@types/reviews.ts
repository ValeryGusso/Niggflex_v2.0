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
	type: ReviewType
	date: Date
	positiveRating: number
	negativeRating: number
	author: string
	title: null | string
	description: string
}

export enum ReviewType {
	negative = 'NEGATIVE',
	neutral = 'NEUTRAL',
	positive = 'POSITIVE',
	unknown = 'UNKNOWN',
}
