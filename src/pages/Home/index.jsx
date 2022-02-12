import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../../helper/utils'

const Home = () => {
  const history = useNavigate()

  const handleLogout = () => {
    removeToken()
    history('/login')
  }

  return (
    <div>
      Home
      <div>
        <button type='button' onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
