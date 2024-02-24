
import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import Navbar from './Components/Navbar';
// import BookaStrategyCall from './Components/BookaStrategyCall';
import RecentOrders from './Components/RecentOrders';
import UnpaidInvoices from './Components/UnpaidInvoices';
import ActiveSubscriptions from './Components/ActiveSubscriptions';
import OpenTickets from './Components/OpenTickets';
// import ActiveSubscriptionItem from './Components/ActiveSubscriptionItem';
function App() {
  return(
 <>
 
 <Navbar/>
 <RecentOrders/>
 <UnpaidInvoices/>
 <ActiveSubscriptions/>
 {/* <ActiveSubscriptionItem/> */}
<OpenTickets/>
 
 </>
  )
}

export default App;
