import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IDiagnosticHelpOrder, useCreateDiagnosticHelpOrder, useUpdateDiagnosticHelpOrder } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFetchOrders } from '../orders/services'
import { Input } from '@/components/ui/input'

const schema = z.object({
  order: z.number().int().positive(),
  quantity: z.number().int().positive(),
  name: z.string().nonempty(),
  price: z.number().int().positive(),
  requireAssistance: z.boolean(),
})

interface Props {
  item: IDiagnosticHelpOrder
  onClose: () => void
}

export const DiagnosticHelpOrder: FC<Props> = ({ item, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDiagnosticHelpOrder>({
    defaultValues: item.id ? item : undefined,
    resolver: zodResolver(schema),
  })
  const create = useCreateDiagnosticHelpOrder()
  const update = useUpdateDiagnosticHelpOrder()

  const orders = useFetchOrders().data ?? []

  const handleCreate = (data: IDiagnosticHelpOrder) => {
    create.mutateAsync(data).then(() => {
      onClose()
    })
  }

  const handleUpdate = (data: IDiagnosticHelpOrder) => {
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
        <Input
          placeholder="Nombre"
          {...register('name')}
          className={errors.name ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Precio"
          type="number"
          {...register('price', {
            valueAsNumber: true,
          })}
          className={errors.price ? 'border-red-500 text-red-500' : ''}
        />

        <Input
          placeholder="Cantidad"
          type="number"
          {...register('quantity', {
            valueAsNumber: true,
          })}
          className={errors.quantity ? 'border-red-500 text-red-500' : ''}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('requireAssistance')}
            className="mr-2"
            defaultChecked={item.requireAssistance}
          />
          <label>Requiere asistencia</label>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit(item.id ? handleUpdate : handleCreate)}>
            {item.id ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  )
}
