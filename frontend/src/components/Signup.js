import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Signup=()=>{
  const navigate=useNavigate();
  const[formData,setFromData]=useState({
    FullName:'',
    Email:'',
    Password:''
  });
  const handleChange=(e)=>{
    setFromData({...formData,[e.target.name]:e.target.value
    }); 
  }
  const handleSubmit=async(e)=>{

    e.preventDefault();
    try{
        const response=await fetch('http://127.0.0.1:8000/signup/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formData)
      });
      if(response.ok){
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(()=>{
          navigate('/Login');
        },2000);
      }
      else{
        const errorData=await response.json();
        console.log("Signup failed:",errorData);
        toast.error("Signup failed. Please try again.");
      }
    }
    catch (error){
      console.log("Error during signup:",error);
      toast.error("Signup failed. Please try again.");
    }
  }
  return (
    <div className='container mt-5'>
        <div className='text-center' >
      <h2><i className='fas fa-user-plus me-2'></i>Signup</h2>
      <p className='text-muted'>Create your account to start tracking Expense</p>
    </div>
    <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'450px'}} onSubmit={handleSubmit}>
        <div className='mp-3'>
            <label className='form-label'>Full Name</label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='fas fa-user'></i>
              </span>
              <input type='text' name='FullName' value={formData.FullName} className='form-control' required placeholder='Enter your name' onChange={handleChange}/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>Email</label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-envelope'></i>
              </span>
              <input type='email' name='Email' value={formData.Email} className='form-control' onChange={handleChange} required placeholder='Enter your Email'/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>Password</label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-lock'></i>
              </span>
              <input type='password' name='Password' value={formData.Password}  className='form-control' required onChange={handleChange} placeholder='Enter your Password'/>
            </div>
        </div>        
      <button type='submit' className='btn btn-primary w-100 mt-4' ><i className='fas fa-user-plus me-2'></i>Signup</button>
    </form >
    <ToastContainer/>
    </div>
  )
}
export default Signup;