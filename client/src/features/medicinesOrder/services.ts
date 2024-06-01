import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'

export interface IMedicineOrder {
  id?: number
  quantity: number
  order: number
  medicine: number
}

export const useFetchMedicinesOrders = () =>
  useQuery('medicinesOrders', async () => {
    const res = await fetch(`${BASE_URL}/medicinesOrders/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data: IMedicineOrder[] = await res.json()

    return data
  })

export const useCreateMedicineOrder = () =>
  useMutation(async (item: IMedicineOrder) => {
    const res = await fetch(`${BASE_URL}/medicinesOrders/`, {
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

export const useUpdateMedicineOrder = () =>
  useMutation(async (item: IMedicineOrder) => {
    const res = await fetch(`${BASE_URL}/medicinesOrders/${item.id}/`, {
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

export const useDeleteMedicineOrder = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/medicinesOrders/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
