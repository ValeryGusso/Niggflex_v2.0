export interface SequelsAndPrequels {
	filmId: number
	nameRu: string
	nameEn: string
	nameOriginal: string
	posterUrl: string
	posterUrlPreview: string
	relationType: RelationType
}

export enum RelationType {
	sequel = 'SEQUEL',
	prequel = 'PREQUEL',
	remake = 'REMAKE',
	unknown = 'UNKNOWN',
}
