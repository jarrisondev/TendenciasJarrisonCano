import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IMedicineOrder, useCreateMedicineOrder, useUpdateMedicineOrder } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFetchOrders } from '../orders/services'
import { useFetchMedicines } from '../medicines/services'
import { Input } from '@/components/ui/input'

const schema = z.object({
  order: z.number().int().positive('La orden es requerida'),
  medicine: z.number().int().positive('La medicina es requerida'),
  quantity: z.number().int().positive('La cantidad es requerida'),
})

interface Props {
  item: IMedicineOrder
  onClose: () => void
}

export const MedicineOrder: FC<Props> = ({ item, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMedicineOrder>({
    defaultValues: item.id ? item : undefined,
    resolver: zodResolver(schema),
  })
  const create = useCreateMedicineOrder()
  const update = useUpdateMedicineOrder()

  const orders = useFetchOrders().data ?? []
  const medicines = useFetchMedicines().data ?? []

  const handleCreate = (data: IMedicineOrder) => {
    create.mutateAsync(data).then(() => {
      onClose()
    })
  }

  const handleUpdate = (data: IMedicineOrder) => {
    update.mutateAsync({ ...data, id: item.id }).then(() => {
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
          name="order"
          render={({ field }) => (
            <>
              <Select
                value={field.value?.toString() ?? undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="# Orden" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {orders?.map((item) => (
                      <SelectItem key={item.id} value={item.id?.toString() ?? ''}>
                        {item.id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>{errors.order && <p className="text-red-500">{errors.order.message}</p>}</div>
            </>
          )}
        />
        <Controller
          control={control}
          name="medicine"
          render={({ field }) => (
            <>
              <Select
                value={field.value?.toString() ?? undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Medicina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {medicines?.map((item) => (
                      <SelectItem key={item.id} value={item.id?.toString() ?? ''}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>{errors.order && <p className="text-red-500">{errors.order.message}</p>}</div>
            </>
          )}
        />
        <Input
          placeholder="Cantidad"
          type="number"
          {...register('quantity', {
            valueAsNumber: true,
          })}
          className={errors.quantity ? 'border-red-500 text-red-500' : ''}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit(item.id ? handleUpdate : handleCreate)}>
            {item.id ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  )
}
