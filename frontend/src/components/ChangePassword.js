import { useState,useEffect } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const ChangePassword = () => {
    const UserId = localStorage.getItem("UserId");
        useEffect(() => {
            if (!UserId) {
              navigate("/login");
            } else {
              
            }
        }, []);
    const navigate=useNavigate();
    const[formData,setFromData]=useState({
        OldPassword:'',
        NewPassword:'',
        confirmPassword:''
    });
    const handleChange=(e)=>{
        setFromData({...formData,[e.target.name]:e.target.value
        }); 
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(formData.NewPassword!==formData.confirmPassword){
            toast.error("New Password and Confirm Password do not match.");
            return;
        }
        try{
            const response=await fetch(`http://127.0.0.1:8000/change_password/${UserId}/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    OldPassword:formData.OldPassword,
                    NewPassword:formData.NewPassword
                })
            });
            const data=await response.json();
            console.log("Change Password Response Data:",data);
            if(response.status===200){
                toast.success(data.message);
                setTimeout(()=>{
                navigate('/');
                },2000);
                setFromData({
                    OldPassword:'',
                    NewPassword:'',
                    confirmPassword:''
                });
            }
            else{
                toast.error(data.error );
            }
            //|| "Password change failed. Please try again." 
        }
        catch (error){
            console.log("Error during change password:",error);
            toast.error("Password change failed. Please try again.");
        }
    }

  return (
<div className='container mt-5'>
        <div className='text-center' >
      <h2><i className='fas fa-key me-2'></i>Change Password</h2>
      <p className='text-muted'>Secure your account with a new password</p>
    </div>
    <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'450px'}} onSubmit={handleSubmit}>
        <div className='mp-3'>
            <label className='form-label'>Old Password</label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='fas fa-lock'></i>
              </span>
              <input type='password' name='OldPassword' value={formData.OldPassword} className='form-control' required placeholder='Enter your old Password' onChange={handleChange}/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>New Password</label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-lock-open'></i>
              </span>
              <input type='password' name='NewPassword' value={formData.NewPassword} className='form-control' onChange={handleChange} required placeholder='Enter your new password'/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>Confirm New Password</label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-lock-open'></i>
              </span>
              <input type='password' name='confirmPassword' value={formData.confirmPassword}  className='form-control' required onChange={handleChange} placeholder='Enter your new Password'/>
            </div>
        </div>        
      <button type='submit' className='btn btn-primary w-100 mt-4'><i className='fas fa-key me-2'></i>Change Password</button>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default ChangePassword;
