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
