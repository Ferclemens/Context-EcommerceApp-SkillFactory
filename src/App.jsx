import { Route, Routes } from 'react-router'
import './styles/App.css'
import CreateProducts from './components/CreateProducts'
import {Navbar} from './components/Navbar'
import Products from './components/Products'
import UpdateProducts from './components/UpdateProducts'
import Login from './components/Login'
import Footer from './components/Footer'

function App() {
 
  return (
    <div className='appContainer'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/update/:id' element={<UpdateProducts/>} />
        <Route path='/create' element={<CreateProducts/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Login/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
