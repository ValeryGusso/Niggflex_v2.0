import { FC } from 'react'
import cls from './page.module.css'

interface SearchProps {
	params: {
		id: number
	}
	searchParams: Record<string, string>
}

const SearchResult: FC<SearchProps> = async ({ searchParams }) => {
	await new Promise(res => setTimeout(res, 2000))
	return <div>SEARCH: {searchParams.name}</div>
}

export default SearchResult
