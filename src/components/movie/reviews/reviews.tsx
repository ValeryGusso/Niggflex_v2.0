'use client'
import { FC, useCallback, useMemo, useState } from 'react'
import cls from './reviews.module.scss'
import { Revievs } from '@/kinopoiskUnofficial/@types/reviews'
import Select, { IOption } from '@/components/UI/select/select'
import Review from './review/review'

interface RevievsProps {
	data: Revievs
}

enum ReviewType {
	ALL = 'ALL',
	POSITIVE = 'POSITIVE',
	NEGATIVE = 'NEGATIVE',
	NEUTRAL = 'NEUTRAL',
}

enum SortOrder {
	DATE_DESC = 'DATE_DESC',
	DATE_ASC = 'DATE_ASC',
	USER_POSITIVE_RATING_DESC = 'USER_POSITIVE_RATING_DESC',
	USER_POSITIVE_RATING_ASC = 'USER_POSITIVE_RATING_ASC',
	USER_NEGATIVE_RATING_DESC = 'USER_NEGATIVE_RATING_DESC',
	USER_NEGATIVE_RATING_ASC = 'USER_NEGATIVE_RATING_ASC',
}

// const sortTypes = ['', ReviewType.positive, ReviewType.negative, ReviewType.neutral]
const sortOptions = [
	{ id: 0, title: 'По дате ▼', value: 0 },
	{ id: 1, title: 'По дате ▲', value: 0 },
	{ id: 2, title: 'По лайкам ▼', value: 0 },
	{ id: 3, title: 'По лайкам ▲', value: 0 },
	{ id: 4, title: 'По дизлайкам ▼', value: 0 },
	{ id: 5, title: 'По дизлайкам ▲', value: 0 },
]

const Reviews: FC<RevievsProps> = ({ data }) => {
	const [reviews, setReviews] = useState([...data.items])

	const [type, setType] = useState(0)
	const [category, setCategory] = useState(0)

	const options = useMemo<IOption[]>(() => {
		const items = [{ id: 0, title: 'Все', value: 0 }]
		if (data.totalPositiveReviews) {
			items.push({ id: 1, title: 'Позитивные', value: 1 })
		}
		if (data.totalNegativeReviews) {
			items.push({ id: 2, title: 'Негативные', value: 2 })
		}
		if (data.totalNeutralReviews) {
			items.push({ id: 3, title: 'Нейтральные', value: 3 })
		}
		return items
	}, [])

	const changeType = useCallback((i: number) => {
		setType(i)
	}, [])

	const changeCategory = useCallback((i: number) => {
		setCategory(i)
	}, [])

	return (
		<div className={cls.container}>
			<div className="flex">
				<h1></h1>
				<Select options={options} selected={type} onChange={changeType} />
				<Select options={sortOptions} selected={category} onChange={changeCategory} />
			</div>
			<div className="flex flex-col gap-4 px-12 max-h-[50vh] overflow-auto">
				{reviews.map(reviev => (
					<Review review={reviev} key={reviev.kinopoiskId} />
				))}
			</div>
		</div>
	)
}

export default Reviews
