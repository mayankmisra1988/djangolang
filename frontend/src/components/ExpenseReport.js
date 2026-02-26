import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ExpenseReport = () => {
  const navigate = useNavigate();
  const [formDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [expense, setExpense] = useState([]);
  const [grandTotal, setGrandTotal] = useState([0]);
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    if (!UserId) {
      navigate("/login");
    }
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search_expense/${UserId}/?from_date=${formDate}&to_date=${toDate}`
      );
      const data = await response.json();
      setExpense(data.expense);
      setGrandTotal(data.total);
    } catch (error) {
      console.log("Error fetching Expenses: ", error);
      toast.error("Please try again.");
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>
          <i className="fas fa-file-invoice-dollar me-2"></i>Date Wise Expense
          Report
        </h2>
        <p className="text-muted">
          Search and analyze your Expense Report between two dates
        </p>
      </div>
      <form className="row g-5" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="fromDate"
              value={formDate}
              className="form-control"
              required
              placeholder="Enter Exp Date"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="ToDate"
              value={toDate}
              className="form-control"
              required
              placeholder="Enter Exp Date"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary ms-5">
            <i className="fas fa-search me-2"></i>Search
          </button>
        </div>
      </form>

      {/*    show data from django                                                              */}
      <div className="mt-5">
        <table
          class="table-bordered table table-hover mx-0"
          style={{ maxWidth: "730px" }}
        >
          <thead>
            <tr className="text-center text-white">
              <th scope="col" className=" bg-primary text-white">
                Id{" "}
              </th>
              <th scope="col" className=" bg-primary text-white">
                Item
              </th>
              <th scope="col" className=" bg-primary text-white">
                Date
              </th>
              <th scope="col" className="bg-primary text-white">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {expense ? (
              <>
                {expense.length > 0 ? (
                  expense.map((exp, index) => (
                    <>
                      <tr key={exp.id} className="text-center">
                        <th>{index + 1}</th>
                        <td>{exp.ExpenseItem}</td>
                        <td>{exp.ExpenseDate}</td>
                        <td>{exp.ExpenseCost}</td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr colspan="5" className="text-center fw-bold text-muted">
                    <i className="fas fa-exclamation me-5 mt-1"></i>No Expense
                    Found
                  </tr>
                )}
              </>
            ) : null}
            <tr className="text-center bg-secondary text-white">
              <th colSpan="3" className="text-center bg-secondary text-white">
                Grand Total
              </th>
              <th className="fw-bold text-success">₹ {grandTotal}</th>
            </tr>
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ExpenseReport;
