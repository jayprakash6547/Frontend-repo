
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import BookaStrategyCall from './Components/BookaStrategyCall';
import RecentOrders from './Components/RecentOrders';
function App() {
  return(
 <>
 {/* <BookaStrategyCall/> */}
 <Navbar/>
 {/* <RecentOrders/> */}
 </>
  )
}

export default App;
