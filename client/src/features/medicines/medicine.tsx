import { FC } from 'react'
import { IMedicine, useCreateMedicine, useUpdateMedicine } from './services'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  price: z.number().min(1, 'El precio es requerido'),
  quantity: z.number().min(1, 'La cantidad es requerida'),
})

interface Props {
  medicine: IMedicine
  onClose: () => void
}

export const Medicine: FC<Props> = ({ medicine, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMedicine>({
    defaultValues: medicine.id ? medicine : undefined,
    resolver: zodResolver(schema),
  })
  const createMedicine = useCreateMedicine()
  const updateMedicine = useUpdateMedicine()

  const handleCreateMedicine = (data: IMedicine) => {
    createMedicine.mutateAsync(data).then(() => {
      onClose()
    })
  }

  const handleUpdateMedicine = (data: IMedicine) => {
    updateMedicine.mutateAsync({ ...data, id: medicine.id }).then(() => {
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
        <div className="flex justify-end">
          <Button onClick={handleSubmit(medicine.id ? handleUpdateMedicine : handleCreateMedicine)}>
            {medicine.id ? 'Actualizar medicamento' : 'Crear medicamento'}
          </Button>
        </div>
      </form>
    </div>
  )
}
