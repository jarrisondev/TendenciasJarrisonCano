import { Route, Switch } from 'wouter'
import { Dashboard } from './features/dashboard/dashboard'
import { Home } from './features/home/home'
import { Layout } from './layout/Layout'
import { Login } from './features/Login/login'
import { ThemeProvider } from './layout/ThemeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#060606]  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Switch>
        <Layout>
          <Route path="/" component={() => <Home />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
        </Layout>
      </Switch>
    </ThemeProvider>
  )
}

export default App
