import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	// adapter: PrismaAdapter()
	providers: [
		GithubProvider({ clientId: '123', clientSecret: '123' }),
		GoogleProvider({ clientId: '123', clientSecret: '123' }),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				return null
			},
		}),
	],
	debug: true,
	session: {
		strategy: 'jwt',
	},
	secret: 'PiVo',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
