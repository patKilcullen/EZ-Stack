import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchSingleFreelancerMessageAsync, selectSingleFreelancerMessage, sendFreelancerMessageAsync, updateMessageAsync } from './freelancerSingleMessageSlice';

const IndividualMessagesFreelancer = () => {
  const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector((state) => state.freelancerAuth.me)
  const [content, setContent] = useState('')
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const messages = useSelector(selectSingleFreelancerMessage)
  

  const formSubmit = async (e) => {
    e.preventDefault()
    await dispatch(sendFreelancerMessageAsync({clientId: id, freelancerId, content, from: freelancer.username }))
    setRender(!render)
  }

  messages.map((msg) => {
    if(!msg.read && msg.from != freelancer.username){
      dispatch(updateMessageAsync({id: msg.id, read: true}))
    }
  })

  useEffect(() => {
    dispatch(fetchSingleFreelancerMessageAsync({id, freelancerId}))
  }, [dispatch, render])

  const copy =[...messages]

  const sorted = copy.sort((a,b) => {
    return a.id - b.id
  })
  
  return(
    <div
      className="individual-mssg"
      style={{
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "white",
        marginTop: "50px",
        width: "70vw",
        alignContent: "center",
        borderRadius: "4px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 
      style={{ alignSelf: "center" }}
      >Messages</h1>
      {sorted
        ? sorted.map((message) => {
            return (
              <div
                className="mssg-list"
              >
                <div className="single-mssg" style={{ margin: "15px 15px", borderRadius: "4px", backgroundColor: "lightgray", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
                  <div
                    className="author"
                    style={{ fontWeight: "bold", margin: "0 8px 0 0" }}
                  >
                    <small>
                      <span
                       style={{ marginLeft: "5px" }}
                      >
                        
                        from: {message.from} - 
                        at: {message.createdAt}
                      </span>
                    </small>
                  </div>
                  <div
                    className="mssg-content"
                    style={{ margin: "10px 10px", fontSize: "20px" }}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })
        : null}

      <form onSubmit={formSubmit}>
        <textarea
          value={content}
          name="content"
          type="text"
          style={{ width: "100%",
            padding: "12px 20px",
            height:"75px",
            boxSizing: "border-box",
            border: "2px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
            resize: "none"}}
          onChange={(e) => setContent(e.target.value)}
        />
        <button 
        type="submit"
        style={{
          position: "relative",
          display: "block",
          width: "100px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: "#1c89ff",
          border: "solid 1px transparent",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "300",
          cursor: "pointer",
          marginTop: "5px"
        }}
        >Send</button>
      </form>
    </div>
    // <>
    //   {sorted ? sorted.map((message) => {
    //   return(
    //     <>
    //       <ul>
    //         <li><small><span>{message.from} - {message.createdAt}</span></small></li>
    //         <li>{message.content}</li>
    //       </ul>
    //     </>
    //   )
    // }) : null}
    // <form onSubmit={formSubmit}>
    //   <input value={content} name='content' type='text' onChange={(e) => setContent(e.target.value)} />
    //   <button type='submit'>Send</button>
    // </form>
    // </>
  )

}

export default IndividualMessagesFreelancer
