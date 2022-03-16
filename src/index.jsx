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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
