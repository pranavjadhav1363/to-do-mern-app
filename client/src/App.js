
import './App.css';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Tasks } from './components/Tasks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/tasks' element={<Tasks />}></Route>

        </Routes>
      </Router>


    </div>
  );
}

export default App;
