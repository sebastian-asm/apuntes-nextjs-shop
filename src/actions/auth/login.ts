'use server'
import { signIn } from '@/auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })
    return 'Success'
  } catch (error) {
    console.error(error)
    return 'CredentialsSignin'
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn('credentials', { email, password })
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
