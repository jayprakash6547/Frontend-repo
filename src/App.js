
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import BookaStrategyCall from './Components/BookaStrategyCall';
function App() {
  return(
 <>
 <BookaStrategyCall/>
 <Navbar/>
 </>
  )
}

export default App;
