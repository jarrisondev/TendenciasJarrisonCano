import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'

export interface IProcedureOrder {
  id?: number
  name: string
  price: number
  quantity: number
  requireAssistance: boolean
  order: number
}

export const useFetchProceduresOrders = () =>
  useQuery('procedureOrders', async () => {
    const res = await fetch(`${BASE_URL}/procedureOrders/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data: IProcedureOrder[] = await res.json()

    return data
  })

export const useCreateProcedureOrder = () =>
  useMutation(async (item: IProcedureOrder) => {
    const res = await fetch(`${BASE_URL}/procedureOrders/`, {
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

export const useUpdateProcedureOrder = () =>
  useMutation(async (item: IProcedureOrder) => {
    const res = await fetch(`${BASE_URL}/procedureOrders/${item.id}/`, {
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

export const useDeleteProcedureOrder = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/procedureOrders/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
