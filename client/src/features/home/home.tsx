import { ModeToggle } from '@/components/modeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BASE_URL } from '@/lib/constants'
import { useUserStore } from '@/store/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
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
  const setUser = useUserStore((state) => state.setUser)
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Schema) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${BASE_URL}/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        if (res.ok) {
          const user = await res.json()
          setUser(user)
          setLocation('/dashboard')
        } else {
          setError('username', { message: 'Usuario o contraseña incorrectos' })
          setError('password', { message: 'Usuario o contraseña incorrectos' })
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  return (
    <>
      <div className="flex justify-end mt-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto min-h-screen text-center flex flex-col items-center justify-center">
        <div className="w-2/5 bg-white dark:bg-black px-5 py-8 rounded-xl shadow-sm border border-gray-200">
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
            {errors.username && <p className="text-red-500 text-left text-sm mt-1">{errors.username.message}</p>}
            <Input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
              className={`mt-4 ${errors.password ? 'border-red-500 text-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-left text-sm mt-1">{errors.password.message}</p>}
            <Button className="mt-8" disabled={isPending}>
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
