'use client'
import { FC } from 'react'
import cls from './fact.module.scss'
import { FactInMovie } from '@/kinopoiskDev/autotypes'
import { getParsedFact } from '@/utils/get'
import Link from 'next/link'

interface FactProps {
	fact: FactInMovie
}

const Fact: FC<FactProps> = ({ fact }) => {
	console.log(fact.value)
	return (
		<div>
			<p>
				{getParsedFact(fact.value!).map(el =>
					el.href ? (
						<Link href="#" className="text-orange-400">
							{el.text}
						</Link>
					) : (
						<span dangerouslySetInnerHTML={{ __html: el.text }}></span>
					)
				)}
			</p>
		</div>
	)
}

export default Fact
