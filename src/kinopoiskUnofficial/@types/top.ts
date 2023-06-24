export interface Top {
	pagesCount: number
	films: Movie[]
}

export interface Movie {
	filmId: number
	nameRu: string | null
	nameEn: null | string
	year: string | null
	filmLength: null | string
	countries: Country[]
	genres: Genre[]
	rating: string | null
	ratingVoteCount: number | null
	posterUrl: string | null
	posterUrlPreview: string
	ratingChange: null
}

export interface Country {
	country: string
}

export interface Genre {
	genre: string
}
