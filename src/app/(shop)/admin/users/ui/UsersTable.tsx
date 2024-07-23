'use client'
import { changeUserRole } from '@/actions'
import type { User } from '@/interfaces'

interface Props {
  users: User[]
}

export default function UsersTable({ users }: Props) {
  return (
    <table className="min-w-full overflow">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Nombre
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Email
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">{user.name}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <select
                onChange={({ target }) => changeUserRole(user.id, target.value as 'admin' | 'user')}
                value={user.role}
                className="text-sm text-gray-900 w-full p-2"
              >
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}