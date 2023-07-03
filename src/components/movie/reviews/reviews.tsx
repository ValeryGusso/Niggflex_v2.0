'use client'
import { FC, useCallback, useState } from 'react'
import cls from './reviews.module.scss'
import { Revievs, ReviewType } from '@/kinopoiskUnofficial/@types/reviews'
import Select, { IOption } from '@/components/UI/select/select'

interface RevievsProps {
	data: Revievs
}

// enum ReviewType {
// 	ALL = 'all',
// 	POSITIVE = 'positive',
// 	NEGATIVE = 'negative',
// 	NEUTRAL = 'neutral',
// }

const sortTypes = ['', ReviewType.positive, ReviewType.negative, ReviewType.neutral]

const Reviews: FC<RevievsProps> = ({ data }) => {
	const [reviews, setReviews] = useState([...data.items])
	const [type, setType] = useState(0)
	const options: IOption[] = [{ id: 0, title: 'Все', value: 0 }]

	console.log()

	if (data.totalPositiveReviews) {
		options.push({ id: 1, title: 'Позитивные', value: 1 })
	}
	if (data.totalNegativeReviews) {
		options.push({ id: 2, title: 'Негативные', value: 2 })
	}
	if (data.totalNeutralReviews) {
		options.push({ id: 3, title: 'Нейтральные', value: 3 })
	}

	const onChange = useCallback((i: number) => {
		setType(i)
	}, [])

	return (
		<div className={cls.container}>
			<div>
				<h1></h1>
				<Select options={options} selected={type} onChange={onChange} />
			</div>
		</div>
	)
}

export default Reviews
