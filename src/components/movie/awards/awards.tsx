'use client'
import { FC, Fragment, useState } from 'react'
import cls from './awards.module.scss'
import { Award } from '@/kinopoiskUnofficial/@types/awards'
import SafeImage from '@/components/UI/safeImage/safeImage'
import defaultAward from '@/assets/img/default_award.png'
import Select, { IOption } from '@/components/UI/select/select'
import Link from 'next/link'

interface AwardsProps {
	awards: Award[]
}

interface AwardsList {
	name: string
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
			list.set(award.name, { name: award.name, image: award.imageUrl, items: [award] })
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

const Awards: FC<AwardsProps> = ({ awards }) => {
	const [activeAward, setActiveAward] = useState(0)
	const [activeCategory, setActiveCategory] = useState(0)

	const { optionsAwards, optionsCategories, award } = awardsParser(awards)

	function changeAward(i: number) {
		setActiveAward(i)
		setActiveCategory(0)
	}

	return (
		<div className={cls.container}>
			<div className="w-72 h-full flex flex-col gap-4">
				<Select options={optionsAwards} selected={activeAward} onChange={changeAward} />
				<div className="w-fit h-72 flex">
					<SafeImage
						src={award[activeAward].image}
						errorImage={defaultAward}
						alt={award[activeAward].name || 'award'}
						width={400}
						height={600}
						className="object-scale-down"
					/>
				</div>
			</div>
			<div className="h-full flex flex-col flex-1 justify-start gap-12">
				<Select
					options={optionsCategories[activeAward]}
					selected={activeCategory}
					onChange={setActiveCategory}
					width={350}
				/>
				<div className="w-fit flex flex-col gap-4 overflow-auto">
					{award[activeAward].items[activeCategory].persons?.map(person => (
						<div className="flex gap-2 py-4 px-6 bg-neutral-900/25 rounded-md" key={person.kinopoiskId}>
							<div>
								<SafeImage
									src={person.posterUrl}
									alt={person.nameEn || 'photo'}
									width={90}
									height={120}
									className="rounded-md"
								/>
							</div>
							<div>
								<Link href="#" className="text-2xl">
									{person.nameRu || person.nameEn}
								</Link>
								<h4 className="text-xl">{person.profession}</h4>
								<p>{`${award[activeAward].items[activeCategory].win ? 'Победитель' : 'Номинант'} (${
									award[activeAward].items[activeCategory].year
								}) в категории "${award[activeAward].items[activeCategory].nominationName.toLocaleLowerCase()}"`}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Awards
