import { BASE_URL } from '@/lib/constants'
import { Roles } from '@/store/useUserStore'
import { useMutation, useQuery } from 'react-query'

export interface IEmployee {
  id?: number
  name: string
  username: string
  password: string
  email: string
  phone: string
  birthDate: Date
  address: string
  role: Roles
}

export const useFetchEmployees = () =>
  useQuery('employee', async () => {
    const res = await fetch(`${BASE_URL}/employees/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const employee: IEmployee[] = await res.json()

    return employee
  })

export const useCreateEmployee = () =>
  useMutation(async (item: IEmployee) => {
    const res = await fetch(`${BASE_URL}/employees/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useUpdateEmployee = () =>
  useMutation(async (item: IEmployee) => {
    const res = await fetch(`${BASE_URL}/employees/${item.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useDeleteEmployee = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/employees/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
