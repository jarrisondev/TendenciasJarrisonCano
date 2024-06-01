import { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IEmployee, useCreateEmployee, useUpdateEmployee } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  birthDate: z.date(),
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
  email: z.string().email('El email es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  role: z.string().min(1, 'El rol es requerido'),
})

interface Props {
  item: IEmployee
  onClose: () => void
}

export const Employee: FC<Props> = ({ item, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>({
    defaultValues: item.id ? item : undefined,

    resolver: zodResolver(schema),
  })
  const fetchCreate = useCreateEmployee()
  const fetchUpdate = useUpdateEmployee()

  const handleCreateMedicine = (data: IEmployee) => {
    fetchCreate
      .mutateAsync({
        ...data,
        birthDate: data.birthDate.toISOString().split('T')[0] as unknown as Date,
      })
      .then(() => {
        onClose()
      })
  }

  const handleUpdateMedicine = (data: IEmployee) => {
    fetchUpdate
      .mutateAsync({
        ...data,
        birthDate: data.birthDate.toISOString().split('T')[0] as unknown as Date,
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
        <Input
          placeholder="Nombre"
          {...register('name')}
          className={errors.name ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Fecha de nacimiento"
          type="date"
          {...register('birthDate', {
            valueAsDate: true,
          })}
          className={errors.birthDate ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Teléfono"
          {...register('phone')}
          className={errors.phone ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Email"
          {...register('email')}
          className={errors.email ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Dirección"
          {...register('address')}
          className={errors.address ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Nombre de usuario"
          {...register('username')}
          className={errors.username ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Contraseña"
          {...register('password')}
          className={errors.password ? 'border-red-500 text-red-500' : ''}
        />
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Administrative">Administrativo</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Nurse">Enfermero</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
