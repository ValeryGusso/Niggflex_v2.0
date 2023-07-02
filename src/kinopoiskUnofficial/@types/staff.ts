export interface Staf {
	staffId: number
	nameRu: string | null
	nameEn: string | null
	description: null | string
	posterUrl: string
	professionText: ProfessionText
	professionKey: ProfessionKey
}

export enum ProfessionKey {
	Actor = 'ACTOR',
	Composer = 'COMPOSER',
	Design = 'DESIGN',
	Director = 'DIRECTOR',
	Editor = 'EDITOR',
	Operator = 'OPERATOR',
	Producer = 'PRODUCER',
	Translator = 'TRANSLATOR',
	VoiceDirector = 'VOICE_DIRECTOR',
	Writer = 'WRITER',
}

export enum ProfessionText {
	Actor = 'Актеры',
	Composer = 'Композиторы',
	Editor = 'Монтажеры',
	Operator = 'Операторы',
	Translator = 'Переводчики',
	Producer = 'Продюсеры',
	Director = 'Режиссеры',
	VoiceDirector = 'Режиссеры дубляжа',
	Writer = 'Сценаристы',
	Design = 'Художники',
}
