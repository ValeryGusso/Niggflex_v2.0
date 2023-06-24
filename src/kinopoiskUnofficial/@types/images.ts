export interface Images {
	total: number
	totalPages: number
	items: Image[]
}

export interface Image {
	imageUrl: string | null
	previewUrl: string | null
}
