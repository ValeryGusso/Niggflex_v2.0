export interface FullMovie {
	id: number
	externalId: ExternalId
	name: string | null
	alternativeName: string | null
	enName: string | null
	names: Name[]
	type: string | null
	typeNumber: number | null
	year: number | null
	description: string | null
	shortDescription: string | null
	slogan: string | null
	status: string | null
	rating: Rating
	votes: Votes
	movieLength: number | null
	ratingMpaa: string | null
	ageRating: number | null
	logo: Logo
	poster: ShortImage
	backdrop: ShortImage
	videos: VideoTypes
	genres: ItemName[]
	countries: ItemName[]
	persons: Person[]
	reviewInfo: ReviewInfo
	seasonsInfo: SeasonsInfo[]
	budget: Budget
	fees: Fees
	premiere: Premiere
	similarMovies: LinkedMovie[]
	sequelsAndPrequels: LinkedMovie[]
	watchability: Watchability
	releaseYears: YearRange[]
	top10: number | null
	top250: number | null
	ticketsOnSale: boolean | null
	totalSeriesLength: number | null
	seriesLength: number | null
	isSeries: boolean | null
	audience: Audience[]
	facts: FactInMovie[]
	imagesInfo: Images
	productionCompanies: VendorImage[]
	updatedAt: Date | null
	deletedAt: Date | null
	color?: string
}

export interface ShortMovie {
	id: number
	alternativeName: string | null
	countries: ItemName[]
	description: string | null
	enName: string | null
	externalId: ExternalId
	genres: ItemName[]
	movieLength: number | null
	name: string | null
	names: Name[]
	poster: ShortImage
	rating: Rating
	shortDescription: string | null
	type: string | null
	votes: Votes
	year: number | null
	logo: Logo
	watchability: Watchability
	releaseYears: YearRange[]
	color?: string
}

/* INTERNAL TYPES */
export interface ExternalId {
	kpHD: string | null
	imdb: string | null
	tmdb: number | null
}

export interface Name {
	name: string
	language: string | null
	type: string | null
}

export interface Rating {
	kp: number | null
	imdb: number | null
	tmdb: number | null
	filmCritics: number | null
	russianFilmCritics: number | null
	await: number | null
}

export interface Votes {
	kp: string | null
	imdb: string | null
	tmdb: number | null
	filmCritics: number | null
	russianFilmCritics: number | null
	await: number | null
}

export interface Logo {
	url: string | null
}

export interface ShortImage {
	url: string | null
	previewUrl: string | null
}

export interface Video {
	url: string | null
	name: string | null
	site: string | null
	type: string | null
	size: number | null
}

export interface VideoTypes {
	trailers: Video[]
	teasers: Video[]
}

export interface ItemName {
	name: string | null
}

export interface PersonInMovie {
	id: number | null
	photo: string | null
	name: string | null
	enName: string | null
	description: string | null
	profession: string | null
	enProfession: string | null
}

export interface ReviewInfo {
	count: number | null
	positiveCount: number | null
	percentage: string | null
}

export interface SeasonsInfo {
	number: number | null
	episodesCount: number | null
}

export interface Budget {
	value: number | null
	currency: string | null
}

export interface Fees {
	world: Budget
	russia: Budget
	usa: Budget
}

export interface Premiere {
	country: string | null
	world: string | null
	russia: string | null
	digital: string | null
	cinema: string | null
	bluray: string | null
	dvd: string | null
}

export interface LinkedMovie {
	id: number | null
	name: string | null
	enName: string | null
	alternativeName: string | null
	type: string | null
	poster: ShortImage
}

export interface WatchabilityItem {
	name: string | null
	logo: Logo
	url: string | null
}

export interface Watchability {
	items: WatchabilityItem[]
}

export interface YearRange {
	start: number | null
	end: number | null
}

export interface Audience {
	count: number | null
	country: string | null
}

export interface FactInMovie {
	value: string | null
	type: string | null
	spoiler: boolean
}

export interface Images {
	postersCount: number | null
	backdropsCount: number | null
	framesCount: number | null
}

export interface VendorImage {
	name: string | null
	url: string | null
	previewUrl: string | null
}

export interface MeiliMovieEntity {
	id: number | null
	name: string | null
	alternativeName: string | null
	enName: string | null
	names: string[]
	type: string | null
	year: number | null
	description: string | null
	shortDescription: string | null
	logo: string | null
	poster: string | null
	backdrop: string | null
	rating: number | null
	votes: number | null
	movieLength: number | null
	genres: string[]
	countries: string[]
	releaseYears: number[]
}

export interface NominationAward {
	title: string | null
	year: number | null
}

export interface Nomination {
	award: NominationAward
	title: string | null
}

export interface PartialTypeClass {
	nomination: Nomination
	winning: boolean
	movieId: number | null
}

export interface Episode {
	number: number | null
	name: string | null
	enName: string | null
	description: string | null
	date: string | null
}

export interface Season {
	movieId: number | null
	number: number | null
	episodesCount: number | null
	episodes: Episode[]
}

export interface Review {
	id: number | null
	movieId: number | null
	title: string | null
	type: string | null
	review: string | null
	date: string | null
	author: string | null
	authorId: number | null
	userRating: number | null
}

export interface MeiliPersonEntity {
	id: number | null
	name: string | null
	enName: string | null
	photo: string | null
	sex: string | null
	growth: number | null
	birthday: string | null
	death: string | null
	age: number | null
	birthPlace: string[]
	deathPlace: string[]
	profession: string[]
}

export interface Movie {
	id: number | null
	name: string | null
	rating: number | null
}

export interface PersonAward {
	nomination: Nomination
	winning: boolean
	personId: number | null
	movie: Movie
}

export interface BirthPlace {
	value: string | null
}

export interface DeathPlace {
	value: string | null
}

export interface Spouses {
	id: number | null
	name: string | null
	divorced: boolean
	divorcedReason: string | null
	sex: string | null
	children: number | null
	relation: string | null
}

export interface Profession {
	value: string | null
}

export interface FactInPerson {
	value: string | null
}

export interface MovieInPerson {
	id: number | null
	name: string | null
	alternativeName: string | null
	rating: number | null
	general: boolean | null
	description: string | null
	enProfession: string | null
}

export interface Person {
	id: number | null
	name: string | null
	enName: string | null
	photo: string | null
	sex: string | null
	growth: number | null
	birthday: string | null
	death: string | null
	age: number | null
	birthPlace: BirthPlace[]
	deathPlace: DeathPlace[]
	spouses: Spouses
	countAwards: number | null
	profession: Profession[]
	facts: FactInPerson[]
	movies: MovieInPerson[]
}

export interface Studio {
	id: string | null
	subType: string | null
	title: string | null
	type: 'Производство' | 'Спецэффекты' | 'Прокат' | 'Студия дубляжа'
	movies: MovieFromStudio[]
}

export interface MovieFromStudio {
	id: number | null
}

export interface MovieFromKeyword {
	id: number | null
}

export type Keyword = {
	id: string | null
	title: string | null
	movies: MovieFromKeyword
}

export type Image = {
	movieId: number | null
	type: string | null
	language: string | null
	url: string | null
	previewUrl: string | null
	height: number | null
	width: number | null
}
