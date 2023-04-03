import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { getBooks } from '../Queries/graphqueries';


function Bookslist() {
const {loading,error,data} = useQuery(getBooks);
if(loading) return <p>Loading books...</p>;
if(error) return <p>Error ...</p>

  console.log(data);
  return (
    <div>
      <ul id="book-list">
  {
    data.books.map((book)=>(
      <li key={book._id}>
  <p>{book.name}</p> 
  <p>{book.genre}</p>
      </li>
    ))
  }
      </ul>
    </div>
  );
}
//graphql(getBooks)
export default Bookslist;