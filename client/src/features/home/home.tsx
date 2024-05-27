import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocation } from 'wouter'

export const Home = () => {
  const [location, setLocation] = useLocation()

  const handleSubmit = () => {
    setLocation('/dashboard')
  }

  return (
    <div className="container mx-auto min-h-screen text-center flex flex-col items-center justify-center">
      <div className="w-2/5 bg-white px-5 py-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center">Hospital Andres TDEA</h1>
        <p className="text-sm max-w-4xl my-8 text-gray-400">
          Hostipal Andres TDEA es un hospital de alto estandar que brinda servicios de salud a la comunidad de la ciudad
          de Medellín y alrededores.
        </p>
        <Input placeholder="Correo electrónico" />
        <Input type="password" placeholder="Contraseña" className="mt-4" />
        <Button className="mt-8" onClick={handleSubmit}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  )
}
