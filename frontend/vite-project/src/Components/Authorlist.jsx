import React from 'react'
import { useQuery,gql } from '@apollo/client'
import { GetAuthors } from '../Queries/graphqueries';


const Authorlist = () => {
  const {loading,error,data} = useQuery(GetAuthors);
  if(loading)return <p>Loading ...</p>
  if(error) return <p>Something is wrong ...</p>
  console.log(data)
  return (
    <div>
        <ul id='autorlist'>
          <p>Books Authors</p>
          {
            data.authors.map((author)=>(
              <li key={author._id}>
             <p>{author.name}</p>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default Authorlist