import { FC } from 'react'
import cls from './result.module.scss'

interface SearchProps {
	params: {
		id: number
	}
	searchParams: Record<string, string>
}

const SearchResult: FC<SearchProps> = async ({ searchParams }) => {
	await new Promise(res => setTimeout(res, 2000))
	return <div className={cls.container}>SEARCH: {searchParams.name}</div>
}

export default SearchResult
