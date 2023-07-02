import { NextResponse } from 'next/server'
import kinopoiskDev from '@/kinopoiskDev'

export async function POST(res: Request) {
	const body = await res.json()

	const images = await kinopoiskDev.getImagesByMovieId(body.id, body.page)

	if (images.data?.docs.length) {
		return NextResponse.json({ images: images.data?.docs })
	}
	return NextResponse.json({ images: [] })
}
