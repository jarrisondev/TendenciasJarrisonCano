import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export const Home = () => {
  return (
    <div className="container mx-auto min-h-screen text-center flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center mt-36">Bienvenidos a Hospital Andres TDEA</h1>
      <p className="text-xl max-w-4xl mt-10">
        Hostipal Andres TDEA es un hospital de alto estandar que brinda servicios de salud a la comunidad de la ciudad
        de Medellín y alrededores.
      </p>
      <Link to="/dashboard">
        <Button className="mt-16">Iniciar sesión</Button>
      </Link>
    </div>
  )
}
