'use client'
import { FC } from 'react'
import cls from './awards.module.scss'
import { Award } from '@/kinopoiskUnofficial/@types/awards'
import SafeImage from '@/components/UI/safeImage/safeImage'
import defaultAward from '@/assets/img/default_award.png'

interface AwardsProps {
	awards: Award[]
}

interface AwardsList {
	name: string
	image: string | null
	items: Award[]
}

const Awards: FC<AwardsProps> = ({ awards }) => {
	const renderList: AwardsList[] = []
	const list = new Map<string, AwardsList>()

	awards.forEach(award => {
		if (list.has(award.name)) {
			list.get(award.name)?.items.push(award)
		} else {
			list.set(award.name, { name: award.name, image: award.imageUrl, items: [award] })
		}
	})

	list.forEach(el => {
		renderList.push(el)
	})

	return (
		<div className={cls.container}>
			{renderList.map(award => (
				<div className="flex flex-col justify-center items-center border-2">
					<p key={award.name}>{award.name}</p>
					<div className="w-fit h-36 flex">
						<SafeImage
							src={award.image}
							errorImage={defaultAward}
							alt={award.name}
							width={200}
							height={300}
							className="object-scale-down"
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default Awards
