// rafce
import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Login=()=>{
    const navigate=useNavigate();
    const[formData,setFromData]=useState({
        Email:'',
        Password:''
    });
    const handleChange=(e)=>{   
        setFromData({...formData,[e.target.name]:e.target.value}); 
    } 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch('http://127.0.0.1:8000/login/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)});
            const data=await response.json()
            if(response.ok){
                toast.success("Login successful!");
                localStorage.setItem('UserId',data.UserId)
                localStorage.setItem('UserName',data.UserName)
                setTimeout(()=>{
                navigate('/Dashboard');
                },2000);
            } 
            else{
                console.log("Login failed:",data);
                toast.error("Login failed. Please try again.");
            }
        }
        catch (error){
            console.log("Error during Login:",error);
            toast.error("Login failed. Please try again.");
        }
    }

  return (
    <div className='container mt-5'>
        <div className='text-center' >
      <h2><i className='fas fa-user-plus me-2'></i>Login</h2>
      <p className='text-muted'>Access your Expense Dashboard</p>
    </div>
    <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'450px'}} onSubmit={handleSubmit}>

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
              <input type='password' name='Password' value={formData.Password} className='form-control' required onChange={handleChange} placeholder='Enter your Password'/>
            </div>
        </div>        
      <button type='submit' className='btn btn-primary w-100 mt-4' ><i className='fas fa-sign-in-alt me-2'></i>Login</button>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Login;



