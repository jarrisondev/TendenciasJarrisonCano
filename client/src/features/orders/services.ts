import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'
import { IMedicineOrder } from '../medicinesOrder/services'
import { IProcedureOrder } from '../proceduresOrder/services'

export interface IOrder {
  id?: number
  patient: number
  doctor: number
  createdAt: Date
  medicineOrder: IMedicineOrder[]
  procedureOrder: IProcedureOrder[]
  diagnosticHelpOrder: DiagnosticHelpOrder[]
}

export interface DiagnosticHelpOrder {
  id: number
  name: string
  price: number
  quantity: number
  requireAssistance: boolean
  order: number
}

export const useFetchOrders = () =>
  useQuery('order', async () => {
    const res = await fetch(`${BASE_URL}/orders/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const order: IOrder[] = await res.json()

    return order
  })

export const useCreateOrder = () =>
  useMutation(async (item: IOrder) => {
    const res = await fetch(`${BASE_URL}/orders/`, {
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

export const useUpdateOrder = () =>
  useMutation(async (item: IOrder) => {
    const res = await fetch(`${BASE_URL}/orders/${item.id}/`, {
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

export const useDeleteOrder = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/orders/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
