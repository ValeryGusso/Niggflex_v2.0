import { Awards } from './@types/awards'
import { Facts } from './@types/facts'
import { Images } from './@types/images'
import { ImageParams, Params, ReviewsParams, TopParams } from './@types/params'
import { Revievs } from './@types/reviews'
import { Staf } from './@types/staff'
import { Top } from './@types/top'
import { Similars } from './@types/similar'
import { SequelsAndPrequels } from './@types/sequelsAndPrequels'

type Response<T> = T extends null
	? {
			success: false
			error: string
			data: null
	  }
	: { success: true; error: null; data: T }

class KinopoiskUnofficial {
	private readonly domain = 'https://kinopoiskapiunofficial.tech/'
	private readonly token

	constructor(token: string) {
		this.token = token
	}

	private async request<T>(path: string, params?: Params) {
		/* GET QUERY PARAMS */
		let query: Record<string, string> | null = {}

		if (params) {
			for (const key in params) {
				if (params[key]) {
					query[key] = params[key]!.toString()
				}
			}
		} else {
			query = null
		}

		const queryString = query ? '?' + new URLSearchParams(query).toString() : ''

		/* REQUEST */
		const res = await fetch(this.domain + path + queryString, {
			method: 'GET',
			mode: 'no-cors',
			headers: { 'Content-Type': 'application/json', 'X-API-KEY': this.token },
			next: {
				revalidate: 86400,
			},
		})

		/* RESPONSE HANDLER */
		switch (res.status) {
			case 200:
				const data = await res.json()
				return { success: true, error: null, data } as T

			case 400:
				return { success: false, error: 'Невалидный запрос', data: null } as Response<null>

			case 401:
				return { success: false, error: 'Токен невалиден', data: null } as Response<null>

			case 402:
				return { success: false, error: 'Исчерпан дневной лимит запросов', data: null } as Response<null>

			case 404:
				return { success: false, error: 'Ничего не найдено', data: null } as Response<null>

			case 429:
				return { success: false, error: 'Превышен лимит, запрос заблокирован.', data: null } as Response<null>

			default:
				return { success: false, error: 'Упс, что-то пошло не так', data: null } as Response<null>
		}
	}

	async getStaffByMovieId(id: number) {
		const res = await this.request<Response<Staf[]>>('api/v1/staff?filmId=' + id)
		return res
	}

	async getFactsByMovieId(id: number) {
		const res = await this.request<Response<Facts[]>>(`api/v2.2/films/${id}/facts`)
		return res
	}

	async getAwardsByMovieId(id: number) {
		const res = await this.request<Response<Awards>>(`api/v2.2/films/${id}/awards`)
		return res
	}

	async getReviewsByMovieId(id: number, params?: ReviewsParams) {
		const res = await this.request<Response<Revievs>>(`api/v2.2/films/${id}/reviews`, params)
		return res
	}

	async getSequelsAndPrequelsByMovieId(id: number) {
		const res = await this.request<Response<SequelsAndPrequels[]>>(`api/v2.1/films/${id}/sequels_and_prequels`)
		return res
	}

	async getSimilarsByMovieId(id: number) {
		const res = await this.request<Response<Similars>>(`api/v2.2/films/${id}/similars`)
		return res
	}

	async getImagesByMovieId(id: number, params?: ImageParams) {
		const res = await this.request<Response<Images[]>>(`api/v2.2/films/${id}/images`, params)
		return res
	}

	async getTop(params?: TopParams) {
		const res = await this.request<Response<Top[]>>(`api/v2.2/films/top`, params)
		return res
	}
}

export default new KinopoiskUnofficial(process.env.KINOPOISKUNOFFICIAL_TOKEN!)
