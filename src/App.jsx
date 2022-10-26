import { Route, Routes } from 'react-router'
import './App.css'
import CreateProducts from './components/CreateProducts'
import Navbar from './components/Navbar'
import Products from './components/Products'
import UpdateProducts from './components/UpdateProducts'
import Login from './components/Login'

function App() {
 
  return (
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/update/:id' element={<UpdateProducts/>} />
        <Route path='/create' element={<CreateProducts/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
