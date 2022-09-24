import React from 'react';
import './App.css';
// Routes
import { Routes, Route } from 'react-router-dom'
import Main from './pages/main/Main';
import Login from './pages/Login';
import ErroPage from './error/ErroPage';
import { NavBar } from './components/NavBar';
import CreatePosts from './pages/create-form/CreatePosts';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/createpost' element={<CreatePosts />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<ErroPage />} />
      </Routes>
    </div>
  );
}

export default App;
