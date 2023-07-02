import { IoMdHome } from 'react-icons/io'
import { BsSearch, BsBookmarkHeartFill } from 'react-icons/bs'
import { BiCategoryAlt } from 'react-icons/bi'
import { IconType } from 'react-icons'

export interface MenuListItem {
	title: string
	path: string
	icon: IconType
	children: null | MenuListItem[]
}

export const menuList: MenuListItem[] = [
	{ title: 'Главная', path: '/', icon: IoMdHome, children: null },
	{ title: 'Поиск', path: '/search', icon: BsSearch, children: null },
	{
		title: 'Категории',
		path: '#',
		icon: BiCategoryAlt,
		children: [
			{ title: 'Премьеры', path: '#', icon: IoMdHome, children: null },
			{ title: 'Фильмы', path: '#', icon: BsSearch, children: null },
			{ title: 'Сериалы', path: '#', icon: BiCategoryAlt, children: null },
			{ title: 'Мультфильмы', path: '#', icon: BsBookmarkHeartFill, children: null },
			{ title: 'Мульсериалы', path: '#', icon: BsBookmarkHeartFill, children: null },
			{ title: 'Аниме', path: '#', icon: BsBookmarkHeartFill, children: null },
			{ title: 'Чётаещё', path: '#', icon: BsBookmarkHeartFill, children: null },
		],
	},
	{ title: 'Избранное', path: '/favorites', icon: BsBookmarkHeartFill, children: null },
]

export const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]
