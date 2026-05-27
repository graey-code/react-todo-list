import './App.css'
import {useState} from 'react';
import TodosPage from '/src/features/Todos/TodosPage.jsx';
import Header from '/src/shared/Header.jsx';
import Logon from '/src/features/Logon.jsx';



function App() {

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  

  return (
    <div>
      <Header token={token} email={email} onSetToken={setToken} onSetEmail={setEmail}/>
      
      {token ? <TodosPage token={token} /> : <Logon onSetEmail={setEmail} onSetToken={setToken} /> }
      
      
    </div>
  )
}

export default App

// <TodosPage />