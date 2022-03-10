import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CreateCommentMutation } from '../../gql/mutations'
import { ListPostsQuery } from '../../gql/queries'
import { getUserId } from '../../helper/utils'
import styles from './styles.module.scss'
import * as _ from 'lodash'

const Comment = ({ postId, comments }) => {
  const [createComment, { loading }] = useMutation(CreateCommentMutation)

  const [comment, setComment] = useState('')

  const handleCreateComment = () => {
    createComment({
      variables: {
        content: comment,
        postId: postId,
        userId: getUserId()
      },
      onCompleted: () => {
        setComment('')
      },
      onError: (error) => {
        console.log(error)
      },
      update(cache, { data: { createComment } }) {
        const { listPosts } = cache.readQuery({ query: ListPostsQuery })
        const newListPosts = _.cloneDeep(listPosts)
        const index = newListPosts.findIndex((item) => item.id === postId)
        newListPosts[index].comments.push(createComment)

        cache.writeQuery({
          query: ListPostsQuery,
          data: { listPosts: [...newListPosts] }
        })
      }
    })
  }
  return (
    <div className='mt-5'>
      <div className='mt-5'>
        {comments.map((comment) => (
          <div className={styles.commentContainer} key={comment.id}>
            <div className='flex items-center'>
              <div className='w-10 mr-2'>
                <a href={`/${comment.user.username}`} className={styles.avatar}>
                  {comment.user.fullName.substring(0, 1)}
                </a>
              </div>
              <a
                href={`/${comment.user.username}`}
                className='font-medium text-sm'
                style={{ color: 'rgb(36 36 36)' }}
              >
                {comment.user.fullName}
              </a>
            </div>
            <div className='flex items-center ml-11 mt-2 text-sm'>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex'>
        <textarea
          type='text'
          className={styles.input}
          value={comment}
          placeholder='Write a comment'
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          onClick={() => handleCreateComment()}
          disabled={loading}
          className='focus:outline-none ml-3'
        >
          <svg width='24px' height='28px' viewBox='0 0 28 28' fill='none'>
            <path
              d='M26.8908 3.63751C27.4296 2.02234 25.8325 0.515487 24.2514 1.14736L23.7584 1.34438L2.05498 8.09216C0.775656 8.48991 0.61966 10.236 1.80825 10.8539L11.8128 16.0544C11.8453 16.0712 11.8781 16.0868 11.9113 16.1011C11.9255 16.1337 11.9408 16.166 11.9574 16.1978L17.1625 26.1935C17.7809 27.381 19.5286 27.2252 19.9267 25.947L26.6579 4.33542L26.8908 3.63751ZM4.2732 9.49616C4.10263 9.54919 4.08185 9.78221 4.24034 9.8646L12.281 14.0443C12.3584 14.0845 12.453 14.0699 12.5146 14.0083L22.2205 4.31105C22.3683 4.16341 22.2193 3.91657 22.0198 3.97859L4.2732 9.49616ZM18.5213 23.7312C18.4682 23.9016 18.2354 23.9224 18.153 23.7641L13.9694 15.7303C13.9291 15.6529 13.9437 15.5582 14.0055 15.4965L23.7117 5.79893C23.8594 5.65131 24.1061 5.80048 24.044 5.99989L18.5213 23.7312Z'
              fill='#11823b'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Comment
