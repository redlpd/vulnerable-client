import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { getUserId } from '../../helper/utils'
import { CreatePostMutation, UpdatePostMutation } from '../../gql/mutations'
import styles from './styles.module.scss'
import { ListPostsQuery } from '../../gql/queries'

const Newsfeed = ({ posts }) => {
  const [createPost, { loading: postLoading }] = useMutation(CreatePostMutation)
  const [updatePost] = useMutation(UpdatePostMutation)

  const [post, setPost] = useState('')
  const [showUpdateInput, setShowUpdateInput] = useState('')
  const [updatedPost, setUpdatedPost] = useState('')

  const handlePost = () => {
    createPost({
      variables: {
        userId: getUserId(),
        content: post
      },
      onCompleted: () => {
        setPost('')
      },
      onError: (error) => {
        console.log(error)
      },
      update(cache, { data: { createPost } }) {
        const { listPosts } = cache.readQuery({ query: ListPostsQuery })
        const newListPosts = [...listPosts]
        newListPosts.unshift(createPost)

        cache.writeQuery({
          query: ListPostsQuery,
          data: { listPosts: [...newListPosts] }
        })
      }
    })
  }

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
    <div>
      <div className={styles.createPostContainer}>
        <div className='flex items-center'>
          <a href='/test' className={styles.avatar} />
          <input
            type='text'
            value={post}
            className={styles.input}
            placeholder='Whats on your mind?'
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className='flex justify-end w-full'>
          <button
            type='button'
            onClick={() => handlePost()}
            disabled={!post || postLoading}
            className={styles.postBtn}
          >
            {postLoading ? '...' : 'Post'}
          </button>
        </div>
      </div>

      <div className='my-14'>
        {posts.listPosts.map((post) => (
          <div
            className={`${styles.createPostContainer} mb-10 relative`}
            key={post.id}
          >
            <div className='flex items-center'>
              <div className='w-10 mr-3'>
                <a href='/test' className={styles.avatar} />
              </div>
              {post.id === showUpdateInput ? (
                <input
                  type='text'
                  defaultValue={post.content}
                  onChange={(e) => setUpdatedPost(e.target.value)}
                  className={styles.input}
                />
              ) : (
                <p>{post.content}</p>
              )}
            </div>
            <div className={styles.action}>
              {post.id === showUpdateInput ? (
                <button
                  type='button'
                  onClick={() => setShowUpdateInput('')}
                  className='focus:outline-none'
                >
                  CANCEL
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => setShowUpdateInput(post.id)}
                  className='focus:outline-none'
                >
                  UPDATE
                </button>
              )}
            </div>

            {post.id === showUpdateInput && (
              <div className='flex justify-end w-full'>
                <button
                  type='button'
                  onClick={() => handleUpdatePost()}
                  className={styles.postBtn}
                  disabled={!updatedPost}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Newsfeed
