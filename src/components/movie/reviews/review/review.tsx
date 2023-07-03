import { FC } from 'react'
import cls from './review.module.scss'
import { Review } from '@/kinopoiskUnofficial/@types/reviews'
import { cut } from '@/utils/print'

interface ReviewPropw {
	review: Review
}

const Review: FC<ReviewPropw> = ({ review }) => {
	return (
		<div className={cls.container}>
			<h2>{review.title}</h2>
			<p>{cut(review.description, 500)}</p>
		</div>
	)
}

export default Review
