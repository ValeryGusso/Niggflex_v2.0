export function getYoutubeVideoSrc(src: string) {
	const result = src.match(/(\w|\d)+$/i)
	return result ? 'https://www.youtube.com/embed/' + result[0] : ''
}

export interface IFact {
	text: string
	href: string
}

type Match = { startIndex: number; endIndex: number }

export function getParsedFact(str: string) {
	const matches: Match[] = []

	for (let i = 0; i < str.length; i++) {
		if (str[i] === '<' && str[i + 1] === 'a') {
			matches.push({ startIndex: i, endIndex: i })
		}

		if (str[i] === '<' && str[i + 1] === '/' && str[i + 2] === 'a' && str[i + 3] === '>') {
			matches[matches.length - 1].endIndex = i + 3
		}
	}

	if (!matches.length) {
		return [{ text: str, href: '' }]
	}

	const result: IFact[] = []
	let curIndex = 0

	matches.forEach(match => {
		result.push(
			{ text: str.slice(curIndex, match.startIndex), href: '' },
			{
				text: str.slice(match.startIndex, match.endIndex + 1).replace(/\<\/?a[\W\w]*?\>/g, ''),
				href: str
					.slice(match.startIndex, match.endIndex)
					.match(/"[\w\W]+?"/)![0]
					.replaceAll('"', ''),
			}
		)
		curIndex = match.endIndex + 1
	})

	if (str.length - 1 !== matches[matches.length - 1].endIndex && result[result.length - 1].href) {
		result.push({ text: str.slice(matches[matches.length - 1].endIndex + 1, str.length - 1), href: '' })
	}

	return result
}
