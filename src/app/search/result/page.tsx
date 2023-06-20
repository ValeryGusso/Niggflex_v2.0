import { FC } from 'react'
import cls from './page.module.css'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const SearchResult: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = async ({ searchParams }) => {
	// console.log('RESULT')
	// console.log('COMPONENT: ', new URLSearchParams(searchParams).toString())
	await new Promise(res => setTimeout(res, 2000))
	return <div>SEARCH: {searchParams.name}</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
	// await new Promise(res => setTimeout(res, 2000))
	const query = context.query
	console.log('PROPS: ', context)
	return { props: { query } }
}

export default SearchResult

// export async function getServerSideProps<>(params:type) {

// }
