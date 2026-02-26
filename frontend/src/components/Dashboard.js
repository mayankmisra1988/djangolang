import {useEffect ,useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Dashboard=()=>{
    const navigate=useNavigate(); 
    const UserName=localStorage.getItem('UserName');
    const UserId=localStorage.getItem('UserId');
    const [expense,setExpense]=useState([])
    const [todayTotal,setTodayTotal]=useState()
    const [yesterdayTotal,setYesterdayTotal]=useState(0)
    const [last7DaysTotal,setLast7DaysTotal]=useState(0)
    const [last30DaysTotal,setLast30DaysTotal]=useState(0)
    const [currentYearTotal,setcurrentYearTotal]=useState(0)
    const [grandTotal,setGrandTotal]=useState(0)
      useEffect(()=>{
        !UserId?navigate('/login'):fetchExpenses()
      },[])
    const fetchExpenses=async()=>{
      try{
          const response=await fetch(`http://127.0.0.1:8000/manage_expense/${UserId}/`);
          const data=await response.json();
          setExpense(data);
          calculateTotals(data);
        }
      catch (error){
          console.log('Error fetching expense...',error)
        }
    }      
    const calculateTotals=(data)=>{
      const today=new Date();
      const yesterday=new Date();

      yesterday.setDate(today.getDate()-1);
      const last7Days=new Date();
      last7Days.setDate(today.getDate()-7)

      const last30Days=new Date();
      last30Days.setDate(today.getDate()-30)

      const currentYear=today.getFullYear();

      let todaySum=0,yesterdaySum=0,last7DaySum=0,last30DaySum=0,yearSum=0,grandSum=0;

      data.forEach(item => {
        const expenseDate=new Date(item.ExpenseDate);
        const amount= parseFloat(item.ExpenseCost) || 0;
        if (expenseDate.toDateString()===today.toDateString()){todaySum+=amount}
        if (expenseDate.toDateString()===yesterday.toDateString()){yesterdaySum+=amount}
        if (expenseDate.toDateString()>=last7Days.toDateString()){last7DaySum+=amount}
        if (expenseDate>=last30Days){last30DaySum+=amount}
        if (expenseDate.getFullYear()===currentYear){yearSum+=amount}
        grandSum+=amount

      });
      setTodayTotal(todaySum)
      setYesterdayTotal(yesterdaySum)
      setLast7DaysTotal(last7DaySum)  
      setLast30DaysTotal(last30DaySum)
      setcurrentYearTotal(yearSum)
      setGrandTotal(grandSum)
    }  
  return (
    <div className='contaier mt-3'>
      <div className='text-center'>
        <h1 style={{ textTransform: 'uppercase' }}> Welcome to {UserName}</h1>
        <p className='text-muted'>Here's Your Expense Overview</p>
      </div>

      <div className='row mt-4 ms-0'>
        <div className='col-md-4'>
          <div className='card bg-primary mb-1' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>Today's Expense</h5>
                  <p className='card-text  fs-4'>₹ {todayTotal}</p>
              </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card bg-warning mb-1' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>yesterday Expense</h5>
                  <p className='card-text  fs-4'>₹ {yesterdayTotal}</p>
              </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card bg-success mb-1' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>Last 7 Days Expense</h5>
                  <p className='card-text  fs-4'>₹ {last7DaysTotal}</p>
              </div>
          </div>
        </div>

        <div className='col-md-4 mt-1'>
          <div className='card bg-secondary mb-0' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>Last 30D ays Total Expense</h5>
                  <p className='card-text fs-4'>₹ {last30DaysTotal}</p>
              </div>
          </div>
        </div>  

        <div className='col-md-4 mt-1'>
          <div className='card bg-danger mb-0' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>Current Year Total Expense</h5>
                  <p className='card-text fs-4'>₹ {currentYearTotal}</p>
              </div>
          </div>
        </div>  

        <div className='col-md-4 mt-1'>
          <div className='card bg-primary mb-0' style={{height:'150px'}}>
              <div className='card-body text-white'>
                  <h5 className='card-title text-center'><i className='fas fa-calendar-day me-2'></i>Grand Total Expense</h5>
                  <p className='card-text fs-4'>₹ {grandTotal}</p>
              </div>
          </div>
        </div>  

     </div>
    </div>
  )
}

export default Dashboard;
