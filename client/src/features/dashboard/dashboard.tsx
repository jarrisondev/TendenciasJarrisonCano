import { Button } from '@/components/ui/button'
import { Link } from 'wouter'
import { UserNav } from './components/UserNav'

export const Dashboard = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className={'flex items-center mx-6 space-x-4 lg:space-x-6'}>
            <Link to="/examples/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Pacientes
            </Link>
            <Link
              to="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Doctores
            </Link>
            <Link
              to="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              to="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Hospital</h2>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
