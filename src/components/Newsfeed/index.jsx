import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { getUserId } from '../../helper/utils'
import { CreatePostMutation } from '../../gql/mutations'
import styles from './styles.module.scss'
import { ListPostsQuery } from '../../gql/queries'
import Post from './post'

const Newsfeed = ({ posts, currentUser }) => {
  const [createPost, { loading: postLoading }] = useMutation(CreatePostMutation)

  const [post, setPost] = useState('')

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

  return (
    <div className='w-full'>
      <div className={styles.createPostContainer}>
        <div className='flex items-center'>
          <div className='w-10 mr-2'>
            <a href={`/${currentUser.username}`} className={styles.avatar}>
              {currentUser && currentUser.fullName
                ? currentUser.fullName.substring(0, 1)
                : ''}
            </a>
          </div>
          <textarea
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
      <Post data={posts} />
    </div>
  )
}

export default Newsfeed
