import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { fetchClientMessagesAsync, selectClientMessages } from './clientMessagesSlice';
import { fetchFreelancerMessagesAsync, selectFreelancerMessages } from './freelancerMessagesSlice';
import { Button } from '@mui/material';


const AllMessages = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const [freelancerNew, setFreelancerNew] = useState(false)
  const client = useSelector((state) => state.clientAuth.clientMe);
  const clientId = useSelector((state) => state.clientAuth.clientMe.id);
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id);
  const navigate = useNavigate()
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const dispatch = useDispatch()

 

  if(clientIsLoggedIn){
    const messages = useSelector(selectClientMessages)
    // const filteredMessages = messages.filter((message) => {
    //   return message.from !== client.username
    // })
    const copy = [...messages]
    const sorted = copy.sort((a,b) => {
      return b.id-a.id
    })
    let newMsgs = []
    for(const a of sorted){
      const containsUser = newMsgs.some((msg) => {
        return msg.freelancerId === a.freelancerId
      })
      if(!containsUser){
        newMsgs.push(a)
      }
    }

  
 
    let unreadMessages = []
    messages.map((msg) => {
      if(!msg.read && msg.from != client.username){
        unreadMessages.push(msg.id)
      }
    })
    const clickMessageClient = (freelancerId) => {
      navigate(`/messages/${freelancerId}`)
    }
  
    useEffect(() => {
      dispatch(fetchClientMessagesAsync(clientId))    
    }, [dispatch])

    

  return(
  <div className='messages'>
     <h1>Messages</h1>
      {newMsgs.length ? newMsgs.map((message) => {
        if(unreadMessages.includes(message.id)){
        return(
          <>
            <button className='messageLink' variant='outlined' onClick={() => clickMessageClient(message.freelancerId)} >{message.freelancer.username} (new messages)</button>
          </>
        )
        }else{
          return(
            <>
              <button className='messageLink' variant='outlined' onClick={() => clickMessageClient(message.freelancerId)} >{message.freelancer.username}</button>
            </>
          )
        }
      }) : 
      <h1>No Messages Yet!</h1>
      }
  </div>
  )
  }
  
  if(freelancerIsLoggedIn){
    const messages = useSelector(selectFreelancerMessages)

    const copy = [...messages]
    const sorted = copy.sort((a,b) => {
      return b.id-a.id
    })

    let newMsgs = []
    for(const a of sorted){
      const containsUser = newMsgs.some((msg) => {
        return msg.clientId === a.clientId
      })
      if(!containsUser){
        newMsgs.push(a)
      }
    }
    let unreadMessages = []
    messages.map((msg) => {
      if(!msg.read && msg.from != freelancer.username){
        unreadMessages.push(msg.id)
      }
    })


    const clickMessageFreelancer = (clientId) => {
      navigate(`/messages/${clientId}`)
    }


    useEffect(() => {
      dispatch(fetchFreelancerMessagesAsync(freelancerId))
    }, [dispatch])
    return(
      <div className='messages'>
      <h1>Messages</h1>
       {newMsgs.length ? newMsgs.map((message) => {
         if(unreadMessages.includes(message.id)){
         return(
           <>
             <button className='messageLink' variant='outlined' onClick={() => clickMessageFreelancer(message.clientId)} >{message.client.username} (new messages)</button>
           </>
         )
         }else{
           return(
             <>
               <button className='messageLink' variant='outlined' onClick={() => clickMessageFreelancer(message.clientId)} >{message.client.username}</button>
             </>
           )
         }
       }) : 
       <h1>No Messages Yet!</h1>
       }
   </div>
    )
  }
}

export default AllMessages
