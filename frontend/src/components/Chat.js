
import { useState } from 'react';
import './style1.css';


  const Chat = () => {
  const[chatData,setChatData]=useState('');
  const[submittedValue, setSubmittedValue]=useState('');
  const[chatValue, setChatValue]=useState({});
  
 
  const handleChange=(e)=>{
    setChatData(e.target.value); 
       
    } 
    // console.log(chatData); 
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setSubmittedValue(chatData);
    setChatData('');
    try{
      const response=await fetch('http://127.0.0.1:8000/chat/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
          body:JSON.stringify(chatData)
      });
      if(response.ok){
        const Data=await response.json();
        // console.log("Get Chat submission Data :",Data);
        console.log(Data.chat_data);
        setChatValue({data:Data.chat_data});
        return;
      }
     
    }catch (error){
      console.log("Error during chat submission:",error);
    }
  }
  return (
    <>
        <form onSubmit={handleSubmit}> 
          <div className="wrapper">
          <div className="title">Simple Chatbot</div>
          <div className="box">
            <div className="item">
              <div className="icon">
                <i className="fa fa-user" />
              </div>
              <div className="msg">
                <p>{submittedValue}</p>
              </div>
            </div>
            <br clear="both" />
            <div className="item right" style={{minWidth:'50px',minHidth:'500px'}}>
              <div className="msg">
                <p>{chatValue.data} </p>
              </div>
            </div>
          </div>
          <div className="typing-area">
            <div className="input-field">
              <input type="text" name='chat' value={chatData} onChange={handleChange} placeholder="Type your message" required />
              
              <button type='submit'  className='btn btn-primary w-10 '>Send</button>
            </div>
          </div>
        </div>
      </form>
      
        
    </>
  )
}

export default Chat;



