import { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IPatient, useCreatePatient, useUpdatePatient } from './services'

// date yyyy-mm-dd
const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  birthDate: z.date(),
  phone: z.string().min(1, 'El teléfono es requerido'),
  email: z.string().email('El email es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  emergencyContactName: z.string().min(1, 'El nombre del contacto de emergencia es requerido'),
  emergencyContactPhone: z.string().min(1, 'El teléfono del contacto de emergencia es requerido'),
  gender: z.string().min(1, 'El género es requerido'),
  emergencyContactRelationship: z.string().min(1, 'La relación del contacto de emergencia es requerida'),
  medicalInsuranceName: z.string().min(1, 'El nombre del seguro médico es requerido'),
  medicalInsuranceNumber: z.number().min(1, 'El número del seguro médico es requerido'),
  medicalInsuranceStatus: z.boolean(),
  medicalInsuranceExpirationDate: z.date(),
})

interface Props {
  item: IPatient
  onClose: () => void
}

export const Patient: FC<Props> = ({ item, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatient>({
    defaultValues: item.id ? item : undefined,

    resolver: zodResolver(schema),
  })
  const createMedicine = useCreatePatient()
  const updateMedicine = useUpdatePatient()

  const handleCreateMedicine = (data: IPatient) => {
    createMedicine
      .mutateAsync({
        ...data,
        birthDate: data.birthDate.toISOString().split('T')[0] as unknown as Date,
        medicalInsuranceExpirationDate: data.medicalInsuranceExpirationDate
          .toISOString()
          .split('T')[0] as unknown as Date,
      })
      .then(() => {
        onClose()
      })
  }

  const handleUpdateMedicine = (data: IPatient) => {
    updateMedicine
      .mutateAsync({
        ...data,
        birthDate: data.birthDate.toISOString().split('T')[0] as unknown as Date,
        medicalInsuranceExpirationDate: data.medicalInsuranceExpirationDate
          .toISOString()
          .split('T')[0] as unknown as Date,
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
          placeholder="Nombre del contacto de emergencia"
          {...register('emergencyContactName')}
          className={errors.emergencyContactName ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Teléfono del contacto de emergencia"
          {...register('emergencyContactPhone')}
          className={errors.emergencyContactPhone ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Género"
          {...register('gender')}
          className={errors.emergencyContactPhone ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Relación del contacto de emergencia"
          {...register('emergencyContactRelationship')}
          className={errors.emergencyContactRelationship ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Nombre del seguro médico"
          {...register('medicalInsuranceName')}
          className={errors.medicalInsuranceName ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Número del seguro médico"
          {...register('medicalInsuranceNumber')}
          className={errors.medicalInsuranceNumber ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Estado del seguro médico"
          {...register('medicalInsuranceStatus')}
          className={errors.medicalInsuranceStatus ? 'border-red-500 text-red-500' : ''}
        />
        <Input
          placeholder="Fecha de expiración del seguro médico"
          type="date"
          {...register('medicalInsuranceExpirationDate', {
            valueAsDate: true,
          })}
          className={errors.medicalInsuranceExpirationDate ? 'border-red-500 text-red-500' : ''}
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
