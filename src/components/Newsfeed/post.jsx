import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { DeletePostMutation, UpdatePostMutation } from '../../gql/mutations'
import styles from './styles.module.scss'
import Comment from './comment'
import { getUserId } from '../../helper/utils'
import { ListPostsQuery } from '../../gql/queries'

const Post = ({ data, currentUser }) => {
  const [updatePost] = useMutation(UpdatePostMutation)
  const [deletePost] = useMutation(DeletePostMutation)

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

  const handleDeletePost = (postId) => {
    deletePost({
      variables: {
        postId: postId
      },
      onError: (error) => {
        console.log(error)
      },
      update(cache) {
        const { listPosts } = cache.readQuery({ query: ListPostsQuery })
        const newListPosts = [...listPosts]
        const index = newListPosts.findIndex((post) => post.id === postId)
        newListPosts.splice(index, 1)

        cache.writeQuery({
          query: ListPostsQuery,
          data: { listPosts: [...newListPosts] }
        })
      }
    })
  }

  return (
    <div className='my-14'>
      {data.map((post, index) => (
        <div
          className={`${styles.createPostContainer} mb-10 relative`}
          key={post.user.id + index}
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
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </div>
          <div className={styles.action}>
            {post.id !== showUpdateInput && getUserId() === post.user.id && (
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
            )}

            {currentUser.role === 'admin' && (
              <button
                type='button'
                className='ml-4'
                onClick={() => handleDeletePost(post.id)}
              >
                <svg
                  width='16px'
                  height='16px'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 105.16 122.88'
                >
                  <path
                    className='cls-1'
                    fill='#11823b'
                    d='M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z'
                  />
                </svg>
              </button>
            )}
          </div>

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
