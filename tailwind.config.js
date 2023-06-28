/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const scrollbar = require('tailwind-scrollbar')

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			rotate: {
				270: '270deg',
			},
			scale: {
				'-100': '-1',
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			addComponents({
				'.color-active': {
					color: theme('colors.sky.300'),
					fill: theme('colors.sky.300'),
					stroke: theme('colors.sky.300'),
				},
				'.color-dark': {
					color: theme('colors.neutral.800'),
					fill: theme('colors.neutral.800'),
					stroke: theme('colors.neutral.800'),
				},
				'.color-light': {
					color: theme('colors.slate.200'),
					fill: theme('colors.slate.200'),
					stroke: theme('colors.slate.200'),
				},
				'.color-error': {
					color: theme('colors.rose.500'),
					fill: theme('colors.rose.500'),
					stroke: theme('colors.rose.500'),
				},
			})
		}),
		scrollbar({ nocompatible: true }),
	],
}
