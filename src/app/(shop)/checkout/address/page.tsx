import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getCountries, getUserAddress } from '@/actions'
import { Title } from '@/components'
import AddressForm from './ui/AddressForm'

export default async function AddressPage() {
  const countries = await getCountries()
  const session = await auth()

  if (!session?.user) redirect('/auth/login')
  const userStoredAddress = (await getUserAddress(session.user.id)) ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-10 px-5 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoredAddress={userStoredAddress} />
      </div>
    </div>
  )
}
