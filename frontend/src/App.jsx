import react from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

// logout of the page
function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />
}

// when we register, clear local storage so no access tokens lingering
function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* home can only be rendered if user is signed in first, hence why we put in protected route */}
      <Route 
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* anyone can redirect to login page and redirect page*/}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterAndLogout />}/>

      {/* if not register or login, go to error page */}
      <Route path='*' element={<NotFound />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
