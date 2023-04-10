import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query GetUsers {
        users {
          id
          name
          email
        }
      }
    `,
  })
  .then((result) => console.log(result))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
