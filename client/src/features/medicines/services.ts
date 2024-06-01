import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'

export interface IMedicine {
  id?: number
  name: string
  price: number
  quantity: number
}

export const useFetchMedicines = () =>
  useQuery('medicines', async () => {
    const res = await fetch(`${BASE_URL}/medicines/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const medicines: IMedicine[] = await res.json()

    return medicines
  })

export const useCreateMedicine = () =>
  useMutation(async (medicine: IMedicine) => {
    const res = await fetch(`${BASE_URL}/medicines/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useUpdateMedicine = () =>
  useMutation(async (medicine: IMedicine) => {
    const res = await fetch(`${BASE_URL}/medicines/${medicine.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useDeleteMedicine = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/medicines/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
