import { useState } from 'react'
import styles from './styles.module.scss'
import logo from '../../icons/logo.png'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

export const SignupMutation = gql`
  mutation Signup(
    $fullName: String!
    $address: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      fullName: $fullName
      address: $address
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
    }
  }
`
const Signup = () => {
  const [success, setSuccess] = useState(false)
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [signup, { loading }] = useMutation(SignupMutation)

  const handleReset = () => {
    setFullName('')
    setAddress('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
  }

  const handleSubmit = () => {
    signup({
      variables: {
        fullName: fullName,
        address: address,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
      },
      onCompleted: () => {
        setSuccess(true)
        handleReset()
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className='flex flex-col items-center'>
      {!success && (
        <div className={`${styles.logoContainer} mt-10`}>
          <img src={logo} alt='logo' />
        </div>
      )}
      <div className={`${styles.formContainer} ${success ? 'mt-10' : ''}`}>
        {success ? (
          <>
            <div className='flex justify-center'>
              <div className={styles.logoContainer}>
                <img src={logo} alt='logo' />
              </div>
            </div>
            <div className='text-center'>
              <p className='text-secondary-green font-medium text-xl mt-4 mb-2'>
                Thanks for signing up.
              </p>
              <p className='text-sm'>
                You have successfully signed up with Mapia.
              </p>
            </div>

            <div className='flex items-center justify-center mt-4'>
              <Link to='/login' className={styles.submitBtn}>
                Go back to login
              </Link>
            </div>
          </>
        ) : (
          <form autoComplete='off'>
            <div>
              <label htmlFor='fullName' className={styles.inputLabel}>
                What is your name?
              </label>
              <div>
                <input
                  type='text'
                  id='fullName'
                  className={styles.input}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Ovuvuevuevue enyetuenwuevue ugbemugbem osas'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address' className={styles.inputLabel}>
                Address
              </label>
              <div>
                <input
                  type='text'
                  id='address'
                  className={styles.input}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='123 Main Street, New York, NY 10030'
                />
              </div>
            </div>

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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='*******'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='passwordConfirmation'
                className={styles.inputLabel}
              >
                Confirm Password
              </label>
              <div>
                <input
                  type='password'
                  id='passwordConfirmation'
                  className={styles.input}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder='*******'
                />
              </div>
            </div>

            <div className='flex items-center w-full justify-center'>
              <button
                type='button'
                disabled={loading}
                className={styles.submitBtn}
                onClick={() => handleSubmit()}
              >
                {loading ? '...' : 'Submit'}
              </button>
            </div>

            <div className='flex items-center justify-center mt-4'>
              <Link to='/login' className={styles.link}>
                Already have an account?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Signup
