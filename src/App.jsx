import './App.css'
//import {useState} from 'react';
import TodosPage from '/src/features/Todos/TodosPage.jsx';
import Header from '/src/shared/Header.jsx';
import Logon from '/src/features/Logon.jsx';
import useAuth from '/src/contexts/AuthContext.jsx';



function App() {

  // const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");
  const {login, logout, token, email} = useAuth();
  

  

  return (
    <div>
      <Header token={token} email={email} onSetEmail={email} onSetToken={token} />
      
      {token ? <TodosPage token={token} /> : <Logon onSetEmail={email} onSetToken={token} /> }
      
      
    </div>
  )
}

export default App

// <TodosPage />