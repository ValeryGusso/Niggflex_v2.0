/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'kinopoiskapiunofficial.tech', 'www.themoviedb.org', '*'],
	},
	eslint: {
		ignoreDuringBuilds: true, // Не забыть убрать после
	},
}

module.exports = nextConfig
