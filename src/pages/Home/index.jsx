import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserId, removeToken, removeUserId } from '../../helper/utils'
import styles from './styles.module.scss'
import { GetCurrentUserQuery, ListPostsQuery } from '../../gql/queries'
import { useQuery } from '@apollo/client'
import Newsfeed from '../../components/Newsfeed'

const Home = () => {
  const { loading, data } = useQuery(ListPostsQuery)
  const { data: currentUserData, loading: currentUserLoading } = useQuery(
    GetCurrentUserQuery,
    {
      variables: {
        userId: getUserId()
      }
    }
  )

  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.getCurrentUser)
    }
  }, [currentUserData])

  const history = useNavigate()

  const handleLogout = () => {
    removeToken()
    removeUserId()
    history('/login')
  }

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className='flex items-center justify-between text-white global-container'>
          <a href='/home' className='text-2xl'>
            DEMO
          </a>
          <div className='relative'>
            <button
              type='button'
              onClick={() =>
                !showAccountMenu
                  ? setShowAccountMenu(true)
                  : setShowAccountMenu(false)
              }
              className={styles.avatar}
            >
              {currentUser && currentUser.fullName
                ? currentUser.fullName.substring(0, 1)
                : ''}
            </button>
            {showAccountMenu && (
              <div className={styles.accountMenuContainer}>
                <a
                  href={`/${currentUser.username}`}
                  className={styles.accountMenuItem}
                >
                  Profile
                </a>
                <button
                  type='button'
                  onClick={() => handleLogout()}
                  className={styles.accountMenuItem}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='global-container flex justify-center'>
        <div className='px-5 mt-10 w-full' style={{ maxWidth: '800px' }}>
          {loading || currentUserLoading ? (
            <div className='w-full h-full flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='50'
                height='50'
                viewBox='0 0 50 50'
              >
                <path
                  fill='#C779D0'
                  d='M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z'
                >
                  <animateTransform
                    attributeName='transform'
                    type='rotate'
                    from='0 25 25'
                    to='360 25 25'
                    dur='0.5s'
                    repeatCount='indefinite'
                  />
                </path>
              </svg>
            </div>
          ) : (
            <Newsfeed posts={data.listPosts} currentUser={currentUser} />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
