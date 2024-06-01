import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IOrder, useCreateOrder, useUpdateOrder } from './services'
import { useFetchEmployees } from '../employees/services'
import { useFetchPatients } from '../patients/services'

const schema = z.object({
  patient: z.number().int().positive('El paciente es requerido'),
  doctor: z.number().int().positive('El doctor es requerido'),
})

interface Props {
  item: IOrder
  onClose: () => void
}

export const Order: FC<Props> = ({ item, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>({
    defaultValues: item.id ? item : undefined,

    resolver: zodResolver(schema),
  })
  const fetchCreate = useCreateOrder()
  const fetchUpdate = useUpdateOrder()
  const fetchDoctor = useFetchEmployees()
  const fetchPatient = useFetchPatients()

  const doctors = fetchDoctor.data?.filter((item) => item.role === 'Doctor') ?? []

  const handleCreateMedicine = (data: IOrder) => {
    fetchCreate
      .mutateAsync({
        ...data,
        createdAt: new Date().toISOString().split('T')[0] as unknown as Date,
      })
      .then(() => {
        onClose()
      })
  }

  const handleUpdateMedicine = (data: IOrder) => {
    const date = new Date(item.createdAt ?? new Date())
    fetchUpdate
      .mutateAsync({
        ...data,
        createdAt: date.toISOString().split('T')[0] as unknown as Date,
        id: item.id,
      })
      .then(() => {
        onClose()
      })
  }

  return (
    <div className="w-3/5 mx-auto">
      <div className="mb-16">
        <Button onClick={onClose} variant={'secondary'}>
          <ArrowLeft size={16} className="mr-2" />
          Volver atrás
        </Button>
      </div>
      <form className="flex flex-col gap-5">
        <Controller
          control={control}
          name="doctor"
          render={({ field }) => (
            <>
              <Select
                value={field.value?.toString() ?? undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {doctors?.map((item) => (
                      <SelectItem key={item.id} value={item.id?.toString() ?? ''}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>{errors.doctor && <p className="text-red-500">{errors.doctor.message}</p>}</div>
            </>
          )}
        />

        <Controller
          control={control}
          name="patient"
          render={({ field }) => (
            <>
              <Select
                value={field.value?.toString() ?? undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fetchPatient.data?.map((item) => (
                      <SelectItem key={item.id} value={item.id?.toString() ?? ''}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>{errors.patient && <p className="text-red-500">{errors.patient.message}</p>}</div>
            </>
          )}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit(item.id ? handleUpdateMedicine : handleCreateMedicine)}>
            {item.id ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  )
}
