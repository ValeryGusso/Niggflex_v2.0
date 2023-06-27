export interface Images {
	docs: Image[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Image {
	movieId: number
	url: string
	previewUrl: string
	type: string
	height: number
	width: number
	id: string
	language?: string
}
