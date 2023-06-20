// import Head from 'next/head'
import './main.scss'
import { Ubuntu } from 'next/font/google'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Leftbar from '@/components/UI/leftbar/leftbar'
import { KinopoiskDev } from '@/kinopoisk'

const ubuntu = Ubuntu({
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	weight: ['300', '400', '500', '700', '300', '400', '500', '700'],
})

export const metadata = {
	title: 'Niggflex',
	description: 'All what you love, but a little darker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body className={ubuntu.className}>
				<header>
					<Header />
				</header>
				<main>
					<Leftbar />
					{children}
				</main>
				<footer>
					<Footer />
				</footer>
			</body>
		</html>
	)
}
