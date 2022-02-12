import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'

export const ListUsersQuery = gql`
  query getAllUsers {
    users {
      id
    }
  }
`

const Main = () => {
  const { loading, error, data } = useQuery(ListUsersQuery)

  if (loading) return <div>loading...</div>
  if (error) return <p>Error :(</p>

  const Home = () => {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }

  const About = () => {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }

  const Dashboard = () => {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    )
  }

  console.log(data)

  return (
    <Router>
      <div>
        <ul className='flex bg-blue'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        </ul>

        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Main
