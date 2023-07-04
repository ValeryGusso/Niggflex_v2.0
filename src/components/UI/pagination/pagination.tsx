import { Dispatch, FC, SetStateAction } from 'react'
import cls from './pagination.module.scss'

interface PaginationProps {
	totalPages: number
	currentPage: number
	setPage: Dispatch<SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, setPage }) => {
	function renderButtons(count: number, amount: number) {
		return Array(amount)
			.fill(null)
			.map((_, i) => (
				<div
					key={count + i}
					onClick={() => setPage(count + i)}
					className={`${cls.button}${count + i === currentPage ? ' ' + cls.active : ''}`}
				>
					{count + i}
				</div>
			))
	}

	function renderPrevButton() {
		return (
			<div
				className={cls.button}
				onClick={() =>
					setPage(prev => {
						if (prev < 2) return prev
						return prev - 1
					})
				}
			>
				<p className="text-5xl -translate-y-1">&#171;</p>
			</div>
		)
	}
	function renderNextButton() {
		return (
			<div
				className={cls.button}
				onClick={() =>
					setPage(prev => {
						console.log(prev)
						if (prev > totalPages - 1) return prev
						return prev + 1
					})
				}
			>
				<p className="text-5xl -translate-y-1">&#187;</p>
			</div>
		)
	}

	function renderDots() {
		return <div className={cls.button}>...</div>
	}

	if (currentPage > 4 && currentPage < totalPages - 4) {
		return (
			<div className="flex gap-4">
				{renderPrevButton()}
				<div onClick={() => setPage(1)} className={`${cls.button}${currentPage === 1 ? ' ' + cls.active : ''}`}>
					1
				</div>
				{renderDots()}
				{renderButtons(currentPage - 2, 5)}
				{renderDots()}
				<div onClick={() => setPage(totalPages)} className={cls.button}>
					{totalPages}
				</div>
				{renderNextButton()}
			</div>
		)
	}

	if (currentPage < 7) {
		return (
			<div className="flex gap-4">
				{renderPrevButton()}
				{renderButtons(1, 7)}
				{renderDots()}
				<div onClick={() => setPage(totalPages)} className={cls.button}>
					{totalPages}
				</div>
				{renderNextButton()}
			</div>
		)
	}

	if (currentPage > totalPages - 5) {
		return (
			<div className="flex gap-4">
				{renderPrevButton()}
				<div onClick={() => setPage(1)} className={cls.button}>
					1
				</div>
				{renderDots()}
				{renderButtons(totalPages - 6, 7)}
				{renderNextButton()}
			</div>
		)
	}
}

export default Pagination
