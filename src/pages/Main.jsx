import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import { publicRoutes } from '../helper/routes'
import { getToken } from '../helper/utils'
import Home from './Home'
import Profile from './Profile'

export const PrivateRoute = ({ children }) => {
  let location = useLocation()

  if (!getToken()) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export const PublicRoute = ({ children }) => {
  let location = useLocation()

  if (getToken()) {
    return <Navigate to='/home' state={{ from: location }} replace />
  }

  return children
}

const Main = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoute>{route.component}</PublicRoute>}
            />
          ))}

          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path='/settings'
            element={
              <PrivateRoute>
                <div className='text-red text-3xl'>Settings</div>
              </PrivateRoute>
            }
          />

          <Route
            path='/:username'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default Main
