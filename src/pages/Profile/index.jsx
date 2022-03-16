import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GetUserCreditsQuery, GetUserQuery, ListCreditsHistoryQuery } from '../../gql/queries'
import { getUserId, removeToken, removeUserId } from '../../helper/utils'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import Modal from '../../components/shared/modal'
import { AddCreditsMutation, SendCreditsMutation } from '../../gql/mutations'

const Profile = () => {
  const { data, loading } = useQuery(GetUserQuery, {
    variables: {
      userId: getUserId()
    }
  })

	const { data: creditsHistoryData, loading: creditsHistoryLoading } = useQuery(ListCreditsHistoryQuery)
	const { data: userCreditsData, loading: userCreditsLoading } = useQuery(GetUserCreditsQuery)
  const [addCredits, { loading: addCreditsLoading }] = useMutation(AddCreditsMutation)
  const [sendCredits, { loading: sendCreditsLoading }] = useMutation(SendCreditsMutation)

  const history = useNavigate()

	const [userCredit, setUserCredit] = useState(0)
  const [currentUser, setCurrentUser] = useState({})
	const [creditsHistory, setCreditsHistory] = useState([])
  const [showAccountMenu, setShowAccountMenu] = useState(false)
	const [modalData, setModalData] = useState({ showModal: false, type: ''})

	useEffect(() => {
		if (userCreditsData && userCreditsData.getUserCredits) {
			setUserCredit(userCreditsData.getUserCredits.amount)
		}
	}, [userCreditsData])

	useEffect(() => {
		if (creditsHistoryData && creditsHistoryData.listCreditsHistory) {
			setCreditsHistory(creditsHistoryData.listCreditsHistory)
		}
	}, [creditsHistoryData])

  useEffect(() => {
    if (data) {
      setCurrentUser(data.getUser)
    }
  }, [data])

	const handleAddCredits = (amount) => {
		addCredits({
      variables: {
        credits: parseInt(amount)
      },
      onCompleted: ({ addCredits }) => {
				const newUserCredit = userCredit + addCredits.amount
				const newCreditsHistory = [...creditsHistory]
				newCreditsHistory.push(addCredits)

				setUserCredit(newUserCredit)
				setCreditsHistory(newCreditsHistory)
				setModalData({})
      },
      onError: (error) => {
        console.log(error)
      }
    })
	}

	const handleSendCredits = (amount, email) => {
		sendCredits({
      variables: {
				email: email,
        credits: parseInt(amount)
      },
      onCompleted: ({ sendCredits }) => {
				const newUserCredit = userCredit - sendCredits.amount
				const newCreditsHistory = [...creditsHistory]
				const newSendCredits = sendCredits
				newSendCredits.amount = sendCredits.amount * -1
				newCreditsHistory.push(newSendCredits)

				setUserCredit(newUserCredit)
				setCreditsHistory(newCreditsHistory)
				setModalData({})
      },
      onError: (error) => {
        console.log(error)
      }
    })
	}

  const handleLogout = () => {
    removeToken()
    removeUserId()
    history('/login')
  }

	const amountFormatter = (amount) => {
		const newAmount = amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

		return `${newAmount}.00`
	}

	const mutation = modalData.type === 'add' ? handleAddCredits : handleSendCredits

	if (loading || creditsHistoryLoading || userCreditsLoading) return <div>loading...</div>

  return (
    <div className='mb-10'>
      <div className={styles.navbarContainer}>
        <div className='flex items-center justify-between text-white global-container'>
          <a href='/home' className='text-2xl'>DEMO</a>
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
        <div className='px-5 mt-10 w-full' style={{ maxWidth: '700px' }}>
          <div className='w-full'>
            <div className='flex justify-between items-center mb-5'>
              <label className='text-base font-medium flex items-center' style={{ color: '#9e9e9e'}}>
                <span className={styles.bullet} />
                A C C O U N T
              </label>

							<div className='flex items-center'>
								<button
									type='button'
									className={`${styles.actionBtn} mr-4`}
									onClick={() => setModalData({ showModal: true, type: 'add' })}
								>
									ADD
								</button>

								<button
									type='button'
									className={styles.actionBtn}
									onClick={() => setModalData({ showModal: true, type: 'send' })}
								>
									SEND
								</button>
							</div>
            </div>
            <div className={styles.accountInfoContainer}>
              <div className='flex items-center'>
                <div className={styles.accountInfoAvatar}>
                  {currentUser && currentUser.fullName
                    ? currentUser.fullName.substring(0, 1)
                    : ''}
                </div>
                <div className='text-white'>
                  <p className='text-base font-medium'>{currentUser.fullName}</p>
                  <p className='text-sm'>{currentUser.address}</p>
                </div>

              </div>

              <div className='w-full text-white mt-2'>
                <div className='text-right'>
                  <div>
                    Available Credits
                  </div>
                  <div className='text-base font-medium flex justify-between'>
                    <p>**** **** 4200</p>
                    <p>{`PHP ${amountFormatter(userCredit)}`}</p>
                  </div>
                </div>
              </div>
            </div>

            <label className='text-base font-medium flex items-center mt-10 mb-5' style={{ color: '#9e9e9e'}}>
              <span className={styles.bullet} />
              C R E D I T S &nbsp;&nbsp; H I S T O R Y
            </label>
            <div className={styles.infoContainer}>
							{creditsHistory.map((credit) => (
								<div className='flex justify-between my-2' key={credit.id}>
									<p>AMOUNT</p>
									<p className='text-base font-medium' style={{ color: credit.amount < 0 ? 'red' : '#11823b'}}>
										{`PHP ${amountFormatter(credit.amount)}`}</p>
								</div>
							))}
            </div>
          </div>
        </div>
      </div>

			{modalData && modalData.showModal && (
				<Modal
					type={modalData.type}
					showModal={setModalData}
					loading={addCreditsLoading || sendCreditsLoading}
					handleSubmit={mutation}
				/>
			)}
    </div>
  )
}

export default Profile
