'use client'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import cls from './reviews.module.scss'
import { Revievs } from '@/kinopoiskUnofficial/@types/reviews'
import Select, { IOption } from '@/components/UI/select/select'
import Review from './review/review'
import Pagination from '@/components/UI/pagination/pagination'

enum ReviewType {
	ALL = '!null',
	POSITIVE = 'Позитивный',
	NEGATIVE = 'Негативный',
	NEUTRAL = 'Нейтральный',
}

enum SortOrder {
	DATE_DESC = 'DATE_DESC',
	DATE_ASC = 'DATE_ASC',
	USER_POSITIVE_RATING_DESC = 'USER_POSITIVE_RATING_DESC',
	USER_POSITIVE_RATING_ASC = 'USER_POSITIVE_RATING_ASC',
	USER_NEGATIVE_RATING_DESC = 'USER_NEGATIVE_RATING_DESC',
	USER_NEGATIVE_RATING_ASC = 'USER_NEGATIVE_RATING_ASC',
}

const sortCategories = [
	'DATE_DESC',
	'DATE_ASC',
	'USER_POSITIVE_RATING_DESC',
	'USER_POSITIVE_RATING_ASC',
	'USER_NEGATIVE_RATING_DESC',
	'USER_NEGATIVE_RATING_ASC',
]

// const sortTypes = ['', ReviewType.positive, ReviewType.negative, ReviewType.neutral]
const sortOptions = [
	{ id: 0, title: 'По дате ▼', value: 0 },
	{ id: 1, title: 'По дате ▲', value: 1 },
	{ id: 2, title: 'По лайкам ▼', value: 2 },
	{ id: 3, title: 'По лайкам ▲', value: 3 },
	{ id: 4, title: 'По дизлайкам ▼', value: 4 },
	{ id: 5, title: 'По дизлайкам ▲', value: 5 },
]

interface RevievsProps {
	data: Revievs
}

const Reviews: FC<RevievsProps> = ({ data }) => {
	const [reviews, setReviews] = useState([...data.items])
	const [page, setPage] = useState(1)

	const [type, setType] = useState(0)
	const [category, setCategory] = useState(0)

	const options = useMemo<IOption[]>(() => {
		const items = [{ id: 0, title: `Все (${data.total})`, value: 0 }]
		if (data.totalPositiveReviews) {
			items.push({ id: 1, title: `Позитивные (${data.totalPositiveReviews})`, value: 1 })
		}
		if (data.totalNegativeReviews) {
			items.push({ id: 2, title: `Негативные (${data.totalNegativeReviews})`, value: 2 })
		}
		if (data.totalNeutralReviews) {
			items.push({ id: 3, title: `Нейтральные (${data.totalNeutralReviews})`, value: 3 })
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
			<div className="flex gap-12">
				<h1>Всего найдено {data.total}</h1>
				<Select options={options} selected={type} onChange={changeType} />
				<Select options={sortOptions} selected={category} onChange={changeCategory} />
			</div>
			<div className="flex flex-col gap-4 px-12 max-h-[50vh] overflow-auto">
				{reviews.map(reviev => (
					<Review review={reviev} key={reviev.kinopoiskId} />
				))}
			</div>
			<Pagination
				currentPage={page}
				totalPages={Math.ceil(data.total / 20)}
				setPage={i => {
					setPage(i)
				}}
			/>
		</div>
	)
}

export default Reviews
