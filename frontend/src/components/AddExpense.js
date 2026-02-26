import { useState,useEffect } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';


const AddExpense = () => {
const navigate=useNavigate();
  const[formData,setFromData]=useState({
    ExpenseDate:'',
    ExpenseItem:'',
    ExpenseCost:''
  });
  const UserId=localStorage.getItem('UserId');

  useEffect(()=>{
    if(!UserId){
      navigate('/login')
    }
  },[])
  const handleChange=(e)=>{
    setFromData({...formData,[e.target.name]:e.target.value
    }); 
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await fetch('http://127.0.0.1:8000/add_expense/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...formData,UserId:UserId})
      });
      const data=await response.json();
      if(response.status===201){
        toast.success(data.message);
        setTimeout(()=>{
          navigate('/dashboard');
        },2000);
      }
      else{
        toast.error(data.message);
      }
    }
    catch (error){
      console.log("Error during Add Expense data:",error);
      toast.error("Please try again.");
    }
  }    
  return (
<div className='container mt-5'>
        <div className='text-center' >
          <h2><i className='fas fa-plus-circle me-2'></i>Add Expense</h2>
           <p className='text-muted'>Track your new spending Expense here</p>
        </div>
        <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'450px'}} onSubmit={handleSubmit}>
        <div className='mp-3'>
            <label className='form-label'>Expense Date</label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='fas fa-calendar-alt'></i>
              </span>
              <input type='date' name='ExpenseDate' value={formData.ExpenseDate} className='form-control' required placeholder='Enter Exp Date' onChange={handleChange}/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>Expense Item</label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-shopping-cart'></i>
              </span>
              <input type='text' name='ExpenseItem' value={formData.ExpenseItem} className='form-control' onChange={handleChange} required placeholder='Enter Expense item'/>
            </div>
        </div>
        <div className='mp-3'>
            <label className='form-label mp-3'>Expense Cost </label>
            <div className='input-group mp-3'>
              <span className='input-group-text'>
                <i className='fas fa-inr'></i>
              </span>
              <input type='number' name='ExpenseCost' value={formData.ExpenseCost}  className='form-control' required onChange={handleChange} placeholder='Enter amount spent'/>
            </div>
        </div>        
      <button type='submit' className='btn btn-primary w-100 mt-4'><i className='fas fa-plus me-2'></i>Add Expense</button>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default AddExpense;
