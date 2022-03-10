import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { UpdatePostMutation } from '../../gql/mutations'
import styles from './styles.module.scss'
import Comment from './comment'
import { getUserId } from '../../helper/utils'

const Post = ({ data }) => {
  const [updatePost] = useMutation(UpdatePostMutation)

  const [updatedPost, setUpdatedPost] = useState('')
  const [showUpdateInput, setShowUpdateInput] = useState('')

  const handleUpdatePost = () => {
    updatePost({
      variables: {
        postId: showUpdateInput,
        content: updatedPost
      },
      onCompleted: () => {
        setShowUpdateInput('')
        setUpdatedPost('')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className='my-14'>
      {data.map((post) => (
        <div
          className={`${styles.createPostContainer} mb-10 relative`}
          key={post.user.id}
        >
          <div>
            <div className='flex items-center'>
              <div className='w-10 mr-2'>
                <a href={`/${post.user.username}`} className={styles.avatar}>
                  {post && post.user.fullName
                    ? post.user.fullName.substring(0, 1)
                    : ''}
                </a>
              </div>
              <a
                href={`/${post.user.username}`}
                className='font-medium text-sm'
                style={{ color: 'rgb(36 36 36)' }}
              >
                {post.user.fullName}
              </a>
            </div>
          </div>

          <div className='flex items-center ml-1 mt-4'>
            {post.id === showUpdateInput ? (
              <textarea
                type='text'
                defaultValue={post.content}
                onChange={(e) => setUpdatedPost(e.target.value)}
                className={styles.input}
              />
            ) : (
              <p className='text-sm'>{post.content}</p>
            )}
          </div>
          {post.id !== showUpdateInput && getUserId() === post.user.id && (
            <div className={styles.action}>
              <button
                type='button'
                onClick={() => setShowUpdateInput(post.id)}
                className='focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16px'
                  height='16px'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V12C22 11.4477 21.5523 11 21 11C20.4477 11 20 11.4477 20 12V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H12C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2H7Z'
                    fill='#11823b'
                  />
                  <path
                    d='M15.7929 3.79312C17.0119 2.57417 18.9882 2.57417 20.2071 3.79312C21.4261 5.01207 21.4261 6.98838 20.2071 8.20733L13.0988 15.3156C12.7144 15.7001 12.2326 15.9729 11.7051 16.1047L8.24256 16.9704C7.90178 17.0556 7.5413 16.9557 7.29291 16.7073C7.04453 16.459 6.94468 16.0985 7.02988 15.7577L7.89552 12.2951C8.0274 11.7676 8.30015 11.2859 8.68463 10.9014L15.7929 3.79312Z'
                    fill='#11823b'
                  />
                </svg>
              </button>
            </div>
          )}

          {post.id === showUpdateInput && (
            <div className='flex justify-end w-full'>
              <div>
                <button
                  type='button'
                  onClick={() => setShowUpdateInput('')}
                  className={`${styles.postBtn} ${styles.danger}`}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={() => handleUpdatePost()}
                  className={styles.postBtn}
                  disabled={!updatedPost}
                >
                  Update
                </button>
              </div>
            </div>
          )}

          <div className={styles.divider} />

          <Comment postId={post.id} comments={post.comments} />
        </div>
      ))}
    </div>
  )
}

export default Post
