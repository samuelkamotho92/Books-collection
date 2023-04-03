import React,{useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { publisherBook,publisherMutation } from '../Queries/graphqueries'

const PublisherList = () => {
    const [name,setName] = useState('');
    const [yearFounded,setyearFounded] = useState('');
const {loading,error,data} = useQuery(publisherBook)
const [addPublisher,{loadingDt,errorDt}] = useMutation(publisherMutation)
 if(loading)return <p>Loading ...</p>
 if(error)return <p>Something is wrong</p>


 const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(name,yearFounded)
    if(loadingDt) return <p>Loading ...</p>
    if(errorDt) return <p>something is wrong</p>
    addPublisher({varibles:{name,yearFounded}}).then(()=>{
        setName('')
        setyearFounded('')
    }).catch(err=>{
        console.error(err)
    })
 }
 
    return (
    <div>
       {
        data.publishers.map((publisher)=>(
            <div>
            <p>{publisher.name}</p>
            <p>{publisher.yearFounded}</p>
            </div>
    
        ))
       }
       <form onSubmit={handleSubmit}>
<label>Name Publisher</label>
<input type='text' value={name}  onChange={(e)=>setName(e.target.value)}/>
<label>Year Founded</label>
<input type='text' value={yearFounded}  onChange={(e)=>setyearFounded(e.target.value)}/>
<button type='submit'>SUBMIT</button>
       </form>
    </div>
  )
}

export default PublisherList