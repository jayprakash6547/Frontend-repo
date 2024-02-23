
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
// import BookaStrategyCall from './Components/BookaStrategyCall';
import RecentOrders from './Components/RecentOrders';
import UnpaidInvoices from './Components/UnpaidInvoices';
function App() {
  return(
 <>
 
 <Navbar/>
 <RecentOrders/>
 <UnpaidInvoices/>
 
 </>
  )
}

export default App;
