export interface Facts {
	total: number
	items: Fact[]
}

export interface Fact {
	text: string
	type: Type
	spoiler: boolean
}

export enum Type {
	fact = 'FACT',
	blooper = 'BLOOPER',
}
