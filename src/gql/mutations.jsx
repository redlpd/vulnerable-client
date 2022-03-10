import { gql } from '@apollo/client'

export const SignupMutation = gql`
  mutation signup(
    $fullName: String!
    $address: String!
    $email: String!
    $username: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      fullName: $fullName
      address: $address
      email: $email
      username: $username
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
    }
  }
`

export const CreatePostMutation = gql`
  mutation CreatePost($userId: String, $content: String!) {
    createPost(userId: $userId, content: $content) {
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
        content
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
      }
    }
  }
`

export const UpdatePostMutation = gql`
  mutation UpdatePost($postId: String!, $content: String!) {
    updatePost(postId: $postId, content: $content) {
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
        content
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
      }
    }
  }
`

export const CreateCommentMutation = gql`
  mutation CreateComment($content: String!, $postId: String!, $userId: String) {
    createComment(content: $content, postId: $postId, userId: $userId) {
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
`

export const DeletePostMutation = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`
