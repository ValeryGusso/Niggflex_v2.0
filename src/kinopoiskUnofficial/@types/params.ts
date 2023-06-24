/* DEFAULT PARAMS TYPE */
export type Params = Partial<Record<string, string | number>>

/* REVIEWS PARAMS */
export interface ReviewsParams extends Params {
	opder:
		| 'DATE_ASC'
		| 'DATE_DESC'
		| 'USER_POSITIVE_RATING_ASC'
		| 'USER_POSITIVE_RATING_DESC'
		| 'USER_NEGATIVE_RATING_ASC'
		| 'USER_NEGATIVE_RATING_DESC'
	page: number
}

/* IMAGES PARAMS */
export interface ImageParams extends Params {
	type: 'STILL' | 'SHOOTING' | 'POSTER' | 'FAN_ART' | 'PROMO' | 'CONCEPT' | 'WALLPAPER' | 'COVER' | 'SCREENSHOT'
	page: number
}

/* TOP PARAMS */
export interface TopParams extends Params {
	type: 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS'
	page: number
}
