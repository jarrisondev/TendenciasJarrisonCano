import { FC, PropsWithChildren } from 'react'
import { Link, useLocation } from 'wouter'
import { ModeToggle } from '@/components/modeToggle'
import { UserNav } from './UserNav'
import { useUserStore } from '@/store/useUserStore'
import { routes } from '@/lib/routes'

interface Props extends PropsWithChildren {}

export const DashboardLayout: FC<Props> = ({ children }) => {
  const [location, setLoaction] = useLocation()
  const user = useUserStore((state) => state.user)

  const active = (path: string) => {
    return location === path ? 'text-primary' : 'text-muted-foreground'
  }

  if (!user) {
    setLoaction(routes.home)
    return null
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className={'flex items-center mx-6 space-x-4 lg:space-x-6'}>
            <h2 className="text-3xl font-bold tracking-tight">Hospital</h2>

            {user.role === 'Doctor' && (
              <Link
                to={routes.patients}
                className={`${active(routes.patients)} text-sm font-medium transition-colors hover:text-primary`}
              >
                Pacientes
              </Link>
            )}
            {user.role === 'Administrative' && (
              <Link
                to={routes.employee}
                className={`${active(routes.employee)} text-sm font-medium  transition-colors hover:text-primary `}
              >
                Empleados
              </Link>
            )}
            {(user.role === 'Doctor' || user.role === 'Nurse') && (
              <Link
                to={routes.medications}
                className={`${active(routes.medications)} text-sm font-medium  transition-colors hover:text-primary `}
              >
                Medicamentos
              </Link>
            )}
            {user.role === 'Doctor' && (
              <>
                <Link
                  to={routes.orders}
                  className={`${active(routes.orders)} text-sm font-medium  transition-colors hover:text-primary `}
                >
                  Ordenes
                </Link>
                <Link
                  to={routes.medicineOrder}
                  className={`${active(
                    routes.medicineOrder,
                  )} text-sm font-medium  transition-colors hover:text-primary `}
                >
                  Ordenes de medicamentos
                </Link>
                <Link
                  to={routes.procedureOrder}
                  className={`${active(
                    routes.procedureOrder,
                  )} text-sm font-medium  transition-colors hover:text-primary `}
                >
                  Ordenes de procedimientos
                </Link>
                <Link
                  to={routes.diagnosticHelpOrder}
                  className={`${active(
                    routes.diagnosticHelpOrder,
                  )} text-sm font-medium  transition-colors hover:text-primary `}
                >
                  Ordenes de ayudas diagnosticas
                </Link>
              </>
            )}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <p className="font-light">
              Hola <span className="font-semibold"> {user.name}!</span>
            </p>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="container pt-6">
        <div className="">{children}</div>
      </div>
    </div>
  )
}
