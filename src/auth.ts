import { object, string } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const { auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = object({ email: string().email(), password: string().min(6) }).safeParse(credentials)
        if (!parsedCredentials.success) return null
        const { email, password } = parsedCredentials.data
        console.log({ email, password })
        return null
      }
    })
  ]
})
