import { gql } from '@apollo/client'

export const ListPostsQuery = gql`
  query {
    listPosts {
      id
      user {
        id
        role
        email
        status
        fullName
        username
        isPrivate
        governmentId
      }
      content
      comments {
        id
        user {
          id
          role
          email
          status
          fullName
          username
          isPrivate
          governmentId
        }
        content
      }
    }
  }
`

export const GetCurrentUserQuery = gql`
  query GetCurrentUser($userId: String) {
    getCurrentUser(userId: $userId) {
      id
      role
      email
      status
      fullName
      username
      isPrivate
      governmentId
    }
  }
`
