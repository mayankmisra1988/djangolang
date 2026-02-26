import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ManageExpense from './components/ManageExpense';
import ExpenseReport from './components/ExpenseReport';
import ChangePassword from './components/ChangePassword';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>  
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/add_expense' element={<AddExpense/>}></Route>
        <Route path='/manage_expense' element={<ManageExpense/>}></Route>
        <Route path='/expense_report' element={<ExpenseReport/>}></Route>
        <Route path='/change_password' element={<ChangePassword/>}></Route>
      </Routes>
      </BrowserRouter>
      <Chat></Chat>
    </div>
  );
}

export default App;
