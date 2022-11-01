import { Route, Routes } from 'react-router'
import './styles/App.css'
import CreateProducts from './components/CreateProducts'
import {Navbar} from './components/Navbar'
import Products from './components/Products'
import UpdateProducts from './components/UpdateProducts'
import Login from './components/Login'
import Footer from './components/Footer'
import Cart from './components/Cart'
import UserProvider from './components/UserProvider'

function App() {
 
  return (
    <UserProvider>
      <div className='appContainer'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/update/:id' element={<UpdateProducts/>} />
          <Route path='/create' element={<CreateProducts/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <Footer/>
      </div>
    </UserProvider>
  )
}

export default App
