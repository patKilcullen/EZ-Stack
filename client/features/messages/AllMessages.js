import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchClientMessagesAsync, selectClientMessages } from './clientMessagesSlice';
import { fetchFreelancerMessagesAsync, selectFreelancerMessages } from './freelancerMessagesSlice';

const AllMessages = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const client = useSelector((state) => state.clientAuth.clientMe);
  const clientId = useSelector((state) => state.clientAuth.clientMe.id);
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id);
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const dispatch = useDispatch()

 

  if(clientIsLoggedIn){
    const messages = useSelector(selectClientMessages)
    const filteredMessages = messages.filter((message) => {
      return message.from !== client.username
    })
  


    useEffect(() => {
      dispatch(fetchClientMessagesAsync(clientId))
    }, [dispatch])

  return(
  <>
      {filteredMessages ? filteredMessages.map((message) => {
        return(
          <>
            <Link to={`/messages/${message.freelancerId}`}>{message.from}</Link>
          </>
        )
      }) : null}
  </>
  )
  }
  
  if(freelancerIsLoggedIn){
    const messages = useSelector(selectFreelancerMessages)
    const filteredMessages = messages.filter((message) => {
      return message.from !== freelancer.username
    })

    useEffect(() => {
      dispatch(fetchFreelancerMessagesAsync(freelancerId))
    }, [dispatch])
    return(
      <>
        {filteredMessages ? filteredMessages.map((message) => {
          
          return(
            <>
              <Link to={`/messages/${message.clientId}`}>{message.from}</Link>
            </>
          )
        }) : null}
      </>
    )
  }
}

export default AllMessages
