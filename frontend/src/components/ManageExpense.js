import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ManageExpense=()=>{
  const navigate = useNavigate();
  const[expense,setExpense]=useState([]);
  const UserId = localStorage.getItem("UserId");
    useEffect(() => {
        if (!UserId) {
          navigate("/login");
        } else {
          fetchExpenses(UserId);
        }
    }, []);
    const[editExpense,seteditExpense]=useState(null);
    const handleEdit=(expense)=>{
      seteditExpense(expense);
    }
    const handleChange=(e)=>{
      seteditExpense({...editExpense,[e.target.name]:e.target.value
      }); 
    }  
    const fetchExpenses=async()=>{
        try{
            const response=await fetch(`http://127.0.0.1:8000/manage_expense/${UserId}`);
            const data=await response.json();
            setExpense(data);
          }
        catch (error){
            console.log('Error fetching expense...',error)
          }
      }
    const UpdateExpenses=async()=>{
        try{
            const response=await fetch(`http://127.0.0.1:8000/update_expense/${editExpense.id}`,{
              method:'PUT',
              headers:{'Content-type':'application/json'},
              body:JSON.stringify(editExpense)
              });
              if (response.status===200){
                toast.success('Expense updated successfull')
                seteditExpense(null)
                fetchExpenses(UserId)
              }
              else{
                toast.error('Unable to update')
              }        
            }
        catch (error){
            console.log('Error fetching expense...',error)
            toast.error('Something went wrong....')
        }
      }    

    const handleDelete=async(expid)=>{
        if (window.confirm('Are you sure want to Delete Expense ?')){
          try{
            const response=await fetch(`http://127.0.0.1:8000/delete_expense/${expid}`,{
              method:'DELETE',
              headers:{'Content-type':'application/json'},
              body:JSON.stringify(editExpense)
              });
              if (response.status===200){
                toast.success('Expense delete successfull')
                fetchExpenses(UserId)
              }
              else{
                toast.error('Failed to Delete Expense')
              }        
            }
        catch (error){
            console.log('Error Delete expense...',error)
            toast.error('Something went wrong....')
        }
        }
      }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2><i className="fas fa-tasks me-2"></i>Manage Expense</h2>
        <p className="text-muted">View , Edit & Manage Expense here</p>
      </div>
      <div class="">
        <table class="table table-bordered table-hover mx-auto" style={{maxWidth:'700px'}}>
            <thead>
                <tr className="text-center" > 
                <th scope="col" className="bg-primary text-white" >Id </th>
                <th scope="col" className="bg-primary text-white" >Item</th>
                <th scope="col" className="bg-primary text-white" >Date</th>
                <th scope="col" className="bg-primary text-white" >Cost</th>
                <th scope="col" className="bg-primary text-white" >Action</th>
                
                </tr>
            </thead>
          <tbody>
            {expense.length>0 ? ( 
                expense.map((exp,index)=>(
                    <>
                    <tr key={exp.id} className="text-center">
                    <th>{index+1}</th>
                    <td>{exp.ExpenseItem}</td>
                    <td>{exp.ExpenseDate}</td>                    
                    <td>{exp.ExpenseCost}</td>
                    <td>
                        <button className="btn btn-sm btn-primary me-2"onClick={()=>handleEdit(exp)}>Edit</button>
                        <button className="btn btn-sm btn-danger"onClick={()=>handleDelete(exp.id)}>Delete</button>
                    </td>
                  </tr>
                </>
                ))
            ):(
            <>
            <tr colspan='5' className="text-center text-muted"><i className="fas fa-exclamation me-2 mt-4"></i>No Expense Found</tr>
            </>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
      {editExpense && (
        <div class="modal show d-block" style={{background:'rgba(0,0,0,0.5)'}}>
          <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title"><i className="fas fa-pen me-2 text-info"></i>Edit Expense</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"onClick={()=>seteditExpense(null)}></button>
                </div>
              <div class="modal-body">
                <div className='mp-3'>
                  <label className='form-label'>Expense Date</label>
                   <div className='input-group'>
                      <span className='input-group-text'>
                          <i className='fas fa-calendar-alt'></i>
                        </span>
                        <input type='date' name='ExpenseDate' className='form-control' value={editExpense.ExpenseDate}required placeholder='Enter Exp Date' onChange={handleChange}/>
                    </div>
                </div>
              <div className='mp-3'>
                <label className='form-label mp-3'>Expense Item</label>
                <div className='input-group mp-3'>
                  <span className='input-group-text'>
                    <i className='fas fa-shopping-cart'></i>
                  </span>
                  <input type='text' name='ExpenseItem' className='form-control' value={editExpense.ExpenseItem} onChange={handleChange} required placeholder='Enter Expense item'/>
                </div>
              </div>
              <div className='mp-3'>
                <label className='form-label mp-3'>Expense Cost </label>
                <div className='input-group mp-3'>
                  <span className='input-group-text'>
                    <i className='fas fa-inr'></i>
                  </span>
                  <input type='number' name='ExpenseCost' className='form-control' value={editExpense.ExpenseCost} required onChange={handleChange} placeholder='Enter amount spent'/>
                </div>
              </div>
            </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>seteditExpense(null)}>Close</button>
                <button type="button" class="btn btn-primary" onClick={UpdateExpenses}>Save changes</button>
              </div>
          </div>
        </div>
        </div>
      )}
 
    </div>
  );
};

export default ManageExpense;
