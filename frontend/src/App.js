import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes , Route , Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
    <div className='App'>

      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login'/> } />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
