import { Route, Switch } from 'wouter'
import { Home } from './features/home/home'
import { Layout } from './layout/Layout'
import { ThemeProvider } from './layout/ThemeProvider'
import { Patients } from './features/patient'
import { DashboardLayout } from './layout/DashboardLayout'
import { routes } from './lib/routes'
import { Medicines } from './features/medicines'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#060606]  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <Switch>
          <Route
            path={routes.home}
            component={() => (
              <Layout>
                <Home />
              </Layout>
            )}
          />

          <Route
            path={routes.patients}
            component={() => (
              <DashboardLayout>
                <Patients />
              </DashboardLayout>
            )}
          />
          <Route
            path={routes.medications}
            component={() => (
              <DashboardLayout>
                <Medicines />
              </DashboardLayout>
            )}
          />
        </Switch>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
