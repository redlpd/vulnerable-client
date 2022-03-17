import React from 'react'
import { render } from 'react-dom'
import './index.css'
import Main from './pages/Main'

import { getToken } from './helper/utils'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
const client = new ApolloClient({
  uri: 'http://localhost:4200/api/graphql/',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById('root')
)
