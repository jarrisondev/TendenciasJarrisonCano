import { ModeToggle } from '@/components/modeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type Schema = z.infer<typeof schema>

export const Home = () => {
  const [, setLocation] = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Schema) => {
    console.log(data)
    setLocation('/dashboard')
  }

  return (
    <>
      <div className="flex justify-end mt-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto min-h-screen text-center flex flex-col items-center justify-center">
        <div className="w-2/5 bg-white dark:bg-transparent px-5 py-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-center">Hospital Andres TDEA</h1>
          <p className="text-sm max-w-4xl my-8 text-gray-400">
            Hostipal Andres TDEA es un hospital de alto estandar que brinda servicios de salud a la comunidad de la
            ciudad de Medellín y alrededores.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Nombre de usuario"
              {...register('username')}
              className={errors.username ? 'border-red-500 text-red-500' : ''}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
              className={`mt-4 ${errors.password ? 'border-red-500 text-red-500' : ''}`}
            />
            <Button className="mt-8">Iniciar sesión</Button>
          </form>
        </div>
      </div>
    </>
  )
}
