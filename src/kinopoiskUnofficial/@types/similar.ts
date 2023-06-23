export interface Similars {
	total: number
	items: Similar[]
}

export interface Similar {
	filmId: number
	nameRu: string
	nameEn: string
	nameOriginal: string
	posterUrl: string
	posterUrlPreview: string
	relationType: RelationType
}

export enum RelationType {
	similar = 'SIMILAR',
}
