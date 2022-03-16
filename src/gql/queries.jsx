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

export const GetUserQuery = gql`
  query GetUser($userId: String) {
    getUser(userId: $userId) {
      id
      email
      fullName
      username
      address
      posts {
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
  }
`

export const ListCreditsHistoryQuery = gql`
  query ListCreditsHistory {
    listCreditsHistory {
      amount
      id
    }
  }
`
export const GetUserCreditsQuery = gql`
  query GetUserCredits {
    getUserCredits {
      amount
    }
  }
`
