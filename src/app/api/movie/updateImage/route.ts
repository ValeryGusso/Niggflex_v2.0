import { NextResponse } from 'next/server'
// import kinopoiskDev from '@/kinopoiskDev'
import kinopoiskDev from '@/kp'

export async function POST(res: Request) {
	const body = await res.json()

	// const images = await kinopoiskDev.getImagesByMovieId(body.id, body.page)
	const images = await kinopoiskDev.image.getByFilters({ movieId: body.id, page: body.page, limit: '30' })

	if (images.data?.docs.length) {
		return NextResponse.json({ images: images.data?.docs })
	}
	return NextResponse.json({ images: [] })
}
