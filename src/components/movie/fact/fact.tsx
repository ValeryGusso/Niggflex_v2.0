'use client'
import { FC, MouseEvent } from 'react'
import cls from './fact.module.scss'
import { FactInMovie } from '@/kinopoiskDev/autotypes'
import { getParsedFact } from '@/utils/get'
import Link from 'next/link'
import { useToggle } from '@/hooks/useToggle'

interface FactProps {
	fact: FactInMovie
}

const Fact: FC<FactProps> = ({ fact }) => {
	const [show, showToggle] = useToggle(false)

	function click(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
		showToggle(true)
	}

	function renderFact() {
		return (
			<p>
				{getParsedFact(fact.value!).map(el =>
					el.href ? (
						<Link href={el.href} className={cls.link}>
							{el.text}
						</Link>
					) : (
						<span dangerouslySetInnerHTML={{ __html: el.text }} className={cls.text}></span>
					)
				)}
			</p>
		)
	}

	if (!fact.spoiler) {
		return renderFact()
	}

	return (
		<div className={cls.container} onClick={click}>
			{show ? (
				renderFact()
			) : (
				<>
					<p className={`${cls.placeholder}${show ? '' : ' ' + cls.blur}`}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti consequuntur at aut itaque repellat hic ex
						placeat culpa, nihil reiciendis neque veritatis blanditiis molestiae iusto adipisci illo animi magnam
						laboriosam porro officiis, optio in? Commodi ipsum eos iste voluptatem, dignissimos eligendi magnam. At
						temporibus libero architecto molestias accusamus quos ipsam.
					</p>
					<p className={cls.spoiler}>SPOILER</p>
				</>
			)}
		</div>
	)
}

export default Fact
