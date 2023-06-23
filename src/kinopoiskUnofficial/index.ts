import { Awards } from './@types/awards'
import { Facts } from './@types/facts'
import { ShortStaf } from './@types/staff'

type Response<T> = {
	success: boolean
	error: string | null
	data: T | null
}

export class KinopoiskUnofficial {
	private readonly domen = 'https://kinopoiskapiunofficial.tech/'
	private readonly token

	constructor(token: string) {
		this.token = token
	}

	private async request<T>(path: string) {
		const res = await fetch(this.domen + path, {
			method: 'GET',
			mode: 'no-cors',
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
		const res = await this.request<Response<ShortStaf[]>>('api/v1/staff?filmId=' + id)
		return res
	}

	async getFactsByMovieId(id: number) {
		const res = await this.request<Response<Facts[]>>(`v2.2/films/${id}/facts`)
		return res
	}

	async getAwardsByMovieId(id: number) {
		const res = await this.request<Response<Awards[]>>(`v2.2/films/${id}/awards`)
		return res
	}
}
