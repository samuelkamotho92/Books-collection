import { gql } from "@apollo/client";
export const GetAuthors = gql`
{
authors{
  name
}
}
`;

export const getBooks = gql`
  {
    books {
      name
      genre
    }
  }
`;

export const publisherBook = qql`
{
publishers{
  name
  yearFounded
}
}
`;


export const addBooksMutation = gql`
mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
  addBook(name: $name, genre: $genre, authorId: $authorId) {
    name
    genre
  }
}
`


export const publisherMutation = gql`
mutation AddPublisher($name:String!,$yearFounded:String!){
  addPublisher(name:$name,genre:$genre){
    name
    genre
  }
}
`


// mutation AddTodo($type: String!) {
//   addTodo(type: $type) {
//     id
//     type
//   }
// }