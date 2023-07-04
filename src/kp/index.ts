import { KinopoiskDev } from '@openmoviedb/kinopoiskdev_client'
/* MovieQueryBuilder, SPECIAL_VALUE, SORT_TYPE, Filter  */

export default new KinopoiskDev(process.env.KINOPOISKDEV_TOKEN!)

// const getRelatedByQueryBuilderMovies = () => {
// 	const queryBuilder = new MovieQueryBuilder()

// 	const query = queryBuilder
// 		.select(['id', 'name', 'rating', 'poster', 'year'])
// 		.filterRange('year', [2020, 2023])
// 		.filterRange('rating.kp', [7.5, 10])
// 		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
// 		.sort('rating.kp', SORT_TYPE.DESC)
// 		.paginate(1, 30)
// 		.build()

// 	// const a: Record<string, string> = {}

// 	// for (const key in query) {
// 	// 	a[key] = query[key!] as string
// 	// 	// console.log(key, query[key as keyof query].toString())
// 	// }
// 	// @ts-ignore
// 	console.log(new URLSearchParams(query).toString())
// }

// getRelatedByQueryBuilderMovies()

// class kpd {
// 	private readonly domain = 'https://api.kinopoisk.dev/'
// 	private readonly token
// 	private readonly queryBuilder

// 	constructor(token: string) {
// 		this.token = token
// 		this.queryBuilder = new MovieQueryBuilder()
// 	}
// 	private async request<T>(path: string, query?: string) {
// 		/* REQUEST */
// 		const res = await fetch(this.domain + path + (query ? '?' + query : ''), {
// 			method: 'GET',
// 			mode: 'no-cors',
// 			headers: { 'Content-Type': 'application/json', 'X-API-KEY': this.token },
// 			next: {
// 				revalidate: 86400,
// 			},
// 		})
// 	}

//   private generateQuery() {
//     this.queryBuilder
// 		.select(['id', 'name', 'rating', 'poster', 'year'])
// 		.filterRange('year', [2020, 2023])
// 		.filterRange('rating.kp', [7.5, 10])
// 		.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
// 		.sort('rating.kp', SORT_TYPE.DESC)
// 		.paginate(1, 30)
// 		.build()
//   }
// }
