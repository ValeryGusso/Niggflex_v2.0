export function getYoutybeVideoSrc(src: string) {
	const result = src.match(/(\w|\d)+$/i)
	return result ? 'https://www.youtube.com/embed/' + result[0] : ''
}
