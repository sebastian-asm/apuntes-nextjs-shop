import { redirect } from 'next/navigation'

import { Title } from '@/components'
import { getPaginatedUsers } from '@/actions'
import UsersTable from './ui/UsersTable'

export default async function AdminUsersPage() {
  const users = await getPaginatedUsers()
  if (!users) redirect('/auth/login')

  return (
    <>
      <div className="mb-10 mx-5">
        <Title title="Listado de usuarios" />
        <UsersTable users={users} />
      </div>
    </>
  )
}
