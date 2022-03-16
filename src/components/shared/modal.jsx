import React, { useState } from 'react'
import styles from './styles.module.scss'

const Modal = ({ type, showModal, loading = false, handleSubmit }) => {
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div
      className='fixed z-50 inset-0 p-4 flex justify-center items-center'
      style={{ backgroundColor: 'rgb(64 64 64 / 40%)' }}
    >
      <div
        className='bg-white rounded-lg'
        style={{ width: '500px' }}
      >
        <div
          className={styles.modalHeader}
        >
          {`${type === 'add' ? 'ADD' : 'SEND'}`} CREDITS
        </div>
        <div className='px-4 pb-4'>
          <label className='text-xs font-medium' style={{ color: '#9e9e9e'}}>AMOUNT</label>
          <input
            type='text'
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter Amount'
            className={styles.input}
          />

          {type === 'send' && (
            <>
              <label className='text-xs font-medium mt-2' style={{ color: '#9e9e9e'}}>EMAIL ADDRESS</label>
              <input
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
                className={styles.input}
              />
            </>
          )}

          <div className='w-full flex justify-end mt-3'>
            <button
              type='button'
              disabled={loading || !amount}
              onClick={() => type === 'add' ? handleSubmit(amount) : handleSubmit(amount, email)}
              className='mr-4 bg-primary-green py-1 px-2 rounded text-white'
            >
              { loading ? '...' : 'Submit'}
            </button>
            <button
              type='button'
              disabled={loading}
              className={styles.modalCancelBtn}
              onClick={() => showModal({})}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
