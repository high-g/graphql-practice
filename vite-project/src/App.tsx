import { gql, useQuery } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

type User = {
  id: number
  name: string
  email: string
}

function App() {
  const { data, loading, error } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1>Hello World</h1>
      {data.users.map((user: User) => (
        <div key={user.id}>
          <h2>ID: {user.id}</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default App
