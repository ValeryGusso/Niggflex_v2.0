export interface Awards {
	total: number
	items: Award[]
}

export interface Award {
	name: string
	win: boolean
	imageUrl: null | string
	nominationName: string
	year: number
	persons: Person[]
}

export interface Person {
	kinopoiskId: number
	webUrl: string | null
	nameRu: string | null
	nameEn: string | null
	sex: Sex | null
	posterUrl: string | null
	growth: number | null
	birthday: Date | null
	death: Date | null
	age: number | null
	birthplace: null | string
	deathplace: null | string
	profession: null | string
}

export enum Sex {
	female = 'FEMALE',
	male = 'MALE',
}
