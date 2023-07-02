export interface Similars {
	total: number
	items: Similar[]
}

export interface Similar {
	filmId: number
	nameRu: string | null
	nameEn: string | null
	nameOriginal: string | null
	posterUrl: string | null
	posterUrlPreview: string | null
	relationType: RelationType
}

export enum RelationType {
	similar = 'SIMILAR',
}
