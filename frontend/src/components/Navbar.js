//import React from 'react'
import {Link} from 'react-router';
import {useNavigate} from 'react-router-dom';
const Navbar=()=>{
    const navigate=useNavigate();
    const userId=localStorage.getItem('UserId')
    const handleLogut=()=>{
        localStorage.removeItem('UserId')
        navigate('/login')
    }
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
        <Link className="navbar-brand ms-4 mb-2" to="#"><i className='fas fa-wallet me-2 '></i>Expense Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active h6">
                    <Link to="/" className="nav-link"><i className='fas fa-home me-2'></i>Home <span></span></Link>
                </li>
                {userId ? (
                <>
                <li className="nav-item active">
                    <Link to="/dashboard" className="nav-link"><i className='fas fa-tachometer-alt me-2 ms-2'></i>Dashbord</Link>
                </li>                                
                <li className="nav-item active">
                    <Link to="/add_expense" className="nav-link"><i className="fa-jelly-fill fa-regular fa-plus"></i>Add Expense</Link>
                </li>                                
                <li className="nav-item active">
                    <Link to="/manage_expense" className="nav-link"><i className="fas fa-tasks me-1"></i>Manage Expense</Link>
                </li>                                
                <li className="nav-item active">
                    <Link to="/expense_report" className="nav-link"><i className="fas fa-file-alt me-1"></i>Expense Report</Link>
                </li>                                
                <li className="nav-item active">
                    <Link to="/change_password" className="nav-link"><i className="fas fa-key me-1"></i>Change Password</Link>
                </li>                                
                <button type='button' className="btn btn-outline-warning btn-sm ms-2 me-4 mb-2" onClick={handleLogut}>
                    <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</button> 
                </>
                ):(
                <>
                <li className="nav-item h6 active ">
                    <Link to="/Signup" className="nav-link"><i className='fas fa-user-plus me-2 ms-2'></i>Sign-In</Link>
                </li>
                <li className="nav-item h6 active">
                    <Link to="/login" className="nav-link"><i className='fas fa-sign-in-alt me-2 ms-2'></i>Log-In</Link>
                </li> 
                </>
            )}                              
            </ul>
        </div>
    </nav>
  )
}

export default Navbar;
