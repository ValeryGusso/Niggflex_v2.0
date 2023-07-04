'use client'
import { FC, useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cls from './awards.module.scss'
import { Award } from '@/kinopoiskUnofficial/@types/awards'
import SafeImage from '@/components/UI/safeImage/safeImage'
import Select, { IOption } from '@/components/UI/select/select'
import defaultAward from '@/assets/img/default_award.png'

interface AwardsProps {
	awards: Award[]
	logo?: string | null
}

interface AwardsList {
	name: string
	year: number
	image: string | null
	items: Award[]
}

function awardsParser(awards: Award[]) {
	const list = new Map<string, AwardsList>()

	const renderList: AwardsList[] = []
	const optionsAwards: IOption[] = []

	const optionsCategories: IOption[][] = []

	awards.forEach(award => {
		if (list.has(award.name)) {
			list.get(award.name)?.items.push(award)
		} else {
			list.set(award.name, { name: award.name, year: award.year, image: award.imageUrl, items: [award] })
		}
	})

	list.forEach(item => {
		renderList.push(item)
	})

	renderList.forEach((award, i) => {
		optionsAwards.push({ id: i, title: award.name, value: i })
		optionsCategories.push(award.items.map((item, k) => ({ id: k, title: item.nominationName, value: k })))
	})

	return { optionsAwards, optionsCategories, award: renderList }
}

const Awards: FC<AwardsProps> = ({ awards, logo }) => {
	const [activeAward, setActiveAward] = useState(0)
	const [activeCategory, setActiveCategory] = useState(0)

	const changeAward = useCallback(
		(i: number) => {
			setActiveAward(i)
			setActiveCategory(0)
		},
		[awards]
	)

	const changeCategory = useCallback(
		(i: number) => {
			setActiveCategory(i)
		},
		[awards]
	)

	const { optionsAwards, optionsCategories, award } = useMemo(() => awardsParser(awards), [awards])

	return (
		<div className={cls.container}>
			<div className={cls.award}>
				<Select options={optionsAwards} selected={activeAward} onChange={changeAward} />
				<h3 className={cls.award__name}>{award[activeAward].name}</h3>
				<h1 className={cls.award__year}>{award[activeAward].year} г.</h1>
				<div className={cls.award__image}>
					<SafeImage
						src={award[activeAward].image}
						errorImage={defaultAward}
						alt={award[activeAward].name || 'award'}
						width={400}
						height={600}
						className="object-scale-down"
						draggable={false}
					/>
				</div>
			</div>
			<div className={cls.category}>
				<Select
					options={optionsCategories[activeAward]}
					selected={activeCategory}
					onChange={changeCategory}
					width={350}
				/>
				<div className={cls.category__container}>
					{award[activeAward].items[activeCategory].persons.length ? (
						<>
							{award[activeAward].items[activeCategory].persons?.map(person => (
								<div className={cls.category__item} key={person.kinopoiskId}>
									<div>
										<SafeImage
											src={person.posterUrl}
											alt={person.nameEn || 'photo'}
											width={90}
											height={120}
											className="rounded-md"
											draggable={false}
										/>
									</div>
									<div className={cls.person}>
										<Link href="#" className={cls.person__title}>
											{person.nameRu || person.nameEn}
										</Link>
										<h4 className={cls.person__prof}>{person.profession}</h4>
										<p>{`${award[activeAward].items[activeCategory].win ? 'Победитель' : 'Номинант'} (${
											award[activeAward].items[activeCategory].year
										}) в категории "${award[activeAward].items[
											activeCategory
										].nominationName.toLocaleLowerCase()}"`}</p>
									</div>
								</div>
							))}
						</>
					) : (
						<div className={cls.category__item + ' flex-col items-center'}>
							<p>{`${award[activeAward].items[activeCategory].win ? 'Победитель' : 'Номинант'} (${
								award[activeAward].items[activeCategory].year
							}) в категории "${award[activeAward].items[activeCategory].nominationName.toLocaleLowerCase()}"`}</p>
							{logo && <Image src={logo} alt="logo" width={400} height={100} />}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Awards
