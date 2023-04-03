import React,{useState} from 'react'
import { useQuery,gql, useMutation } from '@apollo/client'
import { GetAuthors,addBooksMutation } from '../Queries/graphqueries'

const AddBook = () => {
    const [name,setName] = useState('');
    const [genre,setGenre] = useState('');
    const [authorId,setAuthorId] = useState('');
    const {loading,error,data} = useQuery(GetAuthors);
    // console.log(addBooksMutation)
    const [addBook,{loadingData,errorData}] = useMutation(addBooksMutation)

    const displayAuthors = () =>{
        if (loading) return <option disabled>Loading...</option>;
        if (error) return <option disabled>Error Loading authors</option>;
        if(data){
            const {authors} = data;
            return authors.map((author, index) => {
                return (<option key={index} value={author.id}> {author.name} </option>);
            })
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(loadingData) return 'submiting ...'
        if(errorData) return 'submission error'
        console.log(name,genre,authorId)
        addBook({ variables: { name:name, genre:genre, authorId:authorId} })
        .then(() => {
          setName('');
          setGenre('');
          setAuthorId('');
        }).catch(err=>{
            console.error(err)
        })
    }
  return (
    <form id= "add-book" onSubmit={handleSubmit}>
    <div className= "field">
        <label>Book Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
    </div>

    <div className= "field">
        <label>Genre</label>
        <input type="text"  value={genre} onChange={(e)=>setGenre(e.target.value)}/>
    </div>

    <div className= "field">
        <label>Author</label>
        <select value={authorId} onChange={(e)=>setAuthorId(e.target.value)}>
            <option>Select author</option>
            {displayAuthors()}
        </select>
    </div>

    <button>+</button>

</form>

  )
}

export default AddBook