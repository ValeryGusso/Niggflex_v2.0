/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'kinopoiskapiunofficial.tech', 'www.themoviedb.org', '*'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		formats: ['image/avif', 'image/webp'],
	},
	eslint: {
		ignoreDuringBuilds: true, // Не забыть убрать после
	},
}

module.exports = nextConfig
