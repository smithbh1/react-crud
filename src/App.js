import React from 'react';
import './App.css';
import Create from './create';
import Read from './read';
import Update from './update';
import Login from './login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useSignOut, RequireAuth } from 'react-auth-kit'

function App() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };
  
  return (
      <div className="main">
        <h2 className="main-header">User Management</h2>
        <div className="nav">
          <Link to={`/`}><Button className='top-button'>Home</Button></Link>
          <Link to={`/create`}><Button className='top-button'>+ Add User</Button></Link>
          <Button onClick={logout}>Logout</Button>
        </div>
        <Routes>
        
          <Route exact path='/create' element={<RequireAuth loginPath="/login">
                                                <Create/>
                                              </RequireAuth>} />  
          <Route exact path='/' element={<Read/>}/>
                                          
          <Route exact path='/update' element={<RequireAuth loginPath="/login">
                                                  <Update/>
                                                </RequireAuth>} />
          <Route exact path='/login' element={<Login/>} />
          </Routes>
    </div>   
    
  );
}

export default App;
