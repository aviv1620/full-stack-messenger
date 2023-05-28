import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './components/login/Login';
import { Main } from './components/main/Main';
import { CompError } from './components/error/CompError';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/" Component={Main}/>
        <Route path="/error" Component={CompError}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
