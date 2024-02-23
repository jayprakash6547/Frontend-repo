import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/loginAndRegister/Login';
import Register from './Components/loginAndRegister/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
  
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
