import React from 'react'
import {Link} from 'react-router-dom';
const Home = () => {
    const UserId=localStorage.getItem('UserId');
    //console.log(UserId)
  return (
    <div className='container text-center mt-5'>
      <h1 className='text-info'> Welcome To<span className='text-primary'> Daliy Expense Tracker</span></h1>
      <p className='lead'>Track your daily expense easily and efficiently</p>

      <div className='mt-5'>
        {UserId ?(
            <>
                <Link to='/dashboard' className='btn btn-secondary mx-2'><i className='fas fa-tachometer-alt me-2'></i>Go to Dashbord</Link>
            </>
            ):(
            <>
                <Link to='/Signup' className='btn btn-primary mx-2'><i className='fas fa-user-plus me-1'></i>Signup</Link>
                <Link to='/login' className='btn btn-success mx-2'><i className='fas fa-sign-in-alt me-1'></i>Login</Link>
            </>
        )}
        
      </div>
      
    </div>
  )
}

export default Home;
