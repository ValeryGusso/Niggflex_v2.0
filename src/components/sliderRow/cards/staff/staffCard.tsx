import { FC } from 'react'
import cls from './staffCard.module.scss'
import { ProfessionKey, Staf } from '@/kinopoiskUnofficial/@types/staff'
import Link from 'next/link'
import { cut, printProfessin } from '@/utils/print'
import SafeImage from '@/components/UI/safeImage/safeImage'

interface StaffCardProps {
	person: Staf
}

const StaffCard: FC<StaffCardProps> = ({ person }) => {
	return (
		<div className={cls.card}>
			<div className={cls.card__title__container}>
				<Link href={'#' /* `name/${person.staffId}` */} className={cls.card__title}>
					{cut(person.nameRu || person.nameEn || 'Нет данных', 20)}
				</Link>
			</div>
			<div className={cls.card__imagebox}>
				<SafeImage src={person.posterUrl} alt={`photo ${person.nameEn}`} width={300} height={400} />
			</div>
			{person.professionKey !== ProfessionKey.Actor && (
				<p className={cls.card__role}>{printProfessin(person.professionText)}</p>
			)}
		</div>
	)
}

export default StaffCard
