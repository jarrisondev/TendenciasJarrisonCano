import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'

export interface IDiagnosticHelpOrder {
  id?: number
  name: string
  price: number
  quantity: number
  requireAssistance: boolean
  order: number
}
export const useFetchDiagnosticHelpsOrders = () =>
  useQuery('diagnosticsOrder', async () => {
    const res = await fetch(`${BASE_URL}/diagnosticsOrder/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data: IDiagnosticHelpOrder[] = await res.json()

    return data
  })

export const useCreateDiagnosticHelpOrder = () =>
  useMutation(async (item: IDiagnosticHelpOrder) => {
    const res = await fetch(`${BASE_URL}/diagnosticsOrder/`, {
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

export const useUpdateDiagnosticHelpOrder = () =>
  useMutation(async (item: IDiagnosticHelpOrder) => {
    const res = await fetch(`${BASE_URL}/diagnosticsOrder/${item.id}/`, {
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

export const useDeleteDiagnosticHelpOrder = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/diagnosticsOrder/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
