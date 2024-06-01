import { BASE_URL } from '@/lib/constants'
import { useMutation, useQuery } from 'react-query'

export interface IPatient {
  id?: number
  name: string
  birthDate: Date
  phone: string
  email: string
  address: string
  emergencyContactName: string
  emergencyContactPhone: string
  gender: string
  emergencyContactRelationship: string
  medicalInsuranceName: string
  medicalInsuranceNumber: number
  medicalInsuranceStatus: boolean
  medicalInsuranceExpirationDate: Date
}

export const useFetchPatients = () =>
  useQuery('patients', async () => {
    const res = await fetch(`${BASE_URL}/patients/`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const patients: IPatient[] = await res.json()

    return patients
  })

export const useCreatePatient = () =>
  useMutation(async (patient: IPatient) => {
    const res = await fetch(`${BASE_URL}/patients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useUpdatePatient = () =>
  useMutation(async (patient: IPatient) => {
    const res = await fetch(`${BASE_URL}/patients/${patient.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

export const useDeletePatient = () =>
  useMutation(async (id: number) => {
    const res = await fetch(`${BASE_URL}/patients/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })
