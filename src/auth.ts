import { compareSync } from 'bcrypt'
import { object, string } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

import prisma from './lib/prisma'

// Handlers es el manejador para los GET y POST
export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.data = user
      return token
    },
    session({ session, token }) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = object({ email: string().email(), password: string().min(6) }).safeParse(credentials)
        if (!parsedCredentials.success) return null
        const { email, password } = parsedCredentials.data
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        if (!compareSync(password, user.password)) return null
        // Sacando el password de la respuesta
        const { password: _, ...rest } = user
        return rest
      }
    })
  ]
})
