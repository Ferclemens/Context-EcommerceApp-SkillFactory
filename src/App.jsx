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
import ProductDetails from './components/ProductDetails'
import Register from './components/Register'
import Reset from './components/Reset'

function App() {
 
  return (
    <UserProvider>
      <div className='appContainer'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/update/:id' element={<UpdateProducts/>} />
          <Route path='/details/:id' element={<ProductDetails/>} />
          <Route path='/create' element={<CreateProducts/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reset' element={<Reset/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <Footer/>
      </div>
    </UserProvider>
  )
}

export default App
