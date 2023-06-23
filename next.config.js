/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'kinopoiskapiunofficial.tech'],
	},
}

module.exports = nextConfig
