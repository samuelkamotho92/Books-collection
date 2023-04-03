import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bookslist from './Components/Bookslist'
import Authorlist from './Components/Authorlist'
import AddBook from './Components/AddBook'
// import { ApolloClient, InMemoryCache, ApolloProvider , gql} from '@apollo/client';
// import {ApolloClient} from 'apollo-boost'
// import {ApolloProvider} from 'react-apollo'
// const client = new ApolloClient({
//   url:`http://localhost:8080/graphql`,
//   cache: new InMemoryCache()
// })
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<Bookslist />
<AddBook />
{/* <Authorlist /> */}
    </div>

  )
}

export default App
