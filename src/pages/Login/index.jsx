import { useState } from 'react'
import logo from '../../icons/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { gql, useMutation } from '@apollo/client'
import { setCookies } from '../../helper/utils'

export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login = () => {
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading }] = useMutation(LoginMutation)

  const handleLogin = () => {
    login({
      variables: {
        email: email,
        password: password
      },
      onCompleted: (data) => {
        const { login } = data
        setCookies(login.token)
        if (login.token) {
          history('/home')
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full flex items-center flex-col'>
        <div className={styles.logoContainer}>
          <img src={logo} alt='logo' />
        </div>
        <div className={styles.formContainer}>
          <form>
            <div>
              <label htmlFor='email' className={styles.inputLabel}>
                Email
              </label>
              <div>
                <input
                  type='text'
                  id='email'
                  className={styles.input}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='enyetuenwuevue@email.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className={styles.inputLabel}>
                Password
              </label>
              <div>
                <input
                  type='password'
                  id='password'
                  className={styles.input}
                  placeholder='*******'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='flex items-center w-full justify-center'>
              <button
                type='button'
                className={styles.submitBtn}
                onClick={() => handleLogin()}
                disabled={loading}
              >
                {loading ? '...' : 'Sign In'}
              </button>
            </div>

            <div className='flex items-center justify-center mt-4'>
              <Link to='/signup' className={styles.link}>
                Not on Mapia yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
