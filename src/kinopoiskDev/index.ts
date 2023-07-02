import { Image } from './@types/images'
import { FullMovie, ShortMovie } from './autotypes'
import {
	IKinopoiskDevParams,
	IKinopoiskDevParamsValues,
	IKinopoiskDevSearchParams,
	KinopoiskDevParamsValues,
} from './params'

type Response<T> = {
	success: boolean
	error: string | null
	data: T | null
}

type MultiResponse<T> = {
	success: boolean
	error: string | null
	data: {
		docs: T
		total: number
		limit: number
		page: number
		pages: number
	}
}

class KinopoiskDev {
	private readonly domain = 'https://api.kinopoisk.dev/'
	private readonly token

	constructor(token: string) {
		this.token = token
	}

	private async request<T>(path: string, params?: IKinopoiskDevParams) {
		const urlSearchParams: IKinopoiskDevSearchParams = {}

		if (params) {
			for (const key in KinopoiskDevParamsValues) {
				if (params[key as keyof IKinopoiskDevParamsValues]) {
					urlSearchParams[KinopoiskDevParamsValues[key as keyof IKinopoiskDevParamsValues]!] =
						params[key as keyof IKinopoiskDevParamsValues]?.toString()
					// Array.isArray(
					// 	params[key as keyof IKinopoiskDevParamsValues]
					// )
					// 	? `[${params[key as keyof IKinopoiskDevParamsValues]?.toString()}]`
					// 	: params[key as keyof IKinopoiskDevParamsValues]?.toString()
				}
			}
		}

		let query = new URLSearchParams(urlSearchParams).toString()

		if (query) {
			query = '?' + query
		}

		const res = await fetch(this.domain + path + query, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'X-API-KEY': this.token },
			next: {
				revalidate: 86400,
			},
		})

		switch (res.status) {
			case 200:
				const data = await res.json()
				return { success: true, error: null, data } as T

			case 400:
				return { success: false, error: 'Невалидный запрос', data: null } as Response<null>

			case 401:
				return { success: false, error: 'Токен невалиден', data: null } as Response<null>

			case 403:
				return { success: false, error: 'Исчерпан дневной лимит запросов', data: null } as Response<null>

			default:
				return { success: false, error: 'Упс, что-то пошло не так', data: null } as Response<null>
		}
	}

	async getRandom() {
		const res = await this.request<Response<FullMovie>>('v1.3/movie/random')
		return res
	}

	async getMovieById(id: number) {
		const res = await this.request<Response<FullMovie>>('v1.3/movie/' + id)
		return res
	}

	async getMovie(params: IKinopoiskDevParams) {
		const res = await this.request<MultiResponse<ShortMovie[]>>('v1.3/movie', params)
		return res
	}

	async getMovieBySearch(search: string, params?: { page: number; limit: number }) {
		let options: { search: string; page?: string; limit?: string } = { search }
		if (params?.page) {
			options.page = params.page.toString()
		}
		if (params?.limit) {
			options.limit = params.limit.toString()
		}

		const query = new URLSearchParams(options).toString()

		const res = await this.request<MultiResponse<ShortMovie[]>>('v1.2/movie/search?' + query)
		return res
	}

	async getImagesByMovieId(id: number, page: number = 1) {
		const res = await this.request<MultiResponse<Image[]>>(`v1/image?movieId=${id}&limit=30&page=${page}`)
		return res
	}
}

export default new KinopoiskDev(process.env.KINOPOISKDEV_TOKEN!)
