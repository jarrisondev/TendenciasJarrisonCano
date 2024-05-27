import { Route, Switch } from 'wouter'
import { Dashboard } from './features/dashboard/dashboard'
import { Home } from './features/home/home'
import { Layout } from './layout/Layout'
import { Login } from './features/Login/login'

function App() {
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>{' '}
      <Switch>
        <Layout>
          <Route path="/" component={() => <Home />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
        </Layout>
      </Switch>
    </div>
  )
}

export default App
